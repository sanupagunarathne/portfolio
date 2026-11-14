import { createRoot } from "react-dom/client";
import { ContactForm } from "../../src/components/contact-form";

createRoot(document.getElementById("root")!).render(<ContactForm deliveryEnabled />);
