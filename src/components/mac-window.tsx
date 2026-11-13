import type { ReactNode } from "react";

export function MacWindow({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mac-window"><div className="window-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>{title}</span></div><div className="window-body">{children}</div></div>;
}
