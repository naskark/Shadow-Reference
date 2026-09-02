ShadowReference — Product & Build Specification
Static developer toolkit built with Next.js

1. Product Overview
   ShadowReference is a fast, privacy-friendly developer toolkit containing practical browser-based utilities for developers. Version 1 should be static/client-side: no backend, no database, no login, and no server-side processing. Tool logic should run in the user's browser whenever technically possible.
   Primary goals:
   Fast loading and excellent Core Web Vitals.
   Each tool has its own indexable URL and useful explanatory content.
   Responsive desktop/mobile UI.
   Copy, download, clear, swap, sample-input and validation actions where relevant.
   No user input should be sent to a server for client-side tools.
   Architecture should allow future API/AI features without rewriting the application.
2. Recommended Stack
   Next.js (App Router) with TypeScript.
   Static/client-side implementation; avoid API routes for V1.
   Tailwind CSS or clean CSS modules; keep dependencies minimal.
   Use browser Web APIs and native JavaScript where sufficient.
   Deploy as a static-compatible Next.js site on Cloudflare.
   Use reusable ToolLayout, ToolHeader, Editor, OutputPanel, ActionBar, CopyButton, DownloadButton and FAQ components.
3. Information Architecture
   / — homepage with search, categories and featured tools.
   /tools — complete tool directory.
   /tools/json-formatter
   /tools/json-validator
   ... one canonical route per tool.
   /about, /privacy, /terms, /contact
   Optional /guides section for original developer explanations.
4. V1 Tool Set — 30 Tools
5. JSON Formatter & Validator
   Format JSON with 2/4-space indentation, validate syntax, show line/column error when possible, copy and download result, minify toggle, sample JSON.
6. JSON Minifier
   Remove unnecessary whitespace from valid JSON, validate before minifying, copy/download, show input/output size.
7. JSON to TypeScript
   Convert representative JSON objects into TypeScript interfaces/types, support nested objects and arrays, configurable root type name, copy/download.
8. JSON to CSV
   Convert arrays of JSON objects into CSV, detect columns, handle missing fields, escaping and nested values sensibly, copy/download CSV.
9. JSON ↔ YAML
   Convert valid JSON to YAML and YAML to JSON. Show validation errors and copy/download actions.
10. JWT Decoder
    Decode JWT header and payload locally without verifying signatures. Display readable JSON, token parts, expiration timestamp when present, and an explicit note that decoding is not verification.
11. Base64 Encoder / Decoder
    Encode/decode UTF-8 text using browser APIs where available. Handle invalid input gracefully and provide copy/clear/swap.
12. URL Encoder / Decoder
    Encode/decode URL components and full URLs. Provide separate encode/decode actions and safe error messages.
13. HTML Entity Encoder / Decoder
    Convert characters to HTML entities and decode entities back to text. Include common examples.
14. URL Parser
    Parse a URL into protocol, username, host, port, pathname, query parameters and hash. Allow editing parameters and copying parsed values.
15. UUID Generator
    Generate UUID v4 values locally. Allow quantity selection within a safe limit, one-click copy and newline/CSV output.
16. Regex Tester
    Enter regex and test text, support flags, highlight matches, show match groups/indexes and provide common regex examples. Use safe client-side execution.
17. Regex Escape / Unescape
    Escape regex metacharacters for literal matching and unescape supported sequences where safe.
18. Timestamp Converter
    Convert Unix seconds/milliseconds to local/UTC date-time and convert date-time to Unix timestamps. Include current timestamp button.
19. Date & Time Converter
    Convert between ISO 8601, local date/time, UTC and common readable formats. Show timezone explicitly.
20. HTTP Status Code Reference
    Search/filter HTTP status codes, display code, category, meaning and typical use. Include 1xx–5xx reference content.
21. Color Converter
    Convert HEX, RGB, RGBA, HSL and HSLA values. Include color preview, copy buttons and validation.
22. CSS Formatter / Minifier
    Format CSS for readability and minify CSS by removing unnecessary whitespace/comments while preserving valid content as far as possible.
23. HTML Formatter / Minifier
    Format HTML with indentation and minify it while preserving text/attributes. Provide warnings for malformed markup when detectable.
