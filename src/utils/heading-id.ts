// Heading ID utility placeholder
export function generateHeadingId(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}
