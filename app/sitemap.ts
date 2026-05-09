import { MetadataRoute } from "next";
import { books } from "@/data/books";

const BASE = "https://hugomitoire.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/libros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/autor`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/escuchar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contacto`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const bookRoutes: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${BASE}/libros/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...bookRoutes];
}
