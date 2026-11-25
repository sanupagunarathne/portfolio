import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";
import { caseStudies } from "../src/data/case-studies";

for (const [index, project] of projects.entries()) {
  test(`${project.title} has a complete honest case study and next-project link`, async ({ page }) => {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${project.title} — Sanupa Gunarathne`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", project.summary);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${project.title} — Sanupa Gunarathne`);
    for (const title of ["Overview", "The problem", "My role", ...(project.slug === "paddock-labs" ? ["Proposed features", "Proposed technology stack"] : project.slug === "eatwhat" ? ["Documented features", "Documented technology stack"] : ["Main features", "Technology stack"]), "Development approach", "Challenges", "Results & progress", ...(caseStudies[project.slug].gallery.length ? ["Image gallery"] : [])]) {
      await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    }
    await expect(page.locator(".case-gallery figure")).toHaveCount(caseStudies[project.slug].gallery.length);
    await expect(page.locator(".case-gallery .gallery-opener")).toHaveCount(0);
    await expect(page.locator("#role")).toContainText("To be documented");
    await expect(page.locator("#progress")).toContainText(project.slug === "paddock-labs" ? "not measured results" : project.slug === "eatwhat" ? "catalogue remains illustrative" : "No completion, deployment or measured outcomes are claimed");
    await expect(page.getByRole("link", { name: "Live demo", exact: false })).toHaveCount(0);
    const next = projects[(index + 1) % projects.length];
    const nextLink = page.getByRole("navigation", { name: "Next project", exact: true }).getByRole("link", { name: new RegExp(next.title) });
    await expect(nextLink).toHaveAttribute("href", `/projects/${next.slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await nextLink.click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(next.title);
  });
}

test("workspace doorway reaches case studies and shared navigation returns home", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("link", { name: "Explore EatWhat", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/eatwhat$/);
  await page.getByRole("link", { name: "All projects", exact: true }).click();
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  const navigation = isMobile ? page.locator("#mobile-navigation") : page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation.getByRole("link", { name: "About", exact: true })).toHaveAttribute("href", "#about");
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
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
    await expect(page.locator("#problem")).toContainText("Lap times and averages");
    await expect(page.getByRole("link", { name: "All projects", exact: true })).toHaveAttribute("href", "/?project=paddock-labs#work");
  } finally { await context.close(); }
});

test("website-first opening keeps a safe Visit link and proposal provenance", async ({page}) => {
 await page.goto('/projects/paddock-labs');
 await expect(page.locator('.project-site-opening')).toBeInViewport();
 await expect(page.locator('.site-header')).toBeHidden();
 await expect(page.getByRole('link',{name:'Visit Paddock Labs (opens in a new tab)',exact:true})).toHaveAttribute('href','https://www.paddocklab.lk');
 await expect(page.locator('.project-site-url')).toHaveText(/https:\/\/www.paddocklab.lk/);
 await expect(page.locator('.project-site-visit a').first()).toHaveAttribute('rel','noopener noreferrer');
 await expect(page.locator('.proposal-source')).toContainText('22 October 2026');
 await expect(page.locator('#features')).toContainText('Approval-dependent');
 await expect(page.locator('#progress')).toContainText('not measured results');
 await expect(page.locator('#role')).toContainText('not yet been supplied');
 await page.goto('/projects/campus-slot');
 await expect(page.locator('.project-site-visit')).toContainText('Website URL to be supplied');
 await expect(page.locator('.project-site-visit a')).toHaveCount(0);
});

for (const slug of ['paddock-labs', 'eatwhat']) {
 test(`${slug} uses the supplied full hero image with Visit and sourced details`, async ({page}) => {
  const project=projects.find(p=>p.slug===slug)!;
  await page.goto(`/projects/${slug}`);
  const capture=page.getByRole('img',{name:`${project.title} actual website hero`,exact:true});
  await expect(capture).toBeVisible();
  await expect.poll(()=>capture.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const ratio=await capture.evaluate(el=>{const b=el.getBoundingClientRect();return b.width/b.height;});
  expect(ratio).toBeCloseTo(project.screenshotSize!.width/project.screenshotSize!.height,2);
  await expect(page.locator('.project-site-pending')).toHaveCount(0);
  await expect(page.locator('.project-site-visit a').first()).toHaveAttribute('href',project.demo!);
  await expect(page.locator('.project-site-url')).toHaveText(new RegExp(project.demo!.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  if(slug==='eatwhat') {
   await expect(page.locator('#features')).toContainText('Private, immutable');
   await expect(page.locator('#features')).toContainText('unanimous');
   await expect(page.locator('#approach')).toContainText('SELECT FOR UPDATE');
   await expect(page.locator('#challenges')).toContainText('no restaurant API or geolocation');
   await expect(page.locator('.proposal-flow')).toContainText('Find common ground');
   await expect(page.getByRole('heading',{name:'Proposed features',exact:true})).toHaveCount(0);
   await expect(page.getByRole('link',{name:/View source on GitHub/})).toHaveAttribute('href',project.github!);
  }
 });
}
