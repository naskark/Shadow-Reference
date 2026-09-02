import { failure, success, type ToolResult } from "@/lib/utils";

export function unixToDatetime(input: string, unit: "s" | "ms"): ToolResult {
  const num = Number(input.trim());
  if (Number.isNaN(num)) return failure("Enter a valid numeric timestamp.");

  const ms = unit === "s" ? num * 1000 : num;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return failure("Timestamp is out of valid range.");

  return success(
    [
      `Unix (${unit}): ${num}`,
      `ISO 8601 (UTC): ${date.toISOString()}`,
      `Local: ${date.toString()}`,
      `UTC: ${date.toUTCString()}`,
    ].join("\n")
  );
}

export function datetimeToUnix(input: string, unit: "s" | "ms"): ToolResult {
  const date = new Date(input.trim());
  if (Number.isNaN(date.getTime())) return failure("Enter a valid date/time string (ISO 8601 recommended).");

  const ms = date.getTime();
  const value = unit === "s" ? Math.floor(ms / 1000) : ms;
  return success(String(value));
}

export function currentTimestamp(unit: "s" | "ms"): ToolResult {
  const ms = Date.now();
  return success(String(unit === "s" ? Math.floor(ms / 1000) : ms));
}

export function convertDatetime(input: string, format: "iso" | "utc" | "local" | "readable"): ToolResult {
  const date = new Date(input.trim());
  if (Number.isNaN(date.getTime())) return failure("Enter a valid date/time string.");

  switch (format) {
    case "iso":
      return success(date.toISOString());
    case "utc":
      return success(date.toUTCString());
    case "local":
      return success(date.toString());
    case "readable":
      return success(
        date.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    default:
      return failure("Unknown format");
  }
}

export function allDatetimeFormats(input: string): ToolResult {
  const date = new Date(input.trim());
  if (Number.isNaN(date.getTime())) return failure("Enter a valid date/time string.");

  return success(
    [
      `ISO 8601: ${date.toISOString()}`,
      `UTC: ${date.toUTCString()}`,
      `Local: ${date.toString()}`,
      `Unix (s): ${Math.floor(date.getTime() / 1000)}`,
      `Unix (ms): ${date.getTime()}`,
      `Timezone offset: UTC${date.getTimezoneOffset() <= 0 ? "+" : "-"}${Math.abs(date.getTimezoneOffset() / 60)}h`,
    ].join("\n")
  );
}
