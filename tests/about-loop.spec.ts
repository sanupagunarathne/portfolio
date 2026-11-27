import {test,expect} from '@playwright/test';
test('editorial About has right-hand portrait, redesigned signature and no old controls',async({page,isMobile})=>{
 await page.goto('/about');
 await expect(page.locator('.about-editorial-copy')).toContainText('Software Engineering undergraduate');
 await expect(page.getByRole('img',{name:/redesigned personal signature/})).toBeVisible();
 await expect(page.getByRole('button',{name:/Pause AI|Pause universe/})).toHaveCount(0);
 await expect(page.getByText('A little curiosity. A lot of possibility.')).toHaveCount(0);
 if(!isMobile){const copy=(await page.locator('.about-editorial-copy').boundingBox())!;const photo=(await page.locator('.portrait-composition').boundingBox())!;expect(photo.x).toBeGreaterThan(copy.x+copy.width);}
 await expect(page.locator('.dock-current')).toHaveAttribute('href','/');await page.locator('.dock-current').click();await expect(page).toHaveURL(/\/$/);
 await expect(page.locator('.home-intro p')).toHaveCSS('font-family',/Doto/);
});
test('reduced motion keeps About static and signature readable',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/about');await expect(page.locator('.about-bird canvas')).toHaveCount(0);await expect(page.getByRole('img',{name:/redesigned personal signature/})).toBeVisible();});

test('the local bird renders and releases its scene for reduced motion',async({page})=>{await page.goto('/about');await page.locator('.about-bird').scrollIntoViewIfNeeded();await expect.poll(async()=>Number(await page.locator('.about-bird canvas').getAttribute('data-draw-calls'))).toBeGreaterThan(0);await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.about-bird canvas')).toHaveCount(0);await expect(page.locator('.static-bird')).toBeVisible();});
