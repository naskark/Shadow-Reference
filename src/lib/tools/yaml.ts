import * as yaml from "js-yaml";
import { failure, success, type ToolResult } from "@/lib/utils";
import { parseJson } from "@/lib/tools/json";

export function jsonToYaml(input: string): ToolResult {
  const parsed = parseJson(input);
  if (!parsed.ok) return parsed;
  try {
    return success(yaml.dump(parsed.data, { indent: 2, lineWidth: -1 }));
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Failed to convert to YAML");
  }
}

export function yamlToJson(input: string): ToolResult {
  try {
    const data = yaml.load(input);
    return success(JSON.stringify(data, null, 2));
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Invalid YAML");
  }
}

export function validateYaml(input: string): ToolResult {
  try {
    yaml.load(input);
    return success("Valid YAML ✓");
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Invalid YAML");
  }
}

export function formatYaml(input: string): ToolResult {
  try {
    const data = yaml.load(input);
    return success(yaml.dump(data, { indent: 2, lineWidth: -1 }));
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Invalid YAML");
  }
}

export const SAMPLE_YAML = `name: ShadowReference
version: 1
tools:
  - json-formatter
  - jwt-decoder
meta:
  clientSide: true`;
