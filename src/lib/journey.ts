// One normalized, native-scroll timeline shared by camera, entrance and exit.
export const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
export const smooth = (a: number, b: number, n: number) => { const t = clamp01((n - a) / (b - a)); return t * t * (3 - 2 * t); };
export const cameraZ = (progress: number) => 30 - progress * 140;
export const projectZ = (index: number) => -10 - index * 26;
export const projectProgress = (index: number) => (30 - projectZ(index) - 9) / 140;
export class JourneyState { progress = 0; focus = -1; zoom = 0; running = false; visible = false; invalidate = () => {}; connect(callback: () => void) { this.invalidate = callback; } }

export const planetX = (index:number, compact:boolean) => (index % 2 ? 1 : -1) * (compact ? 1.05 : 2.3);
