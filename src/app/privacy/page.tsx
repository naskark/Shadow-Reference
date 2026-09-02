import { SITE_NAME } from "@/data/tools";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 prose-tool">
      <h1 className="text-2xl font-bold sm:text-3xl">Privacy Policy</h1>
      <p className="mt-4">Last updated: September 2026</p>

      <h2>Overview</h2>
      <p>
        {SITE_NAME} is designed with privacy in mind. All V1 tools process data locally in your browser.
        We do not collect, store, or transmit your tool inputs to any server.
      </p>

      <h2>Data Processing</h2>
      <ul>
        <li>Tool inputs are processed entirely client-side using JavaScript and browser Web APIs.</li>
        <li>We do not log tool input to analytics or error reporting services.</li>
        <li>We do not store JWTs, API keys, passwords, or secrets in localStorage.</li>
      </ul>

      <h2>Local Storage</h2>
      <p>
        We may store harmless UI preferences (such as light/dark theme) in your browser&apos;s localStorage.
        No sensitive data is persisted.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        V1 does not include third-party analytics or advertising. If added in the future, this policy will be updated accordingly.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Visit our <a href="/contact" className="text-[var(--accent)] hover:underline">Contact</a> page.
      </p>
    </div>
  );
}
