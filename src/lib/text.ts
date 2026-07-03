const NON_BREAKING_SPACE = " ";

/**
 * Prevents a typographic "widow" by gluing the last two words together with a
 * non-breaking space, so a single word never wraps alone onto the final line.
 */
export function preventWidows(text: string): string {
  const trimmed = text.trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace === -1) return text;
  return (
    trimmed.slice(0, lastSpace) +
    NON_BREAKING_SPACE +
    trimmed.slice(lastSpace + 1)
  );
}
