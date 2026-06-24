// // app/api/auth/clear-session/route.ts
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const cookieStore = await cookies();
//   cookieStore.delete("access_token");
//   cookieStore.delete("refresh_token");
//   return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_API_URL!));
// }

// app/api/auth/clear-session/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  const origin = new URL(request.url).origin;
  return NextResponse.redirect(new URL("/", origin));
}
