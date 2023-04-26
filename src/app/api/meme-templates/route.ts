import { NextResponse } from "next/server";

import memeTemplates from "@/app/(data)/memeTemplates";

export async function GET() {
  return NextResponse.json(memeTemplates);
}
