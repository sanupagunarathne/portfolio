import { createRoot } from "react-dom/client";
import { InterestGallery } from "../../src/components/interest-gallery";

// Test-only artwork, never imported into application content or represented as personal media.
createRoot(document.getElementById("root")!).render(<InterestGallery items={[
  { id: "fixture", title: "Test image", caption: "Gallery browser-test fixture", image: "/fixture.svg", aspect: "landscape" },
  { id: "missing", title: "Missing image", caption: "Placeholder fixture", image: null, aspect: "portrait" },
]} />);
