import { configurationModel } from "@/models/configuration-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthrized", { status: 401 });
  }

  const { type, value } = await request.json();

  try {
    await dbConnect();
    const updatedConfig = await configurationModel.findByIdAndUpdate(
      { _id: params.id },
      { type, value },
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedConfig), { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 400 });
  }
}
