import { subtitleModel } from "@/models/subtitle-model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInArray } from "@/utils/data-util";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    await dbConnect();
    const latest = await subtitleModel.find({}).sort({"createdAt": -1}).limit(5).lean();
    const mostPopular = await subtitleModel.find({}).sort({"ratings": 1}).limit(5).lean();
    const mostDownloads = await subtitleModel.find({}).sort({"downloads": -1}).limit(5).lean();

    const data = [
        {
            "label" : "Latest",
            "value" :  replaceMongoIdInArray(latest),
        },
        {
            "label" : "Most Downloded",
            "value" :  replaceMongoIdInArray(mostDownloads),
        },
        {
            "label" : "Most Popular",
            "value" :  replaceMongoIdInArray(mostPopular),
        },
    ]

    return new NextResponse(JSON.stringify(data), { status: 200});
  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 400 });
  }
}
