// Public GET data from the content backend function, loaded in route loaders
// (on the server for the first visit, in the browser on navigation).
export const CONTENT_API_URL = "https://functions.poehali.dev/e3850f3d-bba8-4c1c-8dbb-bf8d3f7bdd34";

export async function fetchSection<T>(section: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${CONTENT_API_URL}?section=${section}`);
    if (!res.ok) return null;
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as T[]) : null;
  } catch {
    return null;
  }
}
