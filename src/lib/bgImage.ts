import type { CSSProperties } from "react";

/**
 * Inline `background-image` style for an optional (often remote) image URL.
 * Returns `undefined` when no URL is set, so the CSS gradient placeholder
 * defined on the element's variant class shows through instead.
 */
export function bgImage(url?: string): CSSProperties | undefined {
  return url
    ? {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;
}