24. JavaScript Formatter / Minifier
    Provide a lightweight browser-based formatter/minifier. Clearly label it as lightweight and avoid promising full compiler-level transformations.
25. SQL Formatter
    Format common SQL with indentation and keyword spacing. Support common SELECT/INSERT/UPDATE/DELETE syntax; do not execute SQL.
26. Markdown Previewer
    Split editor/preview view, render Markdown safely, copy Markdown, and provide sample content. Sanitize rendered HTML.
27. CSV ↔ JSON
    Convert CSV to JSON and JSON arrays to CSV with configurable delimiter, headers and escaping.
28. YAML Validator
    Validate YAML and show useful parse errors. Provide formatted/normalized output where supported.
29. XML Formatter / Validator
    Format XML and validate well-formedness using browser XML parsing. Show parse errors and copy/download.
30. Hash Generator
    Generate SHA-256, SHA-384 and SHA-512 hashes using Web Crypto API. Explain that hashing is one-way.
31. HMAC Generator
    Generate HMAC using Web Crypto API for supported algorithms. Keep secret entirely client-side and clearly warn users not to paste production secrets into shared/public environments.
32. cURL to Fetch
    Convert common cURL requests into JavaScript fetch code. Support URL, method, headers and common data flags; clearly state unsupported flags.
33. cURL to Axios
    Convert common cURL requests into Axios JavaScript/TypeScript snippets.
34. QR Code Generator
    Generate QR codes for text, URLs and other small payloads entirely in-browser. Provide PNG/SVG download if the chosen client-side library supports it.
35. Standard Tool Page UX
    Breadcrumbs: Home > Category > Tool.
    H1 containing the tool name.
    One-sentence value proposition.
    Main interactive tool above the fold.
    Primary actions: Run/Format/Convert/Generate; secondary actions: Copy, Download, Clear, Swap as applicable.
    Input/output panels with accessible labels and keyboard support.
    Error state must be clear, non-destructive and actionable.
    Example/sample input button.
    How to use section.
    What the tool does / limitations section.
    Example section with real input/output.
    FAQ with original, tool-specific questions.
    Related tools section.
    Do not put ads directly beside buttons, inputs or controls.
36. SEO Requirements
    Every tool must be a real, useful page rather than a thin page containing only an input box. Google states that AdSense-ready pages should provide unique, relevant content, clear navigation and a good user experience.
    Unique title and meta description per tool.
    Canonical URL per tool.
    One H1 and logical H2/H3 structure.
    Useful original explanation of the tool, not copied documentation.
    Tool-specific examples and FAQs.
    Internal links to related tools.
    Breadcrumb structured data where appropriate.
    WebApplication/SoftwareApplication structured data only when accurate and appropriate.
    XML sitemap and robots.txt.
    Open Graph and Twitter/X metadata.
    404 page and sensible redirects.
    No doorway pages or keyword-stuffed near-duplicates.
37. AdSense/Monetization Considerations
    Do not implement ads in V1 until the site has substantial, useful content and is fully functional.
    Ads must never resemble buttons or be placed so close to interactive controls that accidental clicks are likely.
    Do not encourage users to click ads.
    Do not build pages primarily to display ads.
    Keep tool functionality and explanatory content as the primary value of every page.
    Create Privacy Policy, Terms, Contact and About pages before monetization.
    Do not send user tool inputs to a server unless a future feature explicitly requires it and the privacy implications are documented.
38. Design System
    Clean developer-focused interface; modern but not visually heavy.
    Desktop: centered max-width content with optional left category navigation.
    Mobile: stacked editor/output panels.
    Dark and light mode.
    Monospace font for code/data areas; readable sans-serif for explanations.
    Consistent button hierarchy and status/error components.
    Keyboard-friendly controls.
    Do not use excessive animations.
    Persist only harmless UI preferences such as theme in localStorage.
39. Security & Privacy
    Client-side tools should not transmit input data to any backend.
    Never log tool input to analytics.
    Do not store secrets, JWTs, API keys or passwords in localStorage.
    Sanitize Markdown/HTML preview output to prevent XSS.
    Use Web Crypto APIs for cryptographic operations where possible.
    Clearly distinguish decoding from verification for JWTs.
    Add a privacy note on tools that may receive sensitive-looking data.
