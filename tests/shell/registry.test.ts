import { describe, it, expect, beforeEach } from "vitest";
import { CommandRegistry } from "@/lib/shell/registry";
import type { Command } from "@/lib/shell/types";

// We test a fresh registry instance per test
let registry: CommandRegistry;

function makeCmd(name: string, category: Command["category"] = "core"): Command {
  return {
    name,
    description: `${name} command`,
    category,
    handler: () => ({ type: "noop" }),
  };
}

describe("CommandRegistry", () => {
  beforeEach(() => {
    registry = new CommandRegistry();
  });

  it("registers and retrieves a command", () => {
    registry.register(makeCmd("help"));
    expect(registry.get("help")).toBeDefined();
  });

  it("resolves aliases", () => {
    const cmd = { ...makeCmd("help"), aliases: ["h", "?"] };
    registry.register(cmd);
    expect(registry.get("h")).toBeDefined();
    expect(registry.get("?")).toBeDefined();
  });

  it("returns undefined for unknown command", () => {
    expect(registry.get("unknown")).toBeUndefined();
  });

  it("getAll excludes hidden commands", () => {
    registry.register(makeCmd("visible"));
    registry.register({ ...makeCmd("hidden"), hidden: true });
    const all = registry.getAll(false);
    expect(all.map((c) => c.name)).toContain("visible");
    expect(all.map((c) => c.name)).not.toContain("hidden");
  });

  it("getByCategory filters correctly", () => {
    registry.register(makeCmd("about", "portfolio"));
    registry.register(makeCmd("help", "core"));
    expect(registry.getByCategory("portfolio").map((c) => c.name)).toContain("about");
    expect(registry.getByCategory("portfolio").map((c) => c.name)).not.toContain("help");
  });

  it("suggest returns closest match", () => {
    registry.register(makeCmd("projects"));
    registry.register(makeCmd("about"));
    const suggestions = registry.suggest("projet");
    expect(suggestions[0]).toBe("projects");
  });
});
