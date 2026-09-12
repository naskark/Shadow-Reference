import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/data/tools";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}. All developer tools process data locally in your browser — JSON, JWTs, and secrets are never uploaded.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
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

      <h2>Advertising</h2>
      <p>
        The site may display labeled third-party advertisements from Google AdSense. Ads are placed away from
        tool buttons and inputs. What you paste into a tool is not sent to Google or to us.
      </p>
      <p>
        Google may use cookies or similar identifiers to serve and measure ads. See{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          className="text-[var(--accent)] hover:underline"
          rel="noopener noreferrer"
        >
          Google&apos;s advertising policy
        </a>{" "}
        and how to{" "}
        <a
          href="https://adssettings.google.com/"
          className="text-[var(--accent)] hover:underline"
          rel="noopener noreferrer"
        >
          control ad personalization
        </a>
        . Ads stay off until a publisher ID is configured for this site.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We do not use analytics products that log tool input. When ads are enabled, Google AdSense loads from
        Google&apos;s servers. That traffic is separate from tool processing, which stays in your browser.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Visit our <a href="/contact" className="text-[var(--accent)] hover:underline">Contact</a> page.
      </p>
    </div>
  );
}
