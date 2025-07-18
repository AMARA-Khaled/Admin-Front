export async function loadFakeData<T>(file: string): Promise<T> {
  // Use dynamic import for compatibility with Next.js (works in server components)
  const data = await import(`../data/${file}`);
  // For default export (JSON files are imported as default)
  return data.default;
} 