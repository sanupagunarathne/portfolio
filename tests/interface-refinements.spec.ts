import { expect, test } from "@playwright/test";

test("minimal identity and all dedicated navigation destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sanupa Gunarathne");
  await expect(page.locator(".dock-current")).toHaveText("Home");
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Sanupa Gunarathne home" })).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  const nav = page.locator("#dock-navigation");
  for (const label of ["Home", "Work", "About", "Expertise", "Journey", "Playground", "Beyond", "Contact"]) await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
  await nav.getByRole("link", { name: "Journey", exact: true }).click();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(nav.getByRole("link", { name: "Journey", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".nav-note")).toHaveCount(0);
  expect((await page.locator(".dock-bar").boundingBox())!.height).toBeLessThanOrEqual(80);
});

test("contact prepares a validated message without pretending to send", async ({ page }) => {
  let deliveries = 0;
  page.on("request", request => { if (request.url().endsWith("/api/contact")) deliveries++; });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.locator("#contact-name")).toBeFocused();
  await page.getByLabel("Your name", { exact: false }).fill("A visitor");
  await page.getByLabel("Your email", { exact: false }).fill("visitor@example.com");
  await page.getByLabel("What is this about?").selectOption("Collaboration");
  await page.getByLabel("Your message", { exact: false }).first().fill("I would like to talk about a creative web project.");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.locator(".form-status")).toContainText("not sent");
  await expect(page.getByLabel("Your prepared message")).toHaveValue(/Collaboration/);
  expect(deliveries).toBe(0);
  await page.getByRole("button", { name: "Copy message" }).click();
  await expect(page.locator(".form-status")).toContainText(/copied|manually/);
});

test("contact API rejects invalid input and reports missing delivery configuration", async ({ request }) => {
  const invalid = await request.post("/api/contact", { data: { name: "a" } });
  expect(invalid.status()).toBe(400);
  const blocked = await request.post("/api/contact", { headers: { Origin: "https://unrelated.example" }, data: {} });
  expect(blocked.status()).toBe(403);
  const valid = await request.post("/api/contact", { data: { name: "A visitor", email: "visitor@example.com", topic: "Question", message: "A properly formed test message.", website: "" } });
  expect(valid.status()).toBe(503);
});

test("technology constellation supports libraries and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/expertise");
  await page.getByRole("group", { name: "Technology category" }).getByRole("button", { name: "Libraries", exact: true }).click();
  const three = page.locator(".technology-group").getByRole("button", { name: "Three.js", exact: true });
  await expect(three).toBeVisible();
  await expect(three.locator("..")).toHaveCSS("animation-name", "none");
  await three.click();
  await expect(page.getByRole("region", { name: "Technology details" }).getByRole("heading", { name: "Three.js", exact: true })).toBeVisible();
});
