import { NextResponse } from "next/server";
import { getDatabaseById } from "lib/mongo/db";
import {
  deleteDocumentFromCollection,
  updateDocumentFromCollection,
} from "@/lib/mongo/db";

export async function GET(req) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  console.log(id);
  const data = await getDatabaseById(id);
  console.log(data.length);
  if (!data.length) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const data = await deleteDocumentFromCollection(id);

  console.log(data);
  if (data > 0) {
    return NextResponse.json({ success: "Data deleted" });
  }

  return NextResponse.json({ error: "No data found" }, { status: 404 });
}

export async function PUT(req) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const iphone = await req.json();

  if (
    !iphone.Model &&
    !iphone.Year &&
    !iphone["Launch price"] &&
    !iphone["Base storage"] &&
    !iphone["Screen size"] &&
    !iphone.RAM &&
    !iphone.Battery &&
    !iphone["Launch OS"] &&
    !iphone.Chipset &&
    !iphone.Weight
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const data = await updateDocumentFromCollection(id, iphone);
  if (data) {
    return NextResponse.json({ success: "Data updated" });
  }
  return NextResponse.json({ error: "Data not updated" }, { status: 422 });
}
