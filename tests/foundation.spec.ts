import {expect,test} from "@playwright/test";
const routes=["work","about","expertise","journey","playground","beyond","contact"];
test("Home stays minimal with fading dots and no portrait or other sections",async({page})=>{
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));await page.goto("/");
 await expect(page.getByRole("heading",{level:1})).toHaveText("Sanupa Gunarathne");
 await expect(page.locator(".home-intro p")).toContainText("Software Engineering undergraduate");
 expect(await page.locator(".minimal-home").evaluate(e=>getComputedStyle(e,"::before").maskImage)).toContain("radial-gradient");
 await expect(page.locator("main img, main canvas, .brand-bot, main .portfolio-section")).toHaveCount(0);
 expect(errors).toEqual([]);
});
test("route navigation supports mobile menu keyboard escape and active page",async({page})=>{
 await page.goto("/");await page.keyboard.press("Tab");await expect(page.getByRole("link",{name:"Skip to content"})).toBeFocused();await page.keyboard.press("Enter");await expect(page.getByRole("main")).toBeFocused();
 {await page.getByRole("button",{name:"Open menu"}).click();await page.keyboard.press("Escape");await expect(page.getByRole("button",{name:"Open menu"})).toBeFocused();await page.getByRole("button",{name:"Open menu"}).click();}
 const nav=page.locator("#dock-navigation");await nav.getByRole("link",{name:"About",exact:true}).click();await expect(page).toHaveURL(/\/about$/);
 await expect(page.getByRole("img",{name:"Halftone portrait of Sanupa Gunarathne"})).toBeVisible();await expect(page.locator(".ai-orbiter")).toHaveCount(10);
 await page.getByRole("link",{name:"cd .. — Back to Home",exact:true}).click();await expect(page).toHaveURL(/\/$/);
});
test("all section pages have deterministic terminal back links and readable content",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});for(const route of routes){await page.goto(`/${route}`);await expect(page.getByRole("heading",{level:1})).toHaveText(route[0].toUpperCase()+route.slice(1));await expect(page.getByRole("link",{name:"cd .. — Back to Home",exact:true})).toHaveAttribute("href","/");expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});
test("old section URLs resolve to dedicated routes",async({page})=>{await page.goto('/#about');await expect(page).toHaveURL(/\/about$/);await page.goto('/?project=eatwhat#work');await expect(page).toHaveURL(/\/work\?project=eatwhat$/);});

test("phone navigation remains usable without JavaScript",async({browser})=>{
 const context=await browser.newContext({baseURL:test.info().project.use.baseURL,javaScriptEnabled:false,viewport:{width:390,height:844}});
 try{const page=await context.newPage();await page.goto('/');await page.getByRole('navigation',{name:'Pages without JavaScript'}).getByRole('link',{name:'About',exact:true}).click();await expect(page).toHaveURL(/\/about$/);await expect(page.getByRole('img',{name:'Halftone portrait of Sanupa Gunarathne'})).toBeVisible();await page.getByRole('link',{name:'cd .. — Back to Home',exact:true}).click();await expect(page).toHaveURL(/\/$/);}finally{await context.close();}
});

test("menu dismisses outside and exposes an accessible active destination",async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Open menu'}).click();
 await expect(page.locator('#dock-navigation').getByRole('link',{name:'Home',exact:true})).toHaveAttribute('aria-current','page');
 await page.getByRole('heading',{level:1}).click();
 await expect(page.locator('#dock-navigation')).toBeHidden();
});
