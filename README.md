# Visa Sponsor Jobs

A modern Next.js job board focused on visa sponsorship opportunities worldwide.

The app aggregates live roles from multiple public job APIs, normalizes and deduplicates the data, then provides fast filtering by keyword, location/region, industry, type, and sponsorship signal.

## Highlights

- Live aggregation from multiple job sources.
- Unified job schema with deduplication and normalization.
- Visa sponsorship signal detection and filtering.
- Region-aware search (for example Europe, Asia, Middle East, Americas, Australia/Oceania, Africa).
- Rich landing pages: Home, Jobs, Job Details, About, Contact, Privacy, Advertise.
- Share-ready job detail pages and WhatsApp CTA integration.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React icons

## Data Sources

The app pulls live jobs from:

- Arbeitnow
- Remotive
- The Muse
- Remote OK
- Jobicy

If upstream APIs are unavailable, the app gracefully returns an empty state with `apiStatus: "unavailable"` instead of crashing.

## Project Structure

```text
src/
	app/
		page.tsx                  # Home page
		jobs/page.tsx             # Jobs listing + filters + pagination
		jobs/[slug]/page.tsx      # Job detail page
		about/page.tsx            # About page
		advertise/page.tsx        # Employer advertising page
		contact/page.tsx          # Contact/WhatsApp page
		privacy/page.tsx          # Privacy page
		layout.tsx                # Global metadata + shared layout
	components/
		site-header.tsx
		site-footer.tsx
		search-bar.tsx
		filters.tsx
		job-card.tsx
		share-buttons.tsx
		whatsapp-button.tsx
		ui/
	lib/
		api.ts                    # Aggregation, normalization, filtering, pagination
	types/
		job.ts                    # Core job and query types
```

## Environment Variables

Create a `.env.local` file in the project root.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=15551234567
NEXT_PUBLIC_CONTACT_PHONE=+1 555 123 4567
```

### Variable Notes

- `NEXT_PUBLIC_SITE_URL`: base URL for metadata and share links.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: used in contact/footer floating WhatsApp CTA.
- `NEXT_PUBLIC_CONTACT_PHONE`: shown in site info bar.

Fallback defaults are implemented in code for local development.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Core Behavior

### Job Fetching and Aggregation

- All providers are fetched concurrently via `Promise.allSettled`.
- Fulfilled sources are normalized into a common `Job` shape.
- Failed sources are skipped without breaking the full response.
- Results are deduplicated and sorted by newest first.

### Search and Filters

- Keyword search against title, company, location, description, and categories.
- Location matching includes country aliases and region aliases.
- Industry filter (string inclusion over normalized searchable text).
- Type filter using normalized `JobType` values.
- Visa filter (`visa=yes`) to show likely sponsor-friendly roles.

### Pagination

- Server-side pagination is applied after filtering.
- Current default page size: `15`.

## Important Routes

- `/` Home landing page with hero, quick search, featured jobs, and CTA.
- `/jobs` Full listings with filters and pagination.
- `/jobs/[slug]` Individual job details and related jobs.
- `/about` Product and mission overview.
- `/advertise` Employer-focused page for sponsored job advertising.
- `/contact` Contact channel with WhatsApp flow.
- `/privacy` Privacy information.

## Deployment

You can deploy on any platform that supports Next.js 16.

### Example (Vercel)

- Import repository
- Set environment variables
- Deploy

## Notes for Contributors

- Keep UI consistent with existing Tailwind utility patterns.
- Prefer server-side data work in `src/lib/api.ts`.
- Ensure new pages include metadata in App Router route files.
- Run lint before PRs:

```bash
npm run lint
```
