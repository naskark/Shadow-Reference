export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

export type ToolUploadConfig = {
  accept: string;
  extensions: string[];
  target?: "input" | "input2";
  label?: string;
};

export const TOOL_UPLOADS: Record<string, ToolUploadConfig> = {
  "json-formatter": { accept: ".json,application/json", extensions: [".json"] },
  "json-validator": { accept: ".json,application/json", extensions: [".json"] },
  "json-minifier": { accept: ".json,application/json", extensions: [".json"] },
  "json-to-typescript": { accept: ".json,application/json", extensions: [".json"] },
  "json-to-csv": { accept: ".json,application/json", extensions: [".json"] },
  "json-yaml": {
    accept: ".json,.yaml,.yml,application/json,text/yaml",
    extensions: [".json", ".yaml", ".yml"],
  },
  "csv-json": {
    accept: ".csv,.json,text/csv,application/json",
    extensions: [".csv", ".json"],
  },
  "yaml-validator": { accept: ".yaml,.yml,text/yaml", extensions: [".yaml", ".yml"] },
  "xml-formatter": { accept: ".xml,application/xml,text/xml", extensions: [".xml"] },
  "css-formatter": { accept: ".css,text/css", extensions: [".css"] },
  "html-formatter": { accept: ".html,.htm,text/html", extensions: [".html", ".htm"] },
  "javascript-formatter": {
    accept: ".js,.mjs,.cjs,.ts,.jsx,.tsx,text/javascript",
    extensions: [".js", ".mjs", ".cjs", ".ts", ".jsx", ".tsx"],
  },
  "sql-formatter": { accept: ".sql", extensions: [".sql"] },
  "markdown-previewer": {
    accept: ".md,.markdown,.txt,text/markdown,text/plain",
    extensions: [".md", ".markdown", ".txt"],
  },
  "markdown-reader": {
    accept: ".md,.markdown,.txt,text/markdown,text/plain",
    extensions: [".md", ".markdown", ".txt"],
  },
  "html-entity-encoder-decoder": { accept: ".html,.htm,.txt,text/html,text/plain", extensions: [".html", ".htm", ".txt"] },
  "base64-encoder-decoder": { accept: ".txt,text/plain", extensions: [".txt"] },
  "curl-to-fetch": { accept: ".sh,.txt,.curl,text/plain", extensions: [".sh", ".txt", ".curl"] },
  "curl-to-axios": { accept: ".sh,.txt,.curl,text/plain", extensions: [".sh", ".txt", ".curl"] },
  "regex-tester": {
    accept: ".txt,.log,.md,text/plain",
    extensions: [".txt", ".log", ".md"],
    target: "input2",
    label: "Upload test file",
  },
};

export const CODE_COMPARE_UPLOAD: ToolUploadConfig = {
  accept: ".txt,.md,.json,.js,.ts,.tsx,.jsx,.css,.html,.xml,.yml,.yaml,.sql,.py,.go,.rs,text/plain",
  extensions: [".txt", ".md", ".json", ".js", ".ts", ".tsx", ".jsx", ".css", ".html", ".xml", ".yml", ".yaml", ".sql", ".py", ".go", ".rs"],
};

export function matchesExtension(filename: string, extensions: string[]): boolean {
  const lower = filename.toLowerCase();
  return extensions.some((ext) => lower.endsWith(ext.toLowerCase()));
}

export function extensionList(extensions: string[]): string {
  return extensions.join(", ");
}

export function validateUploadFile(
  file: { name: string; size: number },
  extensions: string[],
  maxBytes = MAX_UPLOAD_BYTES,
): string | null {
  if (!matchesExtension(file.name, extensions)) {
    return `Please upload a ${extensionList(extensions)} file.`;
  }
  if (file.size > maxBytes) {
    return "File is too large. Maximum size is 2 MB. Files are read locally in your browser.";
  }
  return null;
}

export function readTextFile(
  file: File,
  extensions: string[],
  maxBytes = MAX_UPLOAD_BYTES,
): Promise<{ name: string; text: string }> {
  const error = validateUploadFile(file, extensions, maxBytes);
  if (error) return Promise.reject(new Error(error));

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, text: String(reader.result ?? "") });
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsText(file);
  });
}
