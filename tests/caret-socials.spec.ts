import { expect, test } from "@playwright/test";

test("typing has one advancing caret and social links include logos", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const count = await page.locator("#hero-title").evaluate(heading => {
    // Restart the whole selector, including its pseudo-element animations.
    heading.removeAttribute("data-typed");
    void (heading as HTMLElement).offsetHeight;
    heading.setAttribute("data-typed", "true");
    void (heading as HTMLElement).offsetHeight;
    for (const animation of heading.getAnimations({ subtree: true })) { animation.pause(); animation.currentTime = 100; }
    return [...heading.querySelectorAll(".type-character")].filter(character => parseFloat(getComputedStyle(character, "::after").opacity) > .5).length;
  });
  expect(count).toBe(1);
  for (const name of ["GitHub", "LinkedIn", "Instagram"]) await expect(page.getByRole("contentinfo").getByRole("link", { name: new RegExp(name) }).locator(".social-logo")).toBeAttached();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("#hero-title .type-character").first()).toHaveCSS("animation-name", "none");
});

test("confirmed contact email provides an API-free draft handoff", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "sanupar07@gmail.com", exact: true })).toHaveAttribute("href", "mailto:sanupar07@gmail.com");
  await page.locator("#contact-name").fill("A visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("A message for the email-app handoff.");
  await page.getByRole("button", { name: "Prepare message" }).click();
  await expect(page.getByRole("link", { name: "Open in email app" })).toHaveAttribute("href", /^mailto:sanupar07@gmail\.com\?subject=/);
});
