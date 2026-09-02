export type HttpStatusCode = {
  code: number;
  name: string;
  category: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
  description: string;
  use: string;
};

export const HTTP_STATUS_CODES: HttpStatusCode[] = [
  { code: 100, name: "Continue", category: "1xx", description: "The server has received the request headers.", use: "Large uploads where the client waits for a go-ahead before sending the body." },
  { code: 101, name: "Switching Protocols", category: "1xx", description: "The server agrees to switch protocols.", use: "WebSocket upgrades and HTTP/2 negotiation." },
  { code: 102, name: "Processing", category: "1xx", description: "The server has received and is processing the request.", use: "Long-running WebDAV operations." },
  { code: 200, name: "OK", category: "2xx", description: "The request succeeded.", use: "Standard successful GET, PUT, or PATCH responses." },
  { code: 201, name: "Created", category: "2xx", description: "A new resource was created.", use: "POST requests that create records." },
  { code: 202, name: "Accepted", category: "2xx", description: "The request was accepted but processing is not complete.", use: "Async jobs queued for background processing." },
  { code: 204, name: "No Content", category: "2xx", description: "Success with no response body.", use: "DELETE or PUT where no payload is needed." },
  { code: 301, name: "Moved Permanently", category: "3xx", description: "The resource has a new permanent URL.", use: "SEO-friendly permanent redirects." },
  { code: 302, name: "Found", category: "3xx", description: "Temporary redirect to another URL.", use: "Post-login redirects or temporary moves." },
  { code: 304, name: "Not Modified", category: "3xx", description: "Cached version is still valid.", use: "Conditional GET with ETag or Last-Modified." },
  { code: 307, name: "Temporary Redirect", category: "3xx", description: "Temporary redirect preserving the HTTP method.", use: "Form submissions that must stay POST." },
  { code: 308, name: "Permanent Redirect", category: "3xx", description: "Permanent redirect preserving the HTTP method.", use: "Canonical URL changes for non-GET requests." },
  { code: 400, name: "Bad Request", category: "4xx", description: "The server could not understand the request.", use: "Malformed JSON, missing required fields, invalid syntax." },
  { code: 401, name: "Unauthorized", category: "4xx", description: "Authentication is required or failed.", use: "Missing or invalid access tokens." },
  { code: 403, name: "Forbidden", category: "4xx", description: "Authenticated but not allowed to access the resource.", use: "Role-based access control denials." },
  { code: 404, name: "Not Found", category: "4xx", description: "The resource does not exist.", use: "Unknown routes or deleted records." },
  { code: 405, name: "Method Not Allowed", category: "4xx", description: "The HTTP method is not supported for this endpoint.", use: "POST sent to a read-only GET route." },
  { code: 408, name: "Request Timeout", category: "4xx", description: "The server timed out waiting for the request.", use: "Slow clients or stalled uploads." },
  { code: 409, name: "Conflict", category: "4xx", description: "The request conflicts with the current state.", use: "Duplicate email registration or version conflicts." },
  { code: 413, name: "Payload Too Large", category: "4xx", description: "The request body exceeds the allowed size.", use: "File upload limits." },
  { code: 415, name: "Unsupported Media Type", category: "4xx", description: "The Content-Type is not supported.", use: "Sending XML to a JSON-only API." },
  { code: 422, name: "Unprocessable Entity", category: "4xx", description: "Validation failed on well-formed input.", use: "Schema validation errors in REST APIs." },
  { code: 429, name: "Too Many Requests", category: "4xx", description: "Rate limit exceeded.", use: "API throttling and abuse prevention." },
  { code: 500, name: "Internal Server Error", category: "5xx", description: "An unexpected error occurred on the server.", use: "Unhandled exceptions in backend code." },
  { code: 502, name: "Bad Gateway", category: "5xx", description: "Invalid response from an upstream server.", use: "Reverse proxy or gateway failures." },
  { code: 503, name: "Service Unavailable", category: "5xx", description: "The server is temporarily unavailable.", use: "Maintenance windows or overload." },
  { code: 504, name: "Gateway Timeout", category: "5xx", description: "Upstream server did not respond in time.", use: "Slow downstream microservices." },
];