40. Performance Requirements
    Prefer server-rendered/static page content with client components only around interactive tool logic.
    Lazy-load heavy libraries such as QR generation or advanced parsers.
    Avoid loading every tool's JavaScript on the homepage.
    Use code splitting by route.
    Keep third-party scripts to a minimum.
    Target excellent Lighthouse performance and Core Web Vitals.
    No backend request should be required for the core V1 tool functionality.
41. Suggested Project Structure
    src/
    app/
    page.tsx
    tools/
    page.tsx
    json-formatter/page.tsx
    json-validator/page.tsx
    json-minifier/page.tsx
    json-to-typescript/page.tsx
    ...
    about/page.tsx
    privacy/page.tsx
    terms/page.tsx
    contact/page.tsx
    sitemap.ts
    robots.ts
    components/
    ToolLayout.tsx
    ToolHeader.tsx
    Editor.tsx
    OutputPanel.tsx
    ActionBar.tsx
    CopyButton.tsx
    DownloadButton.tsx
    ErrorMessage.tsx
    ExampleInput.tsx
    RelatedTools.tsx
    FAQ.tsx
    lib/
    tools/
    json.ts
    jwt.ts
    regex.ts
    timestamp.ts
    color.ts
    csv.ts
    yaml.ts
    xml.ts
    crypto.ts
    curl.ts
    data/
    tools.ts
    http-status-codes.ts
    styles/
    globals.css
42. Implementation Rules for Cursor
    Build V1 completely before adding AI, accounts, payments or a database.
    Use TypeScript strict mode.
    Do not create a separate backend for V1.
    Do not use an external API for a tool that can run reliably in the browser.
    Every tool must have unit tests for its core transformation/validation logic.
    Handle malformed input without crashing the page.
    Keep tool logic separate from UI components so it is testable.
    Add accessible labels, focus states and keyboard navigation.
    Do not fabricate tool results or silently modify user input.
    Add sample inputs and expected outputs for each tool.
    Do not place ads during initial development; reserve clearly defined ad slots for a later monetization phase.
    Use reusable components rather than duplicating the same UI on every page.
43. Acceptance Criteria
    All 30 tools have individual working routes.
    All tools work without a backend or database.
    All core transformations happen locally in the browser.
    No console errors in normal use.
    Invalid input produces useful error messages.
    Copy/download actions work where applicable.
    Mobile and desktop layouts are usable.
    Every tool has unique metadata and explanatory content.
    Navigation/search can discover every tool.
    Sitemap and robots.txt are generated.
    Privacy, Terms, About and Contact pages exist.
    The application can be deployed as a static Next.js site.
44. Future Expansion (Do Not Build in V1)
    AI code explanation/generation.
    User accounts and saved history.
    Cloud-saved snippets.
    Premium tools/subscriptions.
    Team workspaces.
    Server-side PDF/image processing.
    Public API.
    Personalized dashboards.
45. Product Positioning
    ShadowReference should feel like a developer's dependable reference desk: a place to quickly solve small technical problems without unnecessary setup, login or data upload.
    Suggested tagline: “The developer reference desk for everyday problems.”
46. Cursor Instruction — Build Order
    1.Step 1: Create the Next.js TypeScript project and global design system.
    2.Step 2: Build shared layout/navigation/search/theme components.
    3.Step 3: Build the tool registry and category model.
    4.Step 4: Implement the first 10 highest-priority tools.
    5.Step 5: Add tests and error handling.
    6.Step 6: Implement the remaining 20 tools.
    7.Step 7: Add SEO metadata, sitemap, robots and structured data.
    8.Step 8: Add About, Privacy, Terms and Contact pages.
    9.Step 9: Run Lighthouse, accessibility and responsive checks.
    10.Step 10: Prepare static deployment; do not add backend/database.
47. Priority Categories
    Data & JSON
    Encoding & URL
    Security & Tokens
    Regex & Text
    Date & Time
    Web & HTTP
    Code Formatting
    Data Conversion
    Cryptography
    Developer Productivity

Note for Cursor: Treat this document as the product specification. Make reasonable implementation decisions without asking for confirmation for every small detail, but do not add backend infrastructure, authentication, payments or AI unless explicitly requested.
