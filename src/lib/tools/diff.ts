export type DiffLineType = "equal" | "add" | "remove";

export type DiffLine = {
  type: DiffLineType;
  content: string;
  oldLineNum?: number;
  newLineNum?: number;
};

export type DiffStats = {
  added: number;
  removed: number;
  unchanged: number;
};

export type DiffResult = {
  lines: DiffLine[];
  stats: DiffStats;
};

function computeLcsMatrix(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

export function compareLines(original: string, modified: string): DiffResult {
  const oldLines = original.split(/\r?\n/);
  const newLines = modified.split(/\r?\n/);
  const dp = computeLcsMatrix(oldLines, newLines);

  const ops: Array<{ type: DiffLineType; oldIdx?: number; newIdx?: number }> = [];
  let i = oldLines.length;
  let j = newLines.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      ops.push({ type: "equal", oldIdx: i - 1, newIdx: j - 1 });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: "add", newIdx: j - 1 });
      j--;
    } else {
      ops.push({ type: "remove", oldIdx: i - 1 });
      i--;
    }
  }

  ops.reverse();

  const lines: DiffLine[] = [];
  const stats: DiffStats = { added: 0, removed: 0, unchanged: 0 };

  for (const op of ops) {
    if (op.type === "equal") {
      lines.push({
        type: "equal",
        content: oldLines[op.oldIdx!],
        oldLineNum: op.oldIdx! + 1,
        newLineNum: op.newIdx! + 1,
      });
      stats.unchanged++;
    } else if (op.type === "remove") {
      lines.push({
        type: "remove",
        content: oldLines[op.oldIdx!],
        oldLineNum: op.oldIdx! + 1,
      });
      stats.removed++;
    } else {
      lines.push({
        type: "add",
        content: newLines[op.newIdx!],
        newLineNum: op.newIdx! + 1,
      });
      stats.added++;
    }
  }

  return { lines, stats };
}

export function formatUnifiedDiff(result: DiffResult): string {
  return result.lines
    .map((line) => {
      if (line.type === "add") return `+ ${line.content}`;
      if (line.type === "remove") return `- ${line.content}`;
      return `  ${line.content}`;
    })
    .join("\n");
}

export const SAMPLE_ORIGINAL = `function greet(name) {
  return "Hello, " + name;
}

console.log(greet("World"));`;

export const SAMPLE_MODIFIED = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("ShadowReference"));`;
