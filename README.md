# scverse.org

This is a website for [scverse.org](https://scverse.org) based on [Hugo](https://gohugo.io/).

## Repository structure

### Content

Most of the times, only the content has to be modified.
Content is stored as [TOML](https://toml.io/en/) in `.md` files in [`/content`](/content).
To modify the contents of the tutorials page, for example, one has to look inside [`/content/learn/_index.md`](/content/learn/_index.md).

### Styles

For style sheets, [SCSS](https://sass-lang.com/) is used. Modify [`/assets/main.scss`](/assets/main.scss) to change styles.

### Layout

Modifying layout is only required when pages have to be restuctured or new pages are to be added.
Look inside [`/layout`](/layout) for that. [Hugo Templating](https://gohugo.io/templates/introduction/) is used to work with content from [`/content`](/content).

## Running locally

To build the website (with hot reload), [install Hugo](https://gohugo.io/getting-started/installing/) and run

```sh
hugo server -D
```

Site search is powered by [Pagefind](https://pagefind.app/), which indexes the built HTML rather than the content files, so `hugo server` alone has no index and the search dialog will say so.
To search on the dev server, build the index into `static/` (gitignored, and stale until you rebuild it):

```sh
hugo -d /tmp/pagefind-build && npx pagefind --site /tmp/pagefind-build --output-path static/pagefind
```

Stop `hugo server` first — a `hugo` build takes the build lock out from under it.
