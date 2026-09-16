/* ============================================================
   Unsplash service layer
   ------------------------------------------------------------
   All photo-search logic lives here — no component calls this
   directly. It is used at build time by scripts/fetch-product-
   images.mjs, which resolves every product once and writes a
   manifest; the storefront then ships plain URLs and never talks
   to Unsplash at runtime.

   Unsplash API terms this implements:
   - Client-ID authorisation
   - photographer + Unsplash attribution is captured with the URL
   - the download endpoint is triggered when a photo is selected
   Reference: https://unsplash.com/documentation
   ============================================================ */

const API = "https://api.unsplash.com";

export interface PhotoCredit {
  /** Photographer's display name. */
  name: string;
  /** Photographer's Unsplash profile. */
  profile: string;
  /** The photo's page on Unsplash. */
  photo: string;
}

export interface ResolvedPhoto {
  id: string;
  /** Ready-to-use URL at the storefront's product aspect ratio. */
  imageUrl: string;
  /** A second view for the card hover, when the search had one. */
  altUrl?: string;
  /** Unsplash's own description, used as the alt text. */
  alt: string;
  credit: PhotoCredit;
  /** The query that produced this result — useful when auditing. */
  query: string;
}

interface UnsplashPhoto {
  id: string;
  urls: { raw: string };
  alt_description: string | null;
  description: string | null;
  width: number;
  height: number;
  links: { html: string; download_location: string };
  user: { name: string; links: { html: string } };
}

export class UnsplashError extends Error {}

/**
 * Build a delivery URL at a fixed aspect ratio. `urls.raw` accepts
 * Imgix parameters, so every product image arrives pre-cropped to
 * the storefront's 4:5 frame rather than being resized in the
 * browser.
 */
export function buildUrl(
  raw: string,
  { width = 1200, ratio = 1.25, quality = 80 } = {},
): string {
  const url = new URL(raw);
  url.searchParams.set("w", String(width));
  url.searchParams.set("h", String(Math.round(width * ratio)));
  url.searchParams.set("fit", "crop");
  url.searchParams.set("crop", "entropy");
  url.searchParams.set("q", String(quality));
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("auto", "format");
  return url.toString();
}

async function request(path: string, accessKey: string): Promise<Response> {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
    },
  });

  if (res.status === 401) {
    throw new UnsplashError("Unsplash rejected the access key (401).");
  }
  if (res.status === 403) {
    throw new UnsplashError(
      "Unsplash returned 403 — the hourly rate limit is likely exhausted.",
    );
  }
  if (!res.ok) {
    throw new UnsplashError(`Unsplash returned ${res.status} for ${path}`);
  }
  return res;
}

/**
 * Unsplash asks that the download endpoint be triggered whenever a
 * photo is actually used. It returns a URL we do not need — the
 * call itself is the point.
 */
export async function trackDownload(
  downloadLocation: string,
  accessKey: string,
): Promise<void> {
  try {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });
  } catch {
    /* Attribution is already captured; a failed ping must not stop
       the build. */
  }
}

/** Search one query and return usable portrait photographs. */
async function search(
  query: string,
  accessKey: string,
  perPage: number,
): Promise<UnsplashPhoto[]> {
  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    orientation: "portrait",
    content_filter: "high",
  });
  const res = await request(`/search/photos?${params}`, accessKey);
  const body = (await res.json()) as { results?: UnsplashPhoto[] };
  return (body.results ?? []).filter((p) => p.urls?.raw && p.height >= p.width);
}

/**
 * Resolve the first usable photograph for an ordered list of
 * queries. Falls through to the next query when a search returns
 * nothing, so a narrow query can fail without losing the product.
 *
 * `skipIds` avoids handing the same photograph to two products.
 */
export async function resolvePhoto(
  queries: string[],
  accessKey: string,
  { skipIds = new Set<string>(), perPage = 8 } = {},
): Promise<ResolvedPhoto | null> {
  for (const query of queries) {
    const results = await search(query, accessKey, perPage);
    const fresh = results.filter((p) => !skipIds.has(p.id));
    if (fresh.length === 0) continue;

    const [primary, second] = fresh;
    await trackDownload(primary.links.download_location, accessKey);

    return {
      id: primary.id,
      imageUrl: buildUrl(primary.urls.raw),
      altUrl: second ? buildUrl(second.urls.raw) : undefined,
      alt:
        primary.alt_description?.trim() ||
        primary.description?.trim() ||
        query,
      credit: {
        name: primary.user.name,
        profile: primary.user.links.html,
        photo: primary.links.html,
      },
      query,
    };
  }
  return null;
}
