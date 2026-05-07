export interface GenreData {
  slug: string;
  name: string;
  ageRange: string;
}

export interface SerieData {
  slug: string;
  title: string;
  description: string;
  bookSlugs: string[];
}

export interface SectionData {
  subOrder: number;
  title: string;
  fragment?: string;
}

export interface ChapterData {
  title: string;
  order: number;
  fragment?: string;
  sections?: SectionData[];
}

export interface BookData {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: "novela" | "cuento";
  genreSlug: string;
  serieSlug?: string;
  serieOrder?: number;
  publicationDate: string;
  cover: string;
  background: string;
  accentColor: string;
  featured?: boolean;
  chapters: ChapterData[];
}

export interface AuthorData {
  name: string;
  origin: string;
  bio: string[];
  quote: string;
  quoteSource: string;
  stats: { books: number; series: number; yearsWriting: number };
  awards: { title: string; year: string; description: string }[];
  socialLinks: { platform: string; url: string }[];
}
