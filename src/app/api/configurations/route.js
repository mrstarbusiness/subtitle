import { configurationModel } from "@/models/configuration-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function GET(_request) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthrized", { status: 401 });
  }
  try {
    await dbConnect();
    const configs = await configurationModel.find({});
    return new NextResponse(JSON.stringify( configs ), { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 400 });
  }
}

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthrized", { status: 401 });
  }

  const { type, value } = await request.json();

  try {
    await dbConnect();

    const newConfig = new configurationModel({ type, value });
    await newConfig.save();
    return new NextResponse("Successfull inserted", { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 400 });
  }
}
