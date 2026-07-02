import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("popular-rentals", { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
