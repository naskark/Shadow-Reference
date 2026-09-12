import type { Metadata } from "next";
import type { FAQ, ToolDefinition } from "@/data/tools";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, TOOLS } from "@/data/tools";
import { TOOL_SEO, type ToolSeo } from "@/data/tool-seo";

export const SITE_DESCRIPTION =
  "Free online developer tools that run in your browser. JSON formatter, JWT decoder, Base64 encoder, regex tester, UUID generator, and 30+ more — no signup, no uploads, 100% private.";

export const SITE_KEYWORDS = [
  "developer tools",
  "json formatter",
  "json beautifier",
  "jwt decoder",
  "base64 encoder",
  "regex tester",
  "uuid generator",
  "unix timestamp converter",
  "html formatter",
  "css formatter",
  "free online tools",
];

export const POPULAR_TOOL_SLUGS = [
  "json-formatter",
  "json-validator",
  "jwt-decoder",
  "base64-encoder-decoder",
  "regex-tester",
  "uuid-generator",
  "timestamp-converter",
  "html-formatter",
  "css-formatter",
  "qr-code-generator",
  "url-encoder-decoder",
  "hash-generator",
] as const;

const faq = (question: string, answer: string): FAQ => ({ question, answer });

function uniqueFaqs(...groups: FAQ[][]): FAQ[] {
  const out: FAQ[] = [];
  const seen = new Set<string>();
  for (const group of groups) {
    for (const item of group) {
      const key = item.question.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

export function getToolSeo(tool: ToolDefinition): ToolSeo {
  const extra = TOOL_SEO[tool.slug];
  const universal: FAQ[] = [
    faq(
      `Is ${tool.name} free to use?`,
      `Yes. ${tool.name} on ${SITE_NAME} is free, with no account, no watermarks, and no server-side processing.`,
    ),
    faq(
      "Does this tool send my data to a server?",
      "No. All processing happens locally in your browser. Your input never leaves your device.",
    ),
  ];

  if (!extra) {
    return {
      title: `${tool.name} — Free Online Tool`,
      description: tool.description,
      searchTerms: [tool.name.toLowerCase()],
      intro: tool.description,
      faqs: uniqueFaqs(tool.faqs, universal),
    };
  }

  return {
    ...extra,
    faqs: uniqueFaqs(extra.faqs, tool.faqs, universal),
  };
}

export function absoluteTitle(pageTitle: string): string {
  return pageTitle.includes(SITE_NAME) ? pageTitle : `${pageTitle} | ${SITE_NAME}`;
}

export function toolCanonical(slug: string): string {
  return `${SITE_URL}/tools/${slug}`;
}

export function buildToolMetadata(tool: ToolDefinition): Metadata {
  const seo = getToolSeo(tool);
  const url = toolCanonical(tool.slug);
  const title = absoluteTitle(seo.title);

  return {
    title: { absolute: title },
    description: seo.description,
    keywords: seo.searchTerms,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description: seo.description,
    },
    twitter: {
      card: "summary",
      title,
      description: seo.description,
    },
  };
}

export function buildToolJsonLd(tool: ToolDefinition) {
  const seo = getToolSeo(tool);
  const url = toolCanonical(tool.slug);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: tool.name,
        alternateName: seo.searchTerms,
        description: seo.description,
        url,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        featureList: seo.searchTerms,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${url}#app` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: tool.name, item: url },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: `How to use ${tool.name}`,
        description: `Steps to ${seo.searchTerms[0] ?? tool.name.toLowerCase()} in your browser.`,
        step: tool.howToUse.map((text, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `Step ${index + 1}`,
          text,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: seo.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#tool-list`,
        name: `${SITE_NAME} developer tools`,
        description: SITE_TAGLINE,
        numberOfItems: TOOLS.length,
        itemListElement: TOOLS.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.name,
          url: toolCanonical(tool.slug),
        })),
      },
    ],
  };
}
