import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "../../../../server/mongoose";
import Place from "../../../../server/models/place";

export async function POST(request: NextRequest) {
  await connectToMongoDB();
  const data = await request.json();
  const place = await Place.create(data);

  return NextResponse.json(place, { status: 201 });
}
export async function PATCH(request: NextRequest) {
  await connectToMongoDB();
  const data = await request.json();
  const place = await Place.updateOne({ _id: data._id }, data);

  return NextResponse.json(place, { status: 201 });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const type = params.get("type");
  params.delete("type");

  // get object of all query params
  const rest = Object.fromEntries(params.entries());

  let mainKey = "";

  switch (type) {
    case "Restaurant":
      mainKey = "restaurant_data";
      break;
    case "Musée":
      mainKey = "museum_data";
      break;
    case "Bar":
      mainKey = "bar_data";
      break;
    case "Parc":
      mainKey = "park_data";
      break;
    default:
      break;
  }

  Object.keys(rest).forEach((key) => {
    const value = rest[key];
    rest[`${mainKey}.${key}`] = isNaN(parseInt(value))
      ? value
      : (Number(value) as any);
    delete rest[key];
  });

  let query = {};

  if (type) {
    query = {
      type,
      ...rest,
    };
  }

  await connectToMongoDB();
  const places = await Place.find(query);
  return NextResponse.json(places, { status: 200 });
}
