# Reading Journal

A notebook-style reading journal in a single page: customizable cover, "This book belongs to" bookplate, bookshelf, yearly reading log, and free-form journal pages with fonts, colors, sizes and images.

## Run it

Open `index.html` in a browser. No build step or install needed.

## Where data is saved

Outside claude.ai, everything saves in the browser's localStorage (journal data under `rj-v1`, images under `rj-img-<id>`). Data stays on that one browser and device.

When the page runs as a claude.ai artifact, it saves to the artifact's private per-user database instead (`window.claude.use("db")`). That code path is skipped automatically elsewhere.

## Structure

Everything lives in `index.html`:
- CSS tokens at the top of `<style>` (light and dark themes)
- Pages: `renderCover`, `renderOwner`, `renderShelf`, `renderLog`, `renderEntry`
- Storage: `saveJournal`, `saveEntry`, `saveImage`, `getImage`, `connect`, `boot`
- Page turning: `go()`

## Ideas for next steps

- Real accounts and cloud sync (e.g. Supabase) so the journal follows you across devices
- Export the journal as a PDF
- Book lookup by title (Open Library API) to fill in author, pages and cover art
