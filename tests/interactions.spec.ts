import { expect, test } from "@playwright/test";

test("technology filters and keyboard selection expose honest details", async ({ page, isMobile }) => {
  await page.goto("/");
  const filters = page.getByRole("group", { name: "Technology category" });
  await filters.getByRole("button", { name: "Languages", exact: true }).click();
  await expect(page.locator(".technology-group")).toHaveCount(1);
  const java = page.locator(".technology-group").getByRole("button", { name: "Java", exact: true });
  await java.focus();
  await page.keyboard.press("Enter");
  await expect(java).toHaveAttribute("aria-pressed", "true");
  const details = page.getByRole("region", { name: "Technology details" });
  await expect(details.getByRole("heading", { name: "Java", exact: true })).toBeVisible();
  await expect(details.getByText("To be confirmed", { exact: true })).toBeVisible();
  await expect(details.getByRole("link", { name: "Paddock Labs" })).toHaveAttribute("href", "#paddock-labs-title");
  if (isMobile) {
    await expect(details).toBeInViewport();
    await page.getByRole("button", { name: "Back to technologies" }).click();
    await expect(java).toBeFocused();
  }
  await filters.getByRole("button", { name: "Frontend", exact: true }).click();
  await expect(details.getByRole("heading", { name: "A closer look." })).toBeVisible();
  await expect(page.locator(".technology-group").getByRole("button", { name: "Java", exact: true })).toHaveCount(0);
  await filters.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".technology-group")).toHaveCount(5);
});

test("journey and project notes expand and collapse without navigating", async ({ page }) => {
  await page.goto("/");
  const project = page.getByRole("button", { name: "Explore Paddock Labs notes" });
  await project.click();
  await expect(project).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#paddock-labs-notes")).toBeVisible();
  await project.click();
  await expect(page.locator("#paddock-labs-notes")).toBeHidden();
  const school = page.getByRole("button", { name: /Maliyadeva College/ });
  await school.click();
  await expect(school).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#milestone-school")).toBeVisible();
  const degree = page.getByRole("button", { name: /Software Engineering at IIT/ });
  await degree.focus();
  await page.keyboard.press("Space");
  await expect(page.locator("#milestone-degree")).toBeVisible();
  await expect(page.locator("#milestone-school")).toBeHidden();
  await page.keyboard.press("Space");
  await expect(page.locator("#milestone-degree")).toBeHidden();
  await expect(page.locator(".gallery-opener")).toHaveCount(0);
});

test("reduced motion keeps content available and glass has an opaque fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Explore EatWhat notes" }).click();
  await expect(page.locator("#eatwhat-notes")).toBeVisible();
  await expect(page.locator(".project-cursor").first()).toBeHidden();
  await expect(page.locator(".site-header")).toHaveCSS("backdrop-filter", "blur(16px)");
  // Simulate a browser without backdrop-filter support by removing the @supports rule.
  await page.evaluate(() => {
    for (const sheet of document.styleSheets) {
      try { for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
        if (sheet.cssRules[i] instanceof CSSSupportsRule) sheet.deleteRule(i);
      } } catch { /* Cross-origin font stylesheets need no modification. */ }
    }
  });
  await expect(page.locator(".site-header")).toHaveCSS("background-color", "rgb(247, 247, 237)");
});
