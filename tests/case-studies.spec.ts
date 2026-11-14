import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";

for (const [index, project] of projects.entries()) {
  test(`${project.title} has a complete honest case study and next-project link`, async ({ page }) => {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${project.title} — Sanupa Gunarathne`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", project.summary);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${project.title} — Sanupa Gunarathne`);
    for (const title of ["Overview", "The problem", "My role", "Main features", "Technology stack", "Development approach", "Challenges", "Results & progress", "Image gallery"]) {
      await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    }
    await expect(page.locator(".case-gallery figure")).toHaveCount(2);
    await expect(page.locator(".case-gallery .gallery-opener")).toHaveCount(0);
    await expect(page.locator("#role")).toContainText("To be documented");
    await expect(page.locator("#progress")).toContainText("No completion, deployment or measured outcomes are claimed");
    await expect(page.getByRole("link", { name: "Live demo", exact: false })).toHaveCount(0);
    const next = projects[(index + 1) % projects.length];
    const nextLink = page.getByRole("navigation", { name: "Next project", exact: true }).getByRole("link", { name: new RegExp(next.title) });
    await expect(nextLink).toHaveAttribute("href", `/projects/${next.slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await nextLink.click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(next.title);
  });
}

test("homepage previews reach case studies and shared navigation returns home", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View EatWhat project", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/eatwhat$/);
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  const navigation = isMobile ? page.locator("#mobile-navigation") : page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation.getByRole("link", { name: "About", exact: true })).toHaveAttribute("href", "/#about");
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.getByRole("heading", { name: "More than just lines of code." })).toBeVisible();
});

test("unknown projects return a real 404 and a recovery link", async ({ page }) => {
  const response = await page.goto("/projects/not-a-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  await page.getByRole("link", { name: "Explore selected work" }).click();
  await expect(page).toHaveURL(/\/#work$/);
});

test("case study content is readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: test.info().project.use.baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/projects/paddock-labs");
    await expect(page.getByRole("heading", { name: "Paddock Labs", exact: true })).toBeVisible();
    await expect(page.locator("#problem")).toContainText("karting telemetry");
    await expect(page.getByRole("link", { name: "All projects", exact: true })).toHaveAttribute("href", "/#work");
  } finally { await context.close(); }
});
