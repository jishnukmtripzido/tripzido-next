import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("cities-list", "");
  return Response.json({ revalidated: true });
}
