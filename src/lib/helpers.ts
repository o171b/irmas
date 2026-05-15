export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getProductUrl(slug: string): string {
  return `/products/${slug}`;
}

export function getCategoryUrl(slug: string): string {
  return `/categories/${slug}`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural ?? `${singular}s`;
}
