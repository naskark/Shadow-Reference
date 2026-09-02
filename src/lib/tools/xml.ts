import { failure, success, type ToolResult } from "@/lib/utils";

export function formatXml(input: string): ToolResult {
  const validation = validateXml(input);
  if (!validation.ok) return validation;

  const parser = new DOMParser();
  const doc = parser.parseFromString(input.trim(), "application/xml");
  const formatted = serializeNode(doc.documentElement, 0);
  return success(formatted);
}

function serializeNode(node: Element, indent: number): string {
  const pad = "  ".repeat(indent);
  const children = [...node.childNodes].filter(
    (n) => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
  );

  if (children.length === 0) {
    return `${pad}<${node.tagName}${attrString(node)}/>`;
  }

  const textOnly = children.length === 1 && children[0].nodeType === Node.TEXT_NODE;
  if (textOnly) {
    return `${pad}<${node.tagName}${attrString(node)}>${children[0].textContent?.trim()}</${node.tagName}>`;
  }

  const inner = children
    .map((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) return serializeNode(child as Element, indent + 1);
      return `${"  ".repeat(indent + 1)}${child.textContent?.trim()}`;
    })
    .join("\n");

  return `${pad}<${node.tagName}${attrString(node)}>\n${inner}\n${pad}</${node.tagName}>`;
}

function attrString(node: Element): string {
  return [...node.attributes].map((a) => ` ${a.name}="${a.value}"`).join("");
}

export function validateXml(input: string): ToolResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input.trim(), "application/xml");
  const error = doc.querySelector("parsererror");
  if (error) {
    const text = error.textContent?.replace(/\s+/g, " ").trim() ?? "Malformed XML";
    return failure(text);
  }
  return success("Valid XML ✓");
}

export const SAMPLE_XML = `<?xml version="1.0"?><root><item id="1">Hello</item></root>`;
