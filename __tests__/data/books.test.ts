import { describe, it, expect } from "vitest";
import {
  books,
  getBookBySlug,
  getBooksByGenre,
  getBooksBySerie,
  getFeaturedBook,
} from "@/data/books";

describe("books data", () => {
  it("tiene 20 libros", () => {
    expect(books).toHaveLength(20);
  });

  it("todos los libros tienen slug único", () => {
    const slugs = books.map((b) => b.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("todos los libros tienen cover y background definidos", () => {
    books.forEach((b) => {
      expect(b.cover).toBeTruthy();
      expect(b.background).toBeTruthy();
    });
  });

  it("solo hay un libro marcado como featured", () => {
    const featured = books.filter((b) => b.featured);
    expect(featured).toHaveLength(1);
  });
});

describe("getBookBySlug", () => {
  it("retorna el libro correcto", () => {
    const book = getBookBySlug("los-ojos-de-mariel");
    expect(book?.title).toBe("Los Ojos de Mariel");
  });

  it("retorna undefined para slug inexistente", () => {
    expect(getBookBySlug("no-existe")).toBeUndefined();
  });
});

describe("getBooksByGenre", () => {
  it("retorna solo libros del género solicitado", () => {
    const noir = getBooksByGenre("negro");
    expect(noir.every((b) => b.genreSlug === "negro")).toBe(true);
  });

  it("retorna array vacío para género inexistente", () => {
    expect(getBooksByGenre("genero-falso")).toHaveLength(0);
  });
});

describe("getBooksBySerie", () => {
  it("retorna los 9 tomos de la serie de terror en orden", () => {
    const tomos = getBooksBySerie("cuentos-de-terror-para-franco");
    expect(tomos).toHaveLength(9);
    tomos.forEach((b, i) => {
      expect(b.serieOrder).toBe(i + 1);
    });
  });
});

describe("getFeaturedBook", () => {
  it("retorna un libro", () => {
    expect(getFeaturedBook()).toBeDefined();
  });

  it("es el libro marcado como featured", () => {
    const featured = getFeaturedBook();
    expect(featured.featured).toBe(true);
  });
});
