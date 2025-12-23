# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog built with HonoX (Hono meta-framework) and deployed to Cloudflare Pages. The blog uses MDX for articles with static site generation (SSG).

**Tech Stack:**
- **Framework:** HonoX (Hono + Vite meta-framework)
- **Runtime:** Bun
- **Styling:** Tailwind CSS v4
- **Content:** MDX with custom components
- **Deployment:** Cloudflare Pages (with Workers, KV, R2, D1 bindings)
- **Code Quality:** Biome (formatting + linting), textlint (Japanese text)

## Development Commands

```bash
# Install dependencies
bun i

# Local development server
bun run dev

# Build (two-stage: client first, then SSG)
bun run build

# Preview production build with Cloudflare Pages
bun run preview

# Deploy to Cloudflare Pages
bun run deploy

# Code formatting
bun run fmt              # Format app/ directory
bun run fmt:check        # Check formatting

# Linting
bun run lint             # Lint app/ directory
bun run lint:fix         # Auto-fix lint issues
bun run lint:fix:unsafe  # Auto-fix with unsafe transformations

# Japanese text linting (MDX files)
bun run lint:text        # Check Japanese text
bun run lint:text:fix    # Auto-fix text issues

# Type checking
bun run typecheck

# Utilities
bun run create          # Create new blog article (interactive)
bun run convert         # Convert images from app/pre-assets/ to WebP
```

## Architecture

### HonoX File-Based Routing

HonoX uses file-based routing with a Next.js-like conventions:

- **`app/routes/`** - Route handlers (`.tsx` files)
  - `index.tsx` - Homepage (`/`)
  - `entry/[slug].tsx` - Dynamic blog article pages (`/entry/:slug`)
  - `ogps/[slug].tsx` - OGP image generation (`/ogps/:slug.png`)
  - `_renderer.tsx` - Layout wrapper for all pages
  - `robots.txt.ts` - Static file generation

### Content Architecture

**Article Structure:**
- Articles are stored in `app/articles/YYYYMM/YYYYMMDD/*.mdx`
- Example: `app/articles/202504/20250402/blog-started.mdx`
- Each article has frontmatter with metadata (see Frontmatter schema below)
- Articles are imported via `import.meta.glob()` in `app/lib/posts.ts`

**MDX Processing:**
- MDX files use custom components defined in `app/lib/mdxComponents/`
- Custom components: `ArticleImage`, `ExternalOgp`, `AnchorLink`
- Syntax highlighting via `rehype-pretty-code`
- Japanese text wrapping via BudouX parser

### Build Process

The build runs in two stages (see `package.json` script):

1. **Client build:** `vite build --mode client`
   - Generates client-side JS bundles
   - Uses `honox/vite/client` plugin

2. **SSG build:** `vite build`
   - Generates static HTML pages for all routes
   - Uses `@hono/vite-ssg` plugin
   - Copies assets from `app/assets/` to `dist/assets/`
   - Entry point: `app/server.ts`

**Asset Handling:**
- Images in `app/assets/**/*.{png,jpg,jpeg,webp,gif}` are copied to `dist/assets/`
- Path transformation: `app/articles/202504/assets/image.png` → `dist/assets/image.png`
- CSS: `app/styles/style.css` → `dist/styles/style.css`

### Directory Structure

```
app/
├── routes/          # HonoX file-based routes
├── articles/        # MDX blog posts (YYYYMM/YYYYMMDD/slug.mdx)
├── components/      # Server-rendered React components
├── islands/         # Client-side interactive components
├── lib/             # Utilities and MDX configuration
│   ├── posts.ts     # Article loading and filtering
│   └── mdxComponents/ # Custom MDX components
├── types/           # TypeScript type definitions
├── utils/           # Helper functions
├── constants/       # App-wide constants
├── styles/          # Global CSS
└── server.ts        # Hono app entry point
```

**Components vs Islands:**
- **components/**: Server-side only (no interactivity)
- **islands/**: Client-side interactive (e.g., `ThemeButton`, `Toc`)

### Key Files

- **`app/lib/posts.ts`**: Central article management
  - `getPosts()` - Returns all articles sorted by date
  - `getPostByEntryName(slug)` - Fetch single article
  - Uses `import.meta.glob()` to load all MDX files

- **`app/routes/_renderer.tsx`**: Global layout
  - Sets up HTML structure, meta tags, OGP
  - Handles theme script injection
  - Different paths for dev vs prod (style.css, theme.js)

- **`vite.config.ts`**: Build configuration
  - Conditional config based on `mode` (client vs SSG)
  - MDX plugins: remark-frontmatter, rehype-pretty-code
  - Asset copying rules
  - SSR externals for unified, mdx, satori, etc.

## Creating New Articles

Use the interactive script:

```bash
bun run create
```

This:
1. Prompts for article title and URI slug
2. Creates directory structure: `app/articles/YYYYMM/YYYYMMDD/`
3. Generates MDX file with frontmatter template
4. Opens file in VS Code

### Frontmatter Schema

```typescript
{
  title: string;        // Article title
  date: string;         // ISO 8601 date (creation)
  update: string;       // ISO 8601 date (last update)
  description: string;  // SEO description
  categories: string[]; // Article categories
  iconUrl: string;      // Icon URL (e.g., /article-icons/hono.svg)
  tags: Array<{         // Tags with icons
    tag: string;
    icon: string;
  }>;
}
```

## Cloudflare Bindings

Configured in `wrangler.toml`:

- **KV:** `terastech-blog-kv` (binding name: `terastech-blog-kv`)
- **R2:** `terastech-blog-r2` (binding name: `terastech-blog-r2`)
- **D1:** `terastech-blog-db` (binding name: `DB`)

Access bindings via Hono context in routes.

## Code Style

**Biome Configuration:**
- 2-space indentation
- 80-character line width
- Auto-organize imports
- Error on unused imports
- MDX files included in formatting

**Textlint (Japanese):**
- Enforces Japanese spacing rules
- Technical writing presets
- Allows full-width punctuation
- Configured for `.mdx` files

## Image Conversion

Convert images to optimized WebP:

```bash
bun run convert
```

- Reads from `app/pre-assets/`
- Outputs to `app/assets/` (1080px width, quality 60)
- Requires `ffmpeg` installed
