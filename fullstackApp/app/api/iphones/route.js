import { NextResponse } from "next/server";
import { getDatabaseForAPI, insertDocumentToCollection } from "@/lib/mongo/db";

export async function GET() {
  const data = await getDatabaseForAPI();
  return NextResponse.json(data);
}

export async function POST(req) {
  const iphone = await req.json();

  if (
    !iphone.Model ||
    !iphone.Year ||
    !iphone["Launch price"] ||
    !iphone["Base storage"] ||
    !iphone["Screen size"] ||
    !iphone.RAM ||
    !iphone.Battery ||
    !iphone["Launch OS"] ||
    !iphone.Chipset ||
    !iphone.Weight
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const data = await insertDocumentToCollection(iphone);
  if (data) {
    return NextResponse.json({ success: "Data inserted" });
  }
  return NextResponse.json({ error: "Data not inserted" }, { status: 422 });
}
