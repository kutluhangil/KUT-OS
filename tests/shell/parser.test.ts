import { describe, it, expect } from "vitest";
import { parseCommand } from "@/lib/shell/parser";

describe("parseCommand", () => {
  it("parses a simple command", () => {
    const r = parseCommand("help");
    expect(r.cmd).toBe("help");
    expect(r.args).toEqual([]);
    expect(r.flags).toEqual({});
  });

  it("parses command with args", () => {
    const r = parseCommand("echo hello world");
    expect(r.cmd).toBe("echo");
    expect(r.args).toEqual(["hello", "world"]);
  });

  it("parses double-quoted strings as single arg", () => {
    const r = parseCommand('echo "hello world"');
    expect(r.args).toEqual(["hello world"]);
  });

  it("parses single-quoted strings as single arg", () => {
    const r = parseCommand("echo 'hello world'");
    expect(r.args).toEqual(["hello world"]);
  });

  it("parses long flags", () => {
    const r = parseCommand("ls --all --sort=name");
    expect(r.flags["all"]).toBe(true);
    expect(r.flags["sort"]).toBe("name");
  });

  it("parses short flags", () => {
    const r = parseCommand("ls -la");
    expect(r.flags["l"]).toBe(true);
    expect(r.flags["a"]).toBe(true);
  });

  it("handles empty input", () => {
    const r = parseCommand("");
    expect(r.cmd).toBe("");
  });

  it("lowercases command name", () => {
    const r = parseCommand("ECHO hello");
    expect(r.cmd).toBe("echo");
  });

  it("parses mixed args and flags", () => {
    const r = parseCommand("projects --type=saas 2025");
    expect(r.args).toEqual(["2025"]);
    expect(r.flags["type"]).toBe("saas");
  });

  it("does not treat negative numbers as flags", () => {
    const r = parseCommand("seek -5");
    expect(r.args).toEqual(["-5"]);
  });
});
