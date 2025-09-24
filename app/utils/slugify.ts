export function normalizeSlug(input : string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_+]+/g, "-")   // replace spaces, underscores, plus with hyphen
    .replace(/[^\w-]/g, "")     // remove special chars except hyphen
    .replace(/--+/g, "-");      // collapse multiple hyphens
}

export function fromSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}
