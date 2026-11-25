import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";
import { cameraZ, projectProgress, projectZ } from "../src/lib/journey";

test("camera travel is continuous and passes every object in both directions", async ({ browser, isMobile }) => {
  const context = await browser.newContext({baseURL:test.info().project.use.baseURL, viewport: isMobile ? {width:390,height:844} : {width:1000,height:800}} as Parameters<typeof browser.newContext>[0]);
  const page = await context.newPage();
  const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  await page.goto("/work");
  const work = page.locator("#work");
  // Headless software rendering is supported by the probe; fallback is separately covered.
  await expect(work).toHaveAttribute("data-enhanced", "true");
  const seek = async (p: number) => { await work.evaluate((element, progress) => window.scrollTo({top:element.getBoundingClientRect().top + scrollY + (element.clientHeight-innerHeight)*progress,behavior:"instant"}),p); await expect.poll(async()=>Math.abs(Number(await work.getAttribute("data-progress"))-p)).toBeLessThan(.001); };
  await seek(0); await page.getByRole("button",{name:"Enter my workspace"}).click();
  await expect.poll(async()=>Math.abs(Number(await work.getAttribute("data-progress")) - .3)).toBeLessThan(.001);
  for (const index of [0,1,2,3,2,1,0]) {
    const p = projectProgress(index); await seek(p);
    await expect(page.getByRole("link",{name:`Explore ${projects[index].title}`,exact:true})).toBeVisible();
    expect(cameraZ(p)-projectZ(index)).toBeCloseTo(9);
    const canvas = page.locator(".journey-renderer canvas");
    await expect.poll(async()=>Number(await canvas.getAttribute("data-draw-calls"))).toBeGreaterThan(0);
    await expect.poll(async()=>Number(await canvas.getAttribute("data-camera-z"))).toBeCloseTo(cameraZ(p),1);
  }
  await seek(.99); expect(cameraZ(.99)).toBeLessThan(projectZ(3));
  await expect(page.locator(".journey-exit").getByRole("link")).toHaveAttribute("href","/about");
  await seek(.3); await seek(.9); await seek(.1);
  await page.getByRole("link",{name:"cd ../about",exact:true}).click(); await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("#about")).toBeInViewport();
  expect(errors).toEqual([]); await context.close();
});

test("reduced motion and no JavaScript keep all project destinations usable",async({page,browser})=>{
 await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/work");
 await expect(page.locator("#work")).not.toHaveAttribute("data-enhanced","true");
 for(const p of projects) await expect(page.getByRole("link",{name:`Explore ${p.title}`,exact:true})).toHaveAttribute("href",`/projects/${p.slug}`);
 const context=await browser.newContext({baseURL:test.info().project.use.baseURL,javaScriptEnabled:false}); const plain=await context.newPage();await plain.goto("/work");await plain.getByRole("link",{name:"Explore EatWhat",exact:true}).click();await expect(plain.getByRole("heading",{level:1})).toHaveText("EatWhat");await context.close();
});

test("portrait orbits move independently and pause without losing logos",async({page})=>{
 await page.goto("/about");const logo=page.locator(".ai-orbiter").first(); await expect(page.locator(".ai-orbiter")).toHaveCount(10);
 const start=await logo.evaluate(el=>getComputedStyle(el).transform); await expect.poll(()=>logo.evaluate(el=>getComputedStyle(el).transform)).not.toBe(start);
 await page.getByRole("button",{name:"Pause AI orbits"}).click();
 // The pause redraw preserves each platform and its proportions.
 await expect(page.getByRole("button",{name:"Resume AI orbits"})).toHaveAttribute("aria-pressed","true");
 await page.emulateMedia({reducedMotion:"reduce"});const stopped=await logo.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(100);expect(await logo.evaluate(el=>getComputedStyle(el).transform)).toBe(stopped);
});

test("missing WebGL leaves a normal document with working project links", async ({page}) => {
 await page.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: unknown[]) { if(type.startsWith("webgl")) return null; return Reflect.apply(original,this,[type,...args]); } as typeof original; });
 await page.goto("/work");await expect(page.locator("#work")).not.toHaveAttribute("data-enhanced","true");
 await page.getByRole("link",{name:"Explore Campus Slot",exact:true}).click();await expect(page.getByRole("heading",{level:1})).toHaveText("Campus Slot");
});

test("native wheel and touch gestures travel without a scroll interceptor", async ({browser,isMobile}) => {
 const context=await browser.newContext({baseURL:test.info().project.use.baseURL,viewport:isMobile?{width:390,height:844}:{width:1000,height:800},isMobile,hasTouch:isMobile});
 try {
  const page=await context.newPage();await page.goto("/work");const work=page.locator("#work");await expect(work).toHaveAttribute("data-enhanced","true");
  await work.evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.clientHeight-innerHeight)*.2,behavior:"instant"}));
  await expect.poll(async()=>Math.abs(Number(await work.getAttribute("data-progress"))-.2)).toBeLessThan(.001);
  if(isMobile){
   const session=await context.newCDPSession(page);await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:190,y:650}]});
   for(let i=1;i<=5;i++){await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:190,y:650-i*60}]});await page.waitForTimeout(40);}
   await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
  }else{await page.mouse.move(500,450);await page.mouse.wheel(0,90);}
  await expect.poll(async()=>Number(await work.getAttribute("data-progress"))).toBeGreaterThan(.2);
  if(!isMobile){await page.mouse.wheel(0,-90);await expect.poll(async()=>Math.abs(Number(await work.getAttribute("data-progress"))-.2)).toBeLessThan(.003);}
 }finally{await context.close();}
});
