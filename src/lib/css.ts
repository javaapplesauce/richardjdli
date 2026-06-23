import type { CSSProperties } from 'react';

/**
 * Parse a plain CSS declaration string (e.g. "display:flex; gap:8px;")
 * into a React style object. Lets us port the design's inline-style strings
 * verbatim instead of hand-translating every rule to camelCase.
 *
 * - kebab-case properties become camelCase ("font-family" -> "fontFamily")
 * - vendor prefixes are handled ("-webkit-transform" -> "WebkitTransform")
 * - CSS custom properties ("--paper") are preserved as-is
 */
export function css(decl: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const part of decl.split(';')) {
    const i = part.indexOf(':');
    if (i === -1) continue;
    const prop = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();
    if (!prop || !value) continue;
    out[toCamel(prop)] = value;
  }
  return out as CSSProperties;
}

function toCamel(prop: string): string {
  if (prop.startsWith('--')) return prop; // CSS custom property — keep verbatim
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}
