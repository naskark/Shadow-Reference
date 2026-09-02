import { SITE_NAME } from "@/data/tools";

export const metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 prose-tool">
      <h1 className="text-2xl font-bold sm:text-3xl">Terms of Service</h1>
      <p className="mt-4">Last updated: September 2026</p>

      <h2>Use of Service</h2>
      <p>
        {SITE_NAME} provides free browser-based developer tools &quot;as is.&quot; You may use these tools
        for personal and commercial development purposes.
      </p>

      <h2>No Warranty</h2>
      <p>
        Tools are provided without warranty. Results may not be suitable for production use without independent verification.
        Cryptographic, formatting, and conversion tools are helpers — not replacements for audited libraries.
      </p>

      <h2>Security</h2>
      <p>
        Do not paste production secrets, private keys, or sensitive tokens into tools on shared or untrusted devices.
        Decoding a JWT does not verify its signature.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. Continued use of the site constitutes acceptance of the updated terms.
      </p>
    </div>
  );
}
