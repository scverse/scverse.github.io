// Neither module is on disk: both are resolved at runtime by the importmap in
// layouts/partials/head.html, and listed as externals in its js.Build call.

// Untyped on purpose — the import is only there for bootstrap’s side effects.
declare module "bootstrap"

// Written by `npx pagefind` after the Hugo build. Only the surface main.ts uses.
declare module "pagefind" {
  export function options(options: { excerptLength?: number }): Promise<void>
  export function init(): Promise<void>
  export function search(term: string): Promise<{ results: PagefindResult[] }>

  export interface PagefindResult {
    data(): Promise<PagefindDocument>
  }

  export interface PagefindDocument {
    url: string
    excerpt: string
    meta: { title?: string }
  }
}
