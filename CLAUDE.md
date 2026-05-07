# hugomitoire-v2

Sitio web oficial de Hugo Mitoire, escritor argentino. Rediseño completo con foco en diseño editorial dark.

## Stack

- **Next.js 16** (App Router), React 19, TypeScript estricto
- **Tailwind CSS v4** — sin config file, tokens en `@theme` dentro de `globals.css`
- **Framer Motion** — animaciones; ease estándar `[0.16, 1, 0.3, 1] as const`, springs en hover
- **Radix UI** — Dialog, ScrollArea, Tabs
- **Lucide React** — íconos (v1+, sin Instagram/Facebook — usar SVG inline)
- **pnpm** — gestor de paquetes

## Estructura

```
app/
  page.tsx              — Home (BookHero + BooksGrid + SeriesShowcase + teaser autor)
  libros/page.tsx       — Catálogo con filtros
  libros/[slug]/page.tsx — Detalle de libro
  autor/                — (pendiente)
  contacto/             — (pendiente)
components/
  books/                — BookCard, BookHero, BookDetailHero, BooksGrid, BooksPageClient, SeriesShowcase
  chapters/             — ChapterList, FragmentReader
  layout/               — Topbar, Footer
  accessibility-context.tsx
data/                   — books.ts, author.ts, genres.ts, series.ts, fragments.ts, types.ts
lib/utils.ts            — cn(), cleanFragmentHtml()
__tests__/              — Vitest tests (corren en pre-commit via husky)
public/assets/images/   — covers/ y bg/ (20 tapas + 20 fondos)
```

## Design tokens (globals.css)

| Token | Valor |
|---|---|
| `base` | `#0a0a0a` |
| `surface` | `#111111` |
| `elevated` | `#161616` |
| `text-primary` | `#f0ede6` |
| `text-secondary` | `#9a8f84` |
| `text-muted` | `#564f49` |
| `accent` | `var(--book-accent, #f5cb5c)` — se setea inline por libro |

**Fuentes:** `font-cinzel` (títulos), `font-body` (DM Sans), `font-bellefair` (citas/literario), `font-atkinson` (accesibilidad)

**Labels:** `text-[10px] uppercase tracking-[0.22em]`

**Contenedor:** `mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12`

## Convenciones

- Páginas server component salvo que necesiten estado/hooks → usar componentes client separados
- Accent color por libro: `style={{ "--book-accent": book.accentColor } as React.CSSProperties}` en el wrapper
- No mezclar CSS transforms con Framer Motion transforms en el mismo elemento
- Arrays de ease como `[0.16, 1, 0.3, 1] as const` para satisfacer el tipo de FM
- Sin comentarios salvo que el por qué sea no obvio

## Testing

```bash
pnpm test          # corre todos los tests (vitest run)
pnpm test:watch    # modo watch
```

Tests en `__tests__/`. Corren automáticamente antes de cada commit (husky pre-commit).

## Commits

Breves y precisos. Sin Co-Authored-By ni metadata extra.
```
feat: descripción corta de lo que hace
fix: qué se corrigió
refactor: qué cambió sin cambiar comportamiento
```
