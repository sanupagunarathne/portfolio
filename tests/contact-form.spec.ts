import { expect, test } from "@playwright/test";
import { build } from "esbuild";

let bundle: string;
test.beforeAll(async () => {
  bundle = (await build({ entryPoints: ["tests/fixtures/contact.tsx"], bundle: true, write: false, platform: "browser", jsx: "automatic", define: { "process.env.NODE_ENV": '"production"' } })).outputFiles[0].text;
});

test("configured form preserves failed messages and resets only after acceptance", async ({ page }) => {
  let fail = true;
  let calls = 0;
  await page.route("http://contact.test/**", async route => {
    if (route.request().url().endsWith("/api/contact")) {
      calls++;
      expect(route.request().postDataJSON().email).toBe("visitor@example.com");
      return route.fulfill({ status: fail ? 502 : 200, contentType: "application/json", body: JSON.stringify(fail ? { error: "Unavailable" } : { accepted: true }) });
    }
    return route.fulfill({ contentType: "text/html", body: '<main id="root"></main><script>' + bundle.replaceAll("</script", "<\\/script") + '</script>' });
  });
  await page.goto("http://contact.test/");
  await page.getByLabel("Your name", { exact: false }).fill("A visitor");
  await page.getByLabel("Your email", { exact: false }).fill("visitor@example.com");
  await page.getByLabel("Your message", { exact: false }).first().fill("An idea about a creative project.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("could not be sent");
  await expect(page.locator("#contact-message")).toHaveValue("An idea about a creative project.");
  fail = false;
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("accepted for delivery");
  await expect(page.locator("#contact-message")).toHaveValue("");
  expect(calls).toBe(2);
});

test("prepared drafts are invalidated when the visitor edits the message", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contact-name").fill("A visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("An initial message about a creative project.");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.getByLabel("Your prepared message")).toBeVisible();
  await page.locator("#contact-message").fill("An updated message about a different idea.");
  await expect(page.getByLabel("Your prepared message")).toHaveCount(0);
  await expect(page.locator(".form-status")).toBeEmpty();
});

test("unexpected successful HTTP responses do not erase or claim delivery", async ({ page }) => {
  await page.route("http://contact.test/**", async route => {
    if (route.request().url().endsWith("/api/contact")) return route.fulfill({ status: 200, contentType: "application/json", body: '{}' });
    return route.fulfill({ contentType: "text/html", body: '<main id="root"></main><script>' + bundle.replaceAll("</script", "<\\/script") + '</script>' });
  });
  await page.goto("http://contact.test/");
  await page.locator("#contact-name").fill("A visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("A message that must be retained.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("could not be sent");
  await expect(page.locator("#contact-message")).toHaveValue("A message that must be retained.");
});
