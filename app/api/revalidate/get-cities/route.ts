import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("cities-list", { expire: 0 }); // immediate expiration for webhook
  return Response.json({ revalidated: true, now: Date.now() });
}
