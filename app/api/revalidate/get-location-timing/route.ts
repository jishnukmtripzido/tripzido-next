import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const listingId = body?.listing_id;

  if (!listingId) {
    return Response.json({ error: "listing_id is required" }, { status: 400 });
  }

  revalidateTag(`location-timing-${listingId}`, { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
