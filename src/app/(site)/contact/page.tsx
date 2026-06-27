import { redirect } from "next/navigation";

// There is no standalone contact page — the contact section lives on the
// homepage. Visiting /contact sends the user straight to that section.
export default function ContactPage() {
  redirect("/#contact");
}
