"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Download } from "lucide-react";

export function ContactForm({ email }: { email: string | null }) {
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [length, setLength] = useState(0);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const reply = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) { setNotice("Please enter your name and a message, beyond just spaces."); return; }
    setDraft(`To: Sanupa Gunarathne\nFrom: ${name} <${reply}>\nSubject: ${data.get("topic")}\n\n${message}`);
    setNotice("Your draft is ready below. No message has been sent.");
  }

  async function copy() {
    try { await navigator.clipboard.writeText(draft); setNotice("Message copied. No message has been sent."); }
    catch { setNotice("Copy is unavailable in this browser. Select the draft text to copy it, or download it."); }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "message-for-sanupa.txt"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Draft downloaded. No message has been sent.");
  }

  return <div className="contact-form-wrap">
    <form className="contact-form" onSubmit={prepare} onChange={() => { setDraft(""); setNotice(""); }}>
      <h3>Start a conversation</h3>
      <p id="delivery-note">{email ? "Prepare your message, then open it in your email app." : "Direct delivery is not connected yet. You can prepare, copy or download your message here."}</p>
      <div className="form-row">
        <label>Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label>
        <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
      </div>
      <label>What&apos;s on your mind?<select name="topic" defaultValue="Project enquiry"><option>Project enquiry</option><option>Collaboration</option><option>Just saying hello</option><option>Other</option></select></label>
      <label htmlFor="contact-message">Your message <span aria-hidden="true">*</span></label>
      <textarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={5} placeholder="A little about your idea, timeline, or what you’d like to talk about…" aria-describedby="message-help" onChange={(event) => setLength(event.target.value.length)} />
      <p id="message-help" className="field-help">10–3,000 characters · {length.toLocaleString()} / 3,000</p>
      <div className="form-bottom"><span>All fields marked * are required.<br />Your draft stays in this page until you copy or export it.</span><button className="button primary" type="submit" aria-describedby="delivery-note">Prepare message <ArrowUpRight size={18} aria-hidden="true" /></button></div>
    </form>
    <p className="form-status" role="status">{notice}</p>
    {draft && <div className="message-preview"><h4>Review your message</h4><pre tabIndex={0}>{draft}</pre><div className="draft-actions"><button type="button" className="button secondary" onClick={copy}><Copy size={16} aria-hidden="true" />Copy message</button><button type="button" className="button secondary" onClick={download}><Download size={16} aria-hidden="true" />Download draft</button>{email && <a className="button primary" href={`mailto:${email}?subject=${encodeURIComponent("Portfolio enquiry")}&body=${encodeURIComponent(draft)}`}>Open email app</a>}</div></div>}
  </div>;
}
