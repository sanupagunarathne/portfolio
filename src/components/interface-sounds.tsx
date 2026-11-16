"use client";

import { Volume2, VolumeX } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const SoundContext = createContext({ enabled: false, toggle: () => {} });

// Web Audio is unlocked only by a deliberate click/key press. No downloaded audio.
export function InterfaceSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const audio = useRef<AudioContext | null>(null);
  const lastPlayed = useRef(0);
  useEffect(() => {
    try { enabledRef.current = localStorage.getItem("portfolio-sound") === "on"; } catch { /* Private browsing keeps the default off. */ }
    // Keep hydration deterministic; update the UI after reading the saved preference.
    const frame = requestAnimationFrame(() => setEnabled(enabledRef.current));
    const unlock = () => {
      if (!enabledRef.current) return;
      try {
        audio.current ??= new AudioContext();
        if (audio.current.state === "suspended") void audio.current.resume().catch(() => {});
      } catch { /* Audio support is optional. */ }
    };
    const tone = (click: boolean) => {
      const context = audio.current;
      if (!enabledRef.current || !context || context.state !== "running" || document.hidden) return;
      const now = context.currentTime;
      if (now - lastPlayed.current < .07) return;
      lastPlayed.current = now;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(click ? 520 : 740, now);
      oscillator.frequency.exponentialRampToValueAtTime(click ? 280 : 560, now + .065);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(.025, now + .008);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .075);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(now); oscillator.stop(now + .08);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    };
    const control = (target: EventTarget | null) => target instanceof Element ? target.closest("a, button, input[type=range]") : null;
    const hover = (event: PointerEvent) => {
      const element = control(event.target);
      if (event.pointerType !== "mouse" || !element || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) return;
      tone(false);
    };
    const focus = (event: FocusEvent) => { if (control(event.target)?.matches(":focus-visible")) tone(false); };
    const click = (event: MouseEvent) => { if (control(event.target)) tone(true); };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
    document.addEventListener("pointerover", hover);
    document.addEventListener("focusin", focus);
    document.addEventListener("click", click);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
      document.removeEventListener("pointerover", hover);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("click", click);
      void audio.current?.close().catch(() => {}); audio.current = null;
    };
  }, []);
  const toggle = () => {
    const next = !enabled;
    enabledRef.current = next; setEnabled(next);
    try { localStorage.setItem("portfolio-sound", next ? "on" : "off"); } catch { /* Optional persistence. */ }
    if (next) {
      try { audio.current ??= new AudioContext(); void audio.current.resume().catch(() => {}); } catch { /* Optional audio. */ }
    }
  };
  return <SoundContext.Provider value={{ enabled, toggle }}>{children}</SoundContext.Provider>;
}

export function InterfaceSoundToggle() {
  const { enabled, toggle } = useContext(SoundContext);
  return <button className="sound-toggle" type="button" aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"} aria-pressed={enabled} title={enabled ? "Sound on" : "Sound off"} onClick={toggle}>{enabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}</button>;
}
