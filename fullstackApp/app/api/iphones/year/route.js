import { NextResponse } from "next/server";
import { getDatabaseByLaunchYear } from "@/lib/mongo/db";

export async function GET(req) {
  const url = new URL(req.url);
  const year = parseInt(url.searchParams.get("value"));
  const data = await getDatabaseByLaunchYear(year);

  if (!data.length) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
