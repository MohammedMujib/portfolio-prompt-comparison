/** Prefix a public-folder path with the Vite base, so GitHub Pages project URLs resolve. */
export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL;
  const relative = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${relative}`;
}

export function routerBasename() {
  const base = import.meta.env.BASE_URL;
  if (base === "/") return undefined;
  return base.replace(/\/$/, "");
}
