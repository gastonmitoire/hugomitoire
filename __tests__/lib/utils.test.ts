import { describe, it, expect } from "vitest";
import { cn, cleanFragmentHtml } from "@/lib/utils";

describe("cn", () => {
  it("combina clases", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("resuelve conflictos de tailwind", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("ignora falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});

describe("cleanFragmentHtml", () => {
  it("elimina font-family inline", () => {
    const input = `<p style="font-family: 'Georgia', serif;">texto</p>`;
    expect(cleanFragmentHtml(input)).not.toContain("font-family");
  });

  it("elimina color inline", () => {
    const input = `<p style="color: #333333;">texto</p>`;
    expect(cleanFragmentHtml(input)).not.toContain("color:");
  });

  it("elimina background-color inline", () => {
    const input = `<p style="background-color: white;">texto</p>`;
    expect(cleanFragmentHtml(input)).not.toContain("background-color");
  });

  it("preserva el contenido de texto", () => {
    const input = `<p style="color: red;">hola mundo</p>`;
    expect(cleanFragmentHtml(input)).toContain("hola mundo");
  });
});
