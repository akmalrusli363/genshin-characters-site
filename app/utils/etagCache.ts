interface EtagCacheEntry<T> {
  etag: string;
  data: T;
}

export async function fetchData<T>(url: string | URL): Promise<T | undefined> {
  return fetchWithoutEtag(url);
}

async function fetchWithoutEtag<T>(url: string | URL): Promise<T | undefined> {
  const urlString = url.toString();

  let res: Response | undefined;
  try {
    res = await fetch(url);
  } catch (error) {
    console.error(`[Fetch] Network error for ${urlString}:`, error);
    // Re-throw the error so the caller can handle it, e.g., by showing an error page.
    throw new Error(`Failed to fetch data for ${urlString}. Please check your network connection.`);
  }

  if (!res.ok) {
    throw new Error(`[Fetch] Failed to fetch ${urlString}, received status: ${res.status}`);
  }

  // Handle empty responses (like 204 No Content) before trying to parse JSON.
  if (res.headers.get("Content-Length") === "0" || res.status === 204) {
    console.log(`[Fetch] Received empty response for ${urlString}`);
    return undefined;
  }

  let data: T;
  try {
    data = await res?.json();
  } catch (error) {
    console.error(`[Fetch] Failed to parse JSON for ${urlString}:`, error);
    throw new Error(`Failed to parse response for ${urlString}.`);
  }
  return data;
}


export async function fetchWithEtag<T>(url: string | URL): Promise<T | undefined> {
  const urlString = url.toString();
  const headers: HeadersInit = {};

  // 1. Check for a cached entry in localStorage (client-side only)
  const isClient = typeof window !== 'undefined';
  let cachedEntry: EtagCacheEntry<T> | undefined = undefined;

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

  let res: Response;
  try {
    res = await fetch(url, { headers });
  } catch (error) {
    console.error(`[Fetch] Network error for ${urlString}:`, error);
    // Re-throw the error so the caller can handle it, e.g., by showing an error page.
    throw new Error(`Failed to fetch data for ${urlString}. Please check your network connection.`);
  }

  // 2. If the server returns 304, it means our cache is still valid.
  if (res.status === 304) {
    console.log(`[Cache] Hit for ${urlString}`);
    // It's possible the cached entry is undefined, so we return it as is.
    return cachedEntry ? cachedEntry.data : undefined;
  }
  
  if (!res.ok) {
    throw new Error(`[Fetch] Failed to fetch ${urlString}, received status: ${res.status}`);
  }

  // Handle empty responses (like 204 No Content) before trying to parse JSON.
  if (res.headers.get("Content-Length") === "0" || res.status === 204) {
    console.log(`[Fetch] Received empty response for ${urlString}`);
    return undefined;
  }

  // 3. If we get a new response, parse it and update the cache.
  const etag = res.headers.get("Etag");
  let data: T;
  try {
    data = await res.json();
  } catch (error) {
    console.error(`[Fetch] Failed to parse JSON for ${urlString}:`, error);
    throw new Error(`Failed to parse response for ${urlString}.`);
  }

  if (isClient && etag) {
    try {
      const newEntry: EtagCacheEntry<T> = { etag, data };
      localStorage.setItem(urlString, JSON.stringify(newEntry));
      console.log(`[Cache] Updating cache for ${urlString} -> ${etag}`);
    } catch (error) {
      console.error(`[Cache] Failed to set cache for ${urlString}:`, error);
      // This is not a critical error, so we can just log it and continue.
    }
  }

  return data;
}