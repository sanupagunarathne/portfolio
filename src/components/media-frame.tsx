import Image from "next/image";

export function MediaFrame({ src, alt, label, aspect = "landscape" }: { src: string | null; alt: string; label: string; aspect?: string }) {
  return <div className={`media-frame media-${aspect}`}>
    {src ? <Image src={src} alt={alt} fill sizes="(max-width: 767px) 90vw, 60vw" /> : <div className="media-empty" role="img" aria-label={`${label} — image not yet provided`}><span aria-hidden="true">[ + ]</span><p>{label}</p><span className="media-note">Image to be added</span></div>}
  </div>;
}
