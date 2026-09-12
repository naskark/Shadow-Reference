import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/data/tools";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} about bugs, feedback, or new developer tools like JSON formatter and JWT decoder.`,
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 prose-tool">
      <h1 className="text-2xl font-bold sm:text-3xl">Contact</h1>
      <p className="mt-4">
        Have feedback, found a bug, or want to suggest a tool? We&apos;d love to hear from you.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Email: <a href="mailto:hello@shadowreference.dev" className="text-[var(--accent)] hover:underline">hello@shadowreference.dev</a>
      </p>

      <h2>Bug Reports</h2>
      <p>
        When reporting a tool issue, please include the tool name, sample input (redact secrets), expected output,
        and your browser version. This helps us reproduce and fix problems quickly.
      </p>

      <h2>{SITE_NAME}</h2>
      <p>The developer reference desk for everyday problems.</p>
    </div>
  );
}
