import { subtitleModel } from "@/models/subtitle-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  let data = [];
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  try {

    data = await subtitleModel
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { year: { $regex: query, $options: "i" } },
          { language: { $regex: query, $options: "i" } },
          { genre: { $regex: query, $options: "i" } },
        ],
      })
      .limit(15)
      .lean();

      console.log(query,data);

    return NextResponse.json({ data },{status : 200});
  } catch (error) {
    return NextResponse.json({ data });
  }
}
