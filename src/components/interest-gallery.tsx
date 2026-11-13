"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { MediaFrame } from "./media-frame";

type GalleryItem = { id: string; title: string; caption: string; image: string | null; aspect: string; alt?: string };

function GalleryPhoto({ item, kind }: { item: GalleryItem; kind: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  return <figure>
    {item.image ? <button ref={opener} className="gallery-opener" type="button" aria-label={`View ${item.title} ${kind}`} onClick={() => dialog.current?.showModal()}><MediaFrame src={item.image} alt={item.alt ?? `${item.title} — personal photograph by Sanupa`} label={`${item.title} ${kind}`} aspect={item.aspect} /><span className="gallery-hint">View {kind} ↗</span></button> : <MediaFrame src={null} alt="" label={`${item.title} ${kind}`} aspect={item.aspect} />}
    <figcaption><h3>{item.title}</h3><p>{item.caption}</p></figcaption>
    {item.image && <dialog ref={dialog} className="photo-dialog" aria-label={`${item.title} ${kind}`} onClose={() => opener.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="photo-dialog-content"><button type="button" className="dialog-close" aria-label={`Close ${kind}`} onClick={() => dialog.current?.close()} autoFocus><X aria-hidden="true" /></button><div className="expanded-photo"><Image src={item.image} alt={item.alt ?? `${item.title} — personal photograph by Sanupa`} fill sizes="90vw" /></div><p>{item.caption}</p></div>
    </dialog>}
  </figure>;
}

export function MediaGallery({ items, kind = "photograph", className = "interests-gallery" }: { items: GalleryItem[]; kind?: string; className?: string }) {
  return <div className={className}>{items.map(item => <GalleryPhoto key={item.id} item={item} kind={kind} />)}</div>;
}

export function InterestGallery({ items }: { items: GalleryItem[] }) {
  return <MediaGallery items={items} />;
}
