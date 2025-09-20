interface EtagCacheEntry<T> {
  etag: string;
  data: T;
}

export async function fetchWithEtag<T>(url: string | URL): Promise<T> {
  const urlString = url.toString();
  const headers: HeadersInit = {};

  // 1. Check for a cached entry in localStorage (client-side only)
  const isClient = typeof window !== 'undefined';
  let cachedEntry: EtagCacheEntry<T> | null = null;

  if (isClient) {
    console.log(`[Cache] Checking for ${urlString}`)
    const cachedItem = localStorage.getItem(urlString);
    if (cachedItem) {
      try {
        console.log(`[Cache] Found cached item for ${urlString}`);
        cachedEntry = JSON.parse(cachedItem);
        if (cachedEntry?.etag) {
          headers["If-None-Match"] = cachedEntry.etag;
        }
      } catch (e) {
        console.error("Failed to parse cache from localStorage, clearing it.", e);
        localStorage.removeItem(urlString);
      }
    }
  }

  const res = await fetch(url, { headers });

  // 2. If the server returns 304, it means our cache is still valid.
  if (res.status === 304) {
    console.log(`[Cache] Hit for ${urlString}`);
    return cachedEntry!.data; // Safe due to 304 response logic
  }

  // 3. If we get a new response, parse it and update the cache.
  const etag = res.headers.get("Etag");
  const data: T = await res.json();
  console.log(`[Cache] Updating cache for ${urlString} -> ${etag}`);

  if (isClient && etag) {
    const newEntry: EtagCacheEntry<T> = { etag, data };
    localStorage.setItem(urlString, JSON.stringify(newEntry));
  }

  return data;
}