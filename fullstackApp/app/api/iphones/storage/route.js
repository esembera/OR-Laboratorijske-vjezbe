import { NextResponse } from "next/server";
import { getDatabaseByAttribute } from "@/lib/mongo/db";

export async function GET(req) {
  const url = new URL(req.url);
  const storage = url.searchParams.get("value");
  const data = await getDatabaseByAttribute("Base storage", storage);

  if (!data.length) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
