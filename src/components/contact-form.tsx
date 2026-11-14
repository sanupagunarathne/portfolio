"use client";

import { personal } from "@/data/personal";
import { useRef, useState, type FormEvent } from "react";

export function ContactForm({ deliveryEnabled }: { deliveryEnabled: boolean }) {
  const form = useRef<HTMLFormElement>(null);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    if (String(payload.name).trim().length < 2 || String(payload.message).trim().length < 10) {
      setStatus("Please include your name and a message of at least 10 characters."); return;
    }
    const message = `From: ${payload.name}\nReply to: ${payload.email}\nTopic: ${payload.topic}\n\n${payload.message}`;
    setDraft(message); setStatus("");
    if (!deliveryEnabled) { setStatus("Your message is prepared, not sent. Copy it below, or connect with me on LinkedIn."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15_000) });
      if (!response.ok || (await response.json()).accepted !== true) throw new Error("Delivery failed");
      setStatus("Your message was accepted for delivery. Thank you for getting in touch.");
      setDraft(""); form.current?.reset();
    } catch { setStatus("Your message could not be sent. Your text is still here; please try again or copy it below."); }
    finally { setBusy(false); }
  }

  return <form ref={form} className="contact-form mac-window" onSubmit={submit} aria-busy={busy} onChange={() => { setDraft(""); setStatus(""); }}>
    <div className="window-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span>new-message.ts</div>
    <div className="window-body">
      <h3>Tell me what you have in mind.</h3>
      <p className="content-note">{deliveryEnabled ? "Send a project idea, a question, or just say hello." : "Direct delivery is not connected yet. Prepare and copy a message here, or reach me on LinkedIn."}</p>
      <fieldset disabled={busy} className="contact-editable"><legend className="sr-only">Your contact details and message</legend><div className="contact-fields"><div><label htmlFor="contact-name">Your name <span>(required)</span></label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></div><div><label htmlFor="contact-email">Your email <span>(required)</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div>
      <label htmlFor="contact-topic">What is this about?</label><select id="contact-topic" name="topic" defaultValue="Project idea"><option>Project idea</option><option>Collaboration</option><option>Question</option><option>Just saying hello</option></select>
      <label htmlFor="contact-message">Your message <span>(required)</span></label><textarea id="contact-message" name="message" rows={5} required minLength={10} maxLength={5000} placeholder="A little context, an idea, or a question…" />
      <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave blank</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      </fieldset>
      <p className="content-note">Your details are used only to respond to this message. Nothing is saved in your browser.</p>
      <button className="button primary" type="submit" disabled={busy}>{busy ? "Sending…" : deliveryEnabled ? "Send message ↗" : "Prepare message ↗"}</button>
      <p className="form-status" role="status" aria-live="polite">{status && <span key={status} className="status-message">{status}</span>}</p>
      {draft && <div className="message-draft"><label htmlFor="message-draft">Your prepared message</label><textarea id="message-draft" value={draft} readOnly rows={7} /><button className="text-link" type="button" onClick={async () => { try { await navigator.clipboard.writeText(draft); setStatus("Message copied. It has not been sent."); } catch { setStatus("Copy is unavailable in this browser. Select the prepared message and copy it manually."); } }}>Copy message</button>{personal.email && <a className="text-link" href={`mailto:${personal.email}?subject=${encodeURIComponent("Portfolio enquiry")}&body=${encodeURIComponent(draft)}`}>Open in email app ↗</a>}</div>}
    </div>
  </form>;
}
