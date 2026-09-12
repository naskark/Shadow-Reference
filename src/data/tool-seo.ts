import type { FAQ } from "@/data/tools";

const faq = (question: string, answer: string): FAQ => ({ question, answer });

export type ToolSeo = {
  title: string;
  description: string;
  searchTerms: string[];
  intro: string;
  faqs: FAQ[];
};

export const TOOL_SEO: Record<string, ToolSeo> = {
  "json-formatter": {
    title: "JSON Formatter — Free Online Beautifier",
    description:
      "Free online JSON formatter and beautifier. Pretty-print, indent, and validate JSON in your browser. No signup, no uploads — 100% private.",
    searchTerms: ["json formatter", "json beautifier", "pretty print json", "json pretty printer", "format json online", "json indent"],
    intro:
      "Use this free online JSON formatter to beautify and pretty-print JSON instantly. Paste messy or minified JSON, click Format, and get readable 2-space indented output with syntax validation. Everything runs locally in your browser, so API payloads, config files, and secrets never leave your device. It is a fast JSON beautifier and pretty printer for developers who need clean JSON without installing an editor plugin.",
    faqs: [
      faq("What is a JSON formatter?", "A JSON formatter (also called a JSON beautifier or pretty printer) takes compact or messy JSON and rewrites it with consistent indentation and line breaks so you can read and debug it."),
      faq("Is this JSON formatter free?", "Yes. This online JSON formatter is free, with no signup, no watermarks, and no file-size account limits beyond what your browser can handle."),
      faq("Does the JSON beautifier upload my data?", "No. Formatting and validation run entirely in your browser. Your JSON is never sent to a server."),
      faq("Can I pretty-print minified JSON?", "Yes. Paste minified JSON and format it to restore readable indentation. Use the JSON Minifier if you need the reverse."),
    ],
  },
  "json-validator": {
    title: "JSON Validator — Check JSON Syntax Online",
    description:
      "Free JSON validator to check JSON syntax online. Get line and column errors instantly in your browser. No upload, no signup.",
    searchTerms: ["json validator", "validate json", "json lint", "json checker", "check json syntax", "jsonlint"],
    intro:
      "This free JSON validator checks whether your text is valid JSON and highlights syntax problems with line and column hints. Use it as an online JSON lint or JSON checker before you ship an API payload or config file. Validation happens locally — nothing is uploaded. If you also want indented output, use the JSON Formatter; this tool focuses on catching invalid JSON quickly.",
    faqs: [
      faq("How do I validate JSON online?", "Paste your JSON and click Validate. If the syntax is invalid, the tool reports the error location so you can fix trailing commas, missing quotes, or extra commas."),
      faq("Is this the same as JSONLint?", "It serves the same job as a JSON lint/checker: confirm the document is valid JSON. It does not check JSON Schema."),
      faq("Does JSON validation happen on a server?", "No. Parsing runs in your browser with the built-in JSON parser."),
    ],
  },
  "json-minifier": {
    title: "JSON Minifier — Compact JSON Online",
    description:
      "Free JSON minifier to remove whitespace and compact JSON for production payloads. Runs in your browser — no uploads.",
    searchTerms: ["json minifier", "minify json", "compress json", "json compact", "remove json whitespace"],
    intro:
      "Minify JSON online to strip whitespace and shrink payloads for APIs, localStorage, or static files. This JSON minifier compacting valid JSON with JSON.stringify, then shows input vs output size so you can see the savings. Invalid JSON is rejected instead of silently corrupting data. All minification stays on your device.",
    faqs: [
      faq("Does minifying JSON change values?", "No. It only removes insignificant whitespace. Key order is preserved."),
      faq("Can I undo JSON minify?", "Use the JSON Formatter to pretty-print the compact output again."),
    ],
  },
  "json-to-typescript": {
    title: "JSON to TypeScript — Generate Types Online",
    description:
      "Convert JSON to TypeScript types online. Generate interfaces from JSON objects and arrays in your browser. Free, private, no signup.",
    searchTerms: ["json to typescript", "json to ts", "json to interface", "generate typescript types from json", "json to type"],
    intro:
      "Convert JSON to TypeScript types in the browser. Paste a representative JSON sample and generate nested object and array types you can copy into a project. This JSON-to-interface helper is for quick scaffolding — not a replacement for OpenAPI or schema codegen — and never uploads your payload.",
    faqs: [
      faq("Can it generate TypeScript interfaces from nested JSON?", "Yes. Nested objects and arrays are converted recursively into TypeScript type aliases."),
      faq("Does it support optional fields?", "Fields present in the sample are required in the generated type. Missing keys in some objects are not inferred as optional."),
    ],
  },
  "json-to-csv": {
    title: "JSON to CSV Converter — Free Online",
    description:
      "Convert JSON arrays to CSV online. Automatic columns, proper escaping, and instant download. Free JSON to CSV converter in your browser.",
    searchTerms: ["json to csv", "convert json to csv", "json to spreadsheet", "json array to csv", "json to excel csv"],
    intro:
      "Convert a JSON array of objects into spreadsheet-ready CSV. Columns are detected from object keys, values are escaped for commas and quotes, and you can copy or download the result. Nested objects are stringified into cells. Conversion is local, so customer exports and reports never hit a server.",
    faqs: [
      faq("What JSON shape does the converter need?", "An array of objects, such as [{\"name\":\"Ada\",\"role\":\"Engineer\"}]. Other shapes are rejected with a clear error."),
      faq("Can I open the CSV in Excel?", "Yes. Download the CSV and open it in Excel, Google Sheets, or Numbers."),
    ],
  },
  "json-yaml": {
    title: "JSON to YAML Converter — Free Online",
    description:
      "Convert JSON to YAML and YAML to JSON online. Free bidirectional converter with validation. Runs locally in your browser.",
    searchTerms: ["json to yaml", "yaml to json", "json yaml converter", "convert json to yaml", "yml to json"],
    intro:
      "Switch between JSON and YAML in either direction. Paste JSON to get YAML, or YAML to get JSON, with parse errors shown clearly. Useful for Kubernetes manifests, CI config, and app settings. YAML anchors and custom tags may not round-trip perfectly; standard mappings and lists convert cleanly. Nothing is uploaded.",
    faqs: [
      faq("Can I convert YAML to JSON as well?", "Yes. Choose the conversion direction — JSON → YAML or YAML → JSON."),
      faq("Is YAML the same as YML?", "Yes. .yml and .yaml are the same format. This converter handles both."),
    ],
  },
  "jwt-decoder": {
    title: "JWT Decoder — Decode JWT Tokens Online",
    description:
      "Free JWT decoder to inspect header and payload claims in your browser. Decode JWT tokens locally — no verification, no upload, no signup.",
    searchTerms: ["jwt decoder", "decode jwt", "jwt debugger", "json web token decoder", "jwt parser", "inspect jwt"],
    intro:
      "Decode JWT tokens online and inspect the header, payload, and expiration without sending the token anywhere. This JWT debugger is for reading claims — it does not verify signatures, so never treat decoded data as trusted. Paste a token, click Decode, and review JSON claims locally. Avoid production tokens on shared devices.",
    faqs: [
      faq("Does this JWT decoder verify signatures?", "No. It only base64-decodes the header and payload. Signature verification requires the secret or public key and a real verifier."),
      faq("Is it safe to paste a JWT here?", "Processing is local, but avoid production tokens on shared or untrusted computers. JWTs can contain emails, user IDs, and other claims."),
      faq("Can I decode an expired JWT?", "Yes. Expiration is displayed when the exp claim exists; an expired token can still be decoded."),
    ],
  },
  "base64-encoder-decoder": {
    title: "Base64 Encode & Decode — Free Online",
    description:
      "Free Base64 encoder and decoder for UTF-8 text. Encode or decode Base64 online in your browser. No upload, no signup.",
    searchTerms: ["base64 encoder", "base64 decoder", "base64 encode", "base64 decode", "encode base64 online", "decode base64"],
    intro:
      "Encode and decode Base64 online with UTF-8 support. Convert text to Base64 for data URLs, basic auth headers, or email-safe payloads, then decode it back. Swap output into input to reverse a conversion quickly. Invalid Base64 shows a clear error instead of garbage text. All encoding stays in the browser.",
    faqs: [
      faq("Does this Base64 tool support Unicode?", "Yes. Text is encoded and decoded as UTF-8, so emoji and non-Latin characters work."),
      faq("Is Base64 encryption?", "No. Base64 is encoding, not encryption. Anyone can decode it."),
    ],
  },
  "url-encoder-decoder": {
    title: "URL Encoder Decoder — Encode URLs Online",
    description:
      "Free URL encoder and decoder. Encode or decode URL strings and query components online in your browser. No signup required.",
    searchTerms: ["url encoder", "url decoder", "encode url", "decode url", "percent encode", "urlencode", "query string encoder"],
    intro:
      "Encode and decode URLs and query components online. Use full-URL mode for encodeURI-style escaping, or component mode (encodeURIComponent) for query values that include &, =, and spaces. Paste a messy URL, decode percent-encoding, or encode a string for a query parameter — locally, with no server round-trip.",
    faqs: [
      faq("When should I use component mode?", "Use component mode for query parameter values. It percent-encodes reserved characters like &, =, and ? that would break a query string."),
      faq("Why did decode fail?", "Malformed percent-encoding (for example a lone % or truncated hex) cannot be decoded. Fix the sequence or encode the string first."),
    ],
  },
  "html-entity-encoder-decoder": {
    title: "HTML Entity Encoder Decoder — Free Online",
    description:
      "Encode and decode HTML entities online. Escape <, >, & and unescape entities back to text. Free, private, in-browser tool.",
    searchTerms: ["html entity encoder", "html escape", "html unescape", "encode html entities", "html entity decoder", "escape html"],
    intro:
      "Escape HTML special characters to entities and decode entities back to plain text. Convert <, >, &, and quotes so snippets are safe to show in markup, or unescape stored entities for editing. This HTML escape/unescape tool runs locally and covers common named and numeric entities.",
    faqs: [
      faq("What does HTML escaping do?", "It turns characters like < into &lt; so browsers display them as text instead of treating them as tags."),
      faq("Does this prevent XSS?", "Escaping output is one defense. Always sanitize untrusted HTML before rendering; this tool is not a full sanitizer."),
    ],
  },
  "url-parser": {
    title: "URL Parser — Parse URLs Online",
    description:
      "Parse any URL into protocol, host, path, query parameters, and hash. Free online URL parser that runs in your browser.",
    searchTerms: ["url parser", "parse url", "url parts", "query string parser", "split url", "decompose url"],
    intro:
      "Break a URL into protocol, host, port, pathname, query parameters, and hash. Paste a full URL including https:// and inspect each part, including decoded query keys. Passwords in userinfo are masked in the output. Use it to debug redirects, UTM parameters, and API endpoints without a command line.",
    faqs: [
      faq("Why must the URL include a protocol?", "The browser URL parser requires a scheme such as https://. Add one if you only have a host and path."),
      faq("Are passwords visible?", "Userinfo passwords are masked in the parsed output so they are harder to leak on screen."),
    ],
  },
  "uuid-generator": {
    title: "UUID Generator — Free UUID v4 Online",
    description:
      "Generate random UUID v4 identifiers online. Free UUID generator — create one or many UUIDs in your browser, copy or download as CSV.",
    searchTerms: ["uuid generator", "guid generator", "uuid v4", "generate uuid", "random uuid", "online uuid"],
    intro:
      "Generate UUID v4 (random) identifiers locally with the Web Crypto API. Create a single UUID or a batch (up to 100), then copy or export as text/CSV. This GUID generator is for unique keys in databases, filenames, and request IDs — not for sequential or time-based UUID v1 values.",
    faqs: [
      faq("What UUID version is generated?", "UUID version 4 (random). Each ID is generated with crypto.randomUUID()."),
      faq("Is a UUID the same as a GUID?", "Yes in practice. GUID is Microsoft’s name for the same 128-bit identifier format."),
      faq("Can UUIDs collide?", "v4 collisions are astronomically unlikely for normal app volumes. Do not use this as a security secret by itself."),
    ],
  },
  "regex-tester": {
    title: "Regex Tester — Test Regular Expressions",
    description:
      "Free online regex tester. Test JavaScript regular expressions against sample text, with flags and capture groups. Runs in your browser.",
    searchTerms: ["regex tester", "regexp tester", "test regex", "regular expression tester", "regex matcher", "javascript regex"],
    intro:
      "Test regular expressions against sample text with live matches and capture groups. Enter a pattern, choose JavaScript flags (g, i, m, s, u, y), and see what matched. This regex tester uses the browser’s RegExp engine — the same semantics as frontend JavaScript — and never sends your pattern or corpus to a server.",
    faqs: [
      faq("Which regex flavor is this?", "JavaScript RegExp. Patterns valid in PCRE or Python may differ (lookbehind, POSIX classes, etc.)."),
      faq("Why is my regex slow?", "Catastrophic backtracking on large input can freeze the tab. Simplify the pattern or shorten the test text."),
    ],
  },
  "regex-escape-unescape": {
    title: "Regex Escape — Escape Regex Special Characters",
    description:
      "Escape regex metacharacters for literal matching, or unescape simple sequences. Free online regex escape tool in your browser.",
    searchTerms: ["regex escape", "escape regex", "regex escape characters", "literal regex", "escape special characters regex"],
    intro:
      "Escape regex metacharacters so a string is matched literally — dots, parentheses, brackets, and dollar signs become \\. \\( \\[ \\$. Unescape simple backslash sequences when you need the raw text back. Use this before embedding user input inside a larger pattern.",
    faqs: [
      faq("Why do I need to escape regex characters?", "Characters like . * + ? ( ) [ ] { } ^ $ | \\ have special meaning. Escaping them matches the character itself."),
      faq("Is unescape always safe?", "Only simple backslash sequences are unescaped. Ambiguous or invalid sequences are left alone or rejected."),
    ],
  },
  "timestamp-converter": {
    title: "Unix Timestamp Converter — Epoch to Date",
    description:
      "Convert Unix timestamps to dates and back. Free epoch converter for seconds or milliseconds, ISO 8601, and local time. Runs in your browser.",
    searchTerms: ["unix timestamp converter", "epoch converter", "timestamp to date", "epoch to datetime", "unix time converter", "ms timestamp"],
    intro:
      "Convert Unix epoch timestamps to human-readable dates and the reverse. Toggle seconds vs milliseconds, paste an epoch or a date string, and get ISO 8601 UTC plus local time. Use Now to capture the current epoch. Conversion is local, so log timestamps never leave your machine.",
    faqs: [
      faq("Is my timestamp in seconds or milliseconds?", "Seconds are 10 digits (e.g. 1704067200); milliseconds are 13 digits. Use the unit toggle if the date looks wrong by ~50 years."),
      faq("What is Unix epoch time?", "The number of seconds (or milliseconds) since 1970-01-01T00:00:00Z."),
    ],
  },
  "date-time-converter": {
    title: "Date Time Converter — ISO, UTC, Unix",
    description:
      "Convert dates between ISO 8601, UTC, local time, and Unix timestamps. Free online date and time converter in your browser.",
    searchTerms: ["date converter", "iso 8601 converter", "utc to local time", "datetime converter", "convert date format"],
    intro:
      "Convert a date/time string into ISO 8601, UTC, local time, and Unix seconds/milliseconds in one view. ISO 8601 input is the most reliable across browsers. Use this when an API uses UTC, your logs use local time, and you need both plus epoch. Parsing of ambiguous locales can vary by browser.",
    faqs: [
      faq("What date format should I paste?", "ISO 8601 (2024-06-15T14:30:00Z) is the most consistent. Natural language dates may parse differently by locale."),
      faq("Does this change timezones on a server?", "No. It uses your browser’s timezone for local formatting. Nothing is sent to a server."),
    ],
  },
  "http-status-codes": {
    title: "HTTP Status Codes — Complete Reference",
    description:
      "HTTP status code reference with meanings and typical use cases. Search 1xx–5xx codes like 404, 401, and 500. Free, fast, offline-friendly.",
    searchTerms: ["http status codes", "http status code list", "404 meaning", "http response codes", "status code reference", "what is http 503"],
    intro:
      "Look up HTTP status codes with short meanings and when to use them. Search 404, 401, 403, 500, 502, 503, and the rest of the 1xx–5xx ranges. This is a developer reference, not an RFC reprint — common standard codes are listed so you can pick the right response while debugging APIs and web apps.",
    faqs: [
      faq("What does HTTP 404 mean?", "Not Found — the server cannot find the requested resource. Typical for unknown routes or deleted records."),
      faq("Are unofficial status codes included?", "The list focuses on commonly used standard codes, not every historical or vendor-specific code."),
    ],
  },
  "color-converter": {
    title: "Color Converter — HEX, RGB, HSL Online",
    description:
      "Convert colors between HEX, RGB, RGBA, HSL, and HSLA with a live preview. Free online color converter. No signup.",
    searchTerms: ["color converter", "hex to rgb", "rgb to hex", "hex to hsl", "color picker converter", "rgba to hex"],
    intro:
      "Convert colors between HEX, RGB, RGBA, HSL, and HSLA with a live swatch. Paste #3b82f6, rgb(59, 130, 246), or hsl() and copy every format. 8-digit HEX and alpha channels are supported. Named CSS colors like “red” are not — use HEX or RGB instead.",
    faqs: [
      faq("Does it convert HEX to RGB and HSL?", "Yes. One conversion prints RGB/RGBA and HSL/HSLA together so you can copy the format you need."),
      faq("Is alpha supported?", "Yes. 8-digit HEX, RGBA, and HSLA round-trip through the converter."),
    ],
  },
  "css-formatter": {
    title: "CSS Formatter — Beautify & Minify CSS",
    description:
      "Free CSS formatter and minifier. Beautify CSS for readability or minify by stripping whitespace and comments. Runs in your browser.",
    searchTerms: ["css formatter", "css beautifier", "minify css", "format css online", "css minifier", "pretty print css"],
    intro:
      "Beautify CSS for readable indentation or minify it for production by removing whitespace and comments. This lightweight CSS formatter is for quick edits in the browser, not a full CSS parser or PostCSS pipeline. Paste styles, choose Format or Minify, and copy the result locally.",
    faqs: [
      faq("Will minify break my CSS?", "It removes comments and unnecessary whitespace. Valid CSS is preserved; extremely unusual hacks may need a dedicated minifier."),
      faq("Is this Prettier for CSS?", "No. For teams, use Prettier or stylelint. This tool is for fast, private formatting in the browser."),
    ],
  },
  "html-formatter": {
    title: "HTML Formatter — Beautify & Minify HTML",
    description:
      "Free HTML formatter and minifier. Beautify HTML with indentation or minify markup in your browser. No upload, no signup.",
    searchTerms: ["html formatter", "html beautifier", "minify html", "format html online", "pretty print html", "html minifier"],
    intro:
      "Format HTML with indentation or minify markup while keeping text content. Paste a fragment or a full page, then beautify for reading or minify for a smaller payload. Malformed HTML may format imperfectly because this is a lightweight in-browser formatter, not a full HTML5 parser.",
    faqs: [
      faq("Does the HTML formatter validate HTML5?", "It formats and minifies. For validation, use the W3C validator or browser DevTools."),
      faq("Can I format a full HTML document?", "Yes. Paste the document including doctype and html/body tags."),
    ],
  },
  "javascript-formatter": {
    title: "JavaScript Formatter — Beautify JS Online",
    description:
      "Free lightweight JavaScript formatter and minifier. Beautify or compact JS in your browser. Not a full compiler — for quick edits.",
    searchTerms: ["javascript formatter", "js beautifier", "format javascript online", "minify javascript", "js formatter", "pretty print js"],
    intro:
      "Beautify or minify JavaScript in the browser for quick edits. This is a lightweight formatter, not Prettier, ESLint, or a bundler — complex syntax and JSX may not format perfectly. Use it to make a snippet readable or strip extra whitespace before pasting into a ticket. For production code, use Prettier.",
    faqs: [
      faq("Should I use this instead of Prettier?", "No. Use Prettier in your project. This tool is for private, in-browser formatting of small snippets."),
      faq("Does it support TypeScript or JSX?", "Support is limited. TypeScript/JSX may fail or format poorly compared with a real parser."),
    ],
  },
  "sql-formatter": {
    title: "SQL Formatter — Beautify SQL Online",
    description:
      "Free SQL formatter to make queries readable. Indent SELECT, INSERT, UPDATE, and DELETE locally in your browser. SQL is never executed.",
    searchTerms: ["sql formatter", "sql beautifier", "format sql online", "pretty print sql", "sql indent", "format mysql query"],
    intro:
      "Make SQL readable with indentation and keyword spacing. Paste a SELECT/INSERT/UPDATE/DELETE and format it for code review or debugging. Queries are never executed — there is no database connection. Dialect coverage is common SQL, not every vendor extension.",
    faqs: [
      faq("Does this run my SQL?", "Never. It only reformats text. There is no database and no network query."),
      faq("Which SQL dialects work?", "Common SELECT/INSERT/UPDATE/DELETE. Vendor-specific syntax may format imperfectly."),
    ],
  },
  "markdown-previewer": {
    title: "Markdown Previewer — Live Markdown Preview",
    description:
      "Write Markdown and preview rendered HTML live. Free online Markdown previewer with sanitization. No upload, no signup.",
    searchTerms: ["markdown previewer", "markdown preview", "md preview", "live markdown editor", "markdown to html preview"],
    intro:
      "Write Markdown on the left and see a live HTML preview on the right. Fenced code is syntax-highlighted, and GitHub-flavored tables, strikethrough, and task lists are rendered. HTML is sanitized with DOMPurify. Copy the Markdown source when you are done — nothing is stored on a server.",
    faqs: [
      faq("Is the Markdown preview safe from XSS?", "Rendered HTML is sanitized with DOMPurify. Treat preview as convenience, not a security boundary for untrusted plugins."),
      faq("Does it highlight code blocks?", "Yes. Fenced blocks with a language tag (js, json, ts, python, bash, and other common languages) are syntax-highlighted in the preview."),
    ],
  },
  "markdown-reader": {
    title: "Markdown Reader — Open .md Files Online",
    description:
      "Open and preview Markdown files in your browser. Drag and drop .md files for a live preview. Files stay on your device — never uploaded.",
    searchTerms: ["markdown reader", "md file reader", "open markdown file", "markdown file viewer", "readme previewer"],
    intro:
      "Open local .md, .markdown, or .txt files and preview them as HTML with syntax-highlighted code blocks, tables, and task lists. Drag and drop a README, switch Split/Preview/Source, and keep the file on your machine — FileReader never uploads it. Max size is 2 MB. Use the Markdown Previewer if you would rather type than open a file.",
    faqs: [
      faq("Are my Markdown files uploaded?", "No. The browser FileReader API reads the file locally. Nothing is sent to a server."),
      faq("Which extensions work?", ".md, .markdown, and .txt, up to 2 MB."),
    ],
  },
  "code-compare": {
    title: "Code Compare — Diff Two Files Online",
    description:
      "Compare two code snippets side-by-side or as a unified diff. Free online code diff tool. Highlights added and removed lines in your browser.",
    searchTerms: ["code compare", "diff checker", "code diff", "compare two files", "text compare", "side by side diff"],
    intro:
      "Diff two code blocks side-by-side or as a unified patch. Paste original and modified text to highlight added, removed, and unchanged lines. Ignore whitespace when indentation noise hides the real change. This is a line-based online diff checker — it does not detect moved blocks or intra-line character highlights.",
    faqs: [
      faq("Is this like Git diff?", "It produces a unified-style view of added and removed lines. It is not a Git client and will not compare commits."),
      faq("Can I compare files from disk?", "Paste file contents into the two panels. Direct binary file compare is not supported."),
    ],
  },
  "csv-json": {
    title: "CSV to JSON Converter — Free Online",
    description:
      "Convert CSV to JSON and JSON to CSV online. Choose the delimiter, then copy or download. Free bidirectional converter in your browser.",
    searchTerms: ["csv to json", "json to csv converter", "convert csv to json", "csv json converter", "csv to json array"],
    intro:
      "Convert CSV to a JSON array of objects, or JSON arrays back to CSV. Set the delimiter (comma, semicolon, tab) to match Excel exports. Rows become objects keyed by the header line. Keep customer lists and dumps local — conversion never leaves the browser.",
    faqs: [
      faq("Does the first row become JSON keys?", "Yes. The header row is used as object keys for each subsequent row."),
      faq("Can I use a semicolon or tab delimiter?", "Yes. Change the delimiter field to match your file (comma, semicolon, tab, or custom)."),
    ],
  },
  "yaml-validator": {
    title: "YAML Validator — Validate YAML Online",
    description:
      "Validate YAML syntax online and optionally format it. Free YAML linter in your browser with clear parse errors. No upload, no signup.",
    searchTerms: ["yaml validator", "yaml linter", "validate yaml", "yaml checker", "format yaml", "yml validator"],
    intro:
      "Validate YAML syntax and optionally format it. Paste a manifest or config, click Validate, and fix parse errors before they hit CI. This YAML checker runs locally with js-yaml. Complex anchors and custom tags may have limited round-trip support when formatting.",
    faqs: [
      faq("Is this a YAML linter or just a parser?", "It checks that the document parses. It does not enforce a Kubernetes or GitHub Actions schema."),
      faq("How do I convert YAML to JSON?", "Use the JSON ↔ YAML converter for bidirectional conversion."),
    ],
  },
  "xml-formatter": {
    title: "XML Formatter & Validator — Free Online",
    description:
      "Format XML with indentation and validate well-formedness. Free online XML formatter and validator in your browser. No uploads.",
    searchTerms: ["xml formatter", "xml beautifier", "xml validator", "format xml online", "pretty print xml", "validate xml"],
    intro:
      "Pretty-print XML with indentation and check that the document is well-formed. Paste SOAP, RSS, or config XML, then Format or Validate using the browser’s DOMParser. Very large documents may be slow. This checks well-formedness, not an XSD schema.",
    faqs: [
      faq("Does this validate against an XSD?", "No. It checks well-formed XML (tags match, markup parses). Schema validation is not included."),
      faq("Are XML namespaces supported?", "Basic XML with namespaces usually formats. Exotic namespace edge cases can vary by browser parser."),
    ],
  },
  "hash-generator": {
    title: "Hash Generator — SHA-256, SHA-512 Online",
    description:
      "Generate SHA-256, SHA-384, and SHA-512 hashes in your browser with Web Crypto. Free online hash generator — no upload, one-way only.",
    searchTerms: ["hash generator", "sha256 generator", "sha-256 hash", "online hash", "sha512 generator", "checksum generator"],
    intro:
      "Generate SHA-256, SHA-384, or SHA-512 hex digests with the Web Crypto API. Hashing is one-way — you cannot reverse a digest. Use this for checksums and content integrity, not for storing passwords (use bcrypt/argon2). Requires a secure context (HTTPS or localhost). Input never leaves your device.",
    faqs: [
      faq("Can I reverse a SHA-256 hash?", "No. Cryptographic hashes are one-way. This tool will not crack or look up hashes."),
      faq("Should I hash passwords here?", "No. Use a password hashing algorithm such as Argon2 or bcrypt with a unique salt in your application."),
    ],
  },
  "hmac-generator": {
    title: "HMAC Generator — HMAC SHA-256 Online",
    description:
      "Generate HMAC signatures in your browser. Free HMAC SHA-256 generator — secret stays client-side. No server, no signup.",
    searchTerms: ["hmac generator", "hmac sha256", "hmac signature", "hmac online", "message authentication code"],
    intro:
      "Generate HMAC signatures locally with Web Crypto. Enter a message and secret, choose the algorithm, and copy the hex digest. The secret exists only in memory during generation — it is not stored. Never paste production API secrets on a shared computer.",
    faqs: [
      faq("Where is my HMAC secret stored?", "Nowhere. It lives in memory only while you generate the signature."),
      faq("What is HMAC used for?", "Message authentication — proving a payload was signed with a shared secret (for example webhook signatures)."),
    ],
  },
  "curl-to-fetch": {
    title: "cURL to Fetch Converter — Free Online",
    description:
      "Convert cURL commands to JavaScript fetch() snippets. Free cURL to fetch converter for headers, method, and body. Runs in your browser.",
    searchTerms: ["curl to fetch", "curl to javascript", "convert curl to fetch", "curl converter", "fetch from curl"],
    intro:
      "Convert a cURL command into a JavaScript fetch() snippet. Supported pieces include URL, HTTP method (-X), headers (-H), and data body (-d). Unsupported flags are left as comments so you can finish by hand. Paste from browser DevTools “Copy as cURL” and get fetch code without sending the command to a server.",
    faqs: [
      faq("Which cURL flags are supported?", "URL, -X method, -H headers, and -d body. Other flags appear as comments in the output."),
      faq("Does it run the HTTP request?", "No. It only generates JavaScript. You run fetch in your own app or console."),
    ],
  },
  "curl-to-axios": {
    title: "cURL to Axios Converter — Free Online",
    description:
      "Convert cURL commands to Axios JavaScript or TypeScript. Free cURL to Axios converter in your browser. No signup, no uploads.",
    searchTerms: ["curl to axios", "convert curl to axios", "curl axios converter", "axios from curl"],
    intro:
      "Turn cURL into an Axios call you can paste into a JS or TS project. Flag support matches the cURL to Fetch converter: URL, method, headers, and body. Axios must be installed in your project. Conversion is local.",
    faqs: [
      faq("Does the snippet work in TypeScript?", "Yes, if axios is installed. Types come from the axios package, not from this tool."),
      faq("Need fetch instead of Axios?", "Use the cURL to Fetch converter on this site."),
    ],
  },
  "qr-code-generator": {
    title: "QR Code Generator — Free Online QR Maker",
    description:
      "Generate QR codes for text and URLs in your browser. Free online QR code generator — download PNG. No signup, no tracking.",
    searchTerms: ["qr code generator", "qr generator", "create qr code", "free qr code", "url to qr", "qr maker"],
    intro:
      "Create a QR code from text or a URL entirely in the browser, then download a PNG. Large payloads make dense codes that are harder to scan. The generator library loads on demand. Nothing is uploaded or tracked — useful for Wi-Fi strings, links, and local testing.",
    faqs: [
      faq("Can I download the QR code?", "Yes. Generate the code and download a PNG."),
      faq("Is there a character limit?", "Very long strings produce dense QR codes that may fail to scan on phones. Keep payloads short."),
    ],
  },
};
