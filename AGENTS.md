<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- `docs/` is a hand-maintained static HTML/CSS/JS copy of the home page for GitHub Pages (no build); update it when the home page content changes.
- Render pixel sprites as color-grouped SVG paths and animate mascot eyelids with CSS to avoid periodic whole-page React updates.
- Keep performance optimizations in both the app and static copy; static media references must use absolute Lovable asset URLs so repository subpaths work on GitHub Pages.
- Background music uses a native audio element with preload disabled and starts only on the navigation toggle, keeping initial page loading lightweight.
- GitHub Pages deploys a staged copy of docs through Actions using scripts/prepare-pages.ts and the shared maintenance config, so switching maintenance never overwrites the normal home page source.
- Contact form submissions are validated in a client-safe schema, then stored through a dedicated TanStack server function; keep the public form surface separate from privileged database access so visitor submissions cannot read stored messages.
