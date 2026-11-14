import { expect, test } from "@playwright/test";
import { build } from "esbuild";

let bundle: string;
test.beforeAll(async () => {
  // Isolate the real gallery component in a browser; only Next's image loader is replaced.
  const result = await build({
    entryPoints: ["tests/fixtures/gallery.tsx"], bundle: true, write: false, platform: "browser", jsx: "automatic",
    define: { "process.env.NODE_ENV": '"production"' },
    plugins: [{ name: "native-test-image", setup(builder) {
      builder.onResolve({ filter: /^next\/image$/ }, () => ({ path: "image", namespace: "test" }));
      builder.onLoad({ filter: /.*/, namespace: "test" }, () => ({ contents: 'import React from "react"; export default function Image({fill, priority, ...props}) { return <img {...props} />; }', loader: "jsx", resolveDir: process.cwd() }));
    } }],
  });
  bundle = result.outputFiles[0].text;
});

test("supplied photos open a native modal, contain focus and restore it on close", async ({ page }) => {
  await page.route("http://gallery.test/**", route => {
    if (route.request().url().endsWith("fixture.svg")) return route.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="0" y="50">TEST ONLY</text></svg>' });
    return route.fulfill({ contentType: "text/html", body: '<main id="root"></main><script>' + bundle.replaceAll("</script", "<\\/script") + '</script>' });
  });
  await page.goto("http://gallery.test/");
  const opener = page.getByRole("button", { name: "View Test image photograph" });
  await opener.click();
  const modal = page.getByRole("dialog", { name: "Test image photograph" });
  await expect(modal).toBeVisible();
  await expect(modal.getByRole("button", { name: "Close photograph" })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  expect(await modal.evaluate(dialog => dialog.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(modal).toBeHidden();
  await expect(opener).toBeFocused();
  await opener.click();
  await modal.getByRole("button", { name: "Close photograph" }).click();
  await expect(modal).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.getByRole("button", { name: /View Missing/ })).toHaveCount(0);
  await page.getByRole("button", { name: "View Project capture screenshot" }).click();
  const screenshot = page.getByRole("dialog", { name: "Project capture screenshot" });
  await expect(screenshot.getByRole("img", { name: "Actual test screenshot description" })).toBeVisible();
  await screenshot.getByRole("button", { name: "Close screenshot" }).click();
  await expect(screenshot).toBeHidden();
});
