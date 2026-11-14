"use client";

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

export function RetroComputer() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => { if (preference.matches) setOpen(false); };
    preference.addEventListener("change", stop);
    return () => preference.removeEventListener("change", stop);
  }, []);
  return <div className="retro-computer" role="group" aria-label="Retro computer viewer">
    <div className="retro-stage">{open ? <iframe title="Retro computer — interactive 3D model by Urpo" src="https://sketchfab.com/models/f844c0357d284fd8baa1435e9ff31bb2/embed?ui_theme=dark&autostart=0" allow="fullscreen; xr-spatial-tracking" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="retro-placeholder"><Monitor size={56} aria-hidden="true" /><h3>Retro computer</h3><p>Explore Urpo&apos;s interactive model.</p><button type="button" className="button primary" onClick={() => setOpen(true)}>Load 3D computer</button></div>}</div>
    {open && <><p className="content-note" role="status">Sketchfab viewer loaded. If unavailable, open the model below.</p><button type="button" className="text-link" onClick={() => setOpen(false)}>Close 3D viewer</button></>}
    <p className="model-credit"><a href="https://sketchfab.com/3d-models/retro-computer-f844c0357d284fd8baa1435e9ff31bb2" target="_blank" rel="noopener noreferrer">Retro computer</a> by <a href="https://sketchfab.com/Urpo" target="_blank" rel="noopener noreferrer">Urpo</a> on <a href="https://sketchfab.com" target="_blank" rel="noopener noreferrer">Sketchfab</a><span className="sr-only"> (links open in new tabs)</span></p>
  </div>;
}
