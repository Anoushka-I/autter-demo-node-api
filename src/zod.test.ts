import { describe, expect, test } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

describe("zod security patch (GHSA-mrhx-c7xc-m3w5)", () => {
  test("uses a patched zod release (>= 4.6.6)", () => {
    // GHSA-mrhx-c7xc-m3w5: Zod can exhaust memory while validating oversized
    // constrained collections. Fixed in zod 4.6.6.
    const { version } = require("zod/package.json") as { version: string };
    const [major, minor, patch] = version.split(".").map((part) => Number(part));
    const encoded = major * 10_000 + minor * 100 + patch;
    expect(encoded).toBeGreaterThanOrEqual(4 * 10_000 + 6 * 100 + 6);
  });
});
