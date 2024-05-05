import { NextRequest, NextResponse } from "next/server";
import Place from "../../../../../server/models/place";
import connectToMongoDB from "../../../../../server/mongoose";

export async function GET(request: NextRequest) {
  const id = request.nextUrl?.pathname.split("/").pop();

  await connectToMongoDB();
  const place = await Place.findOne({ _id: id });
  return NextResponse.json(place, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl?.pathname.split("/").pop();
  await connectToMongoDB();
  await Place.deleteOne({ _id: id });
  return NextResponse.json({ message: "Place deleted" }, { status: 200 });
}
