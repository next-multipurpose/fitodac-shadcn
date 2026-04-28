import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
	it("merges duplicate tailwind utilities predictably", () => {
		expect(cn("px-3 py-2", "px-6", "text-sm")).toBe("py-2 px-6 text-sm");
	});
});
