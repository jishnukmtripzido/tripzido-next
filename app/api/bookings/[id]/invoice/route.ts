import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Please sign in to continue." },
      { status: 401 },
    );
  }

  // TODO: confirm this matches whatever base-URL env var lib/api.ts
  // actually uses — this is a placeholder until confirmed.
  const backendUrl = `${process.env.API_URL}/api/bookings/${id}/invoice/`;

  const backendRes = await fetch(backendUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!backendRes.ok) {
    let message = "Unable to download invoice.";
    try {
      const body = await backendRes.json();
      message = body?.message || message;
    } catch {
      // Non-JSON error body — fall back to the generic message rather
      // than surfacing raw bytes to the user.
    }
    return NextResponse.json({ message }, { status: backendRes.status });
  }

  const pdfBuffer = await backendRes.arrayBuffer();
  const contentDisposition =
    backendRes.headers.get("content-disposition") ??
    `attachment; filename="invoice-${id}.pdf"`;

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition,
    },
  });
}
