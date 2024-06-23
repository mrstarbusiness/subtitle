import { subtitleModel } from "@/models/subtitle-model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInArray } from "@/utils/data-util";
import { NextResponse } from "next/server";

export async function GET(request) {

  const searchParams = request.nextUrl.searchParams;

    let page = searchParams.get("page");
    let limit = searchParams.get("limit");
    let year = searchParams.get("year");
    let genre = searchParams.get("genre");
    let language = searchParams.get("language");
    let type = searchParams.get("type");

    await dbConnect();
  try {
    

    console.log("query parameter : ", page, limit, year, genre, language);

    let orConditions = [];

    if (genre) {
      orConditions.push({ genre: { $regex: genre, $options: "i" } });
    }

    if (year) {
      orConditions.push({ year: parseInt(year, 10) }); // Ensure year is a number
    }

    if (language) {
      orConditions.push({ language: { $regex: language, $options: "i" } }); // Case-insensitive partial match
    }

    let sortQuery = {createdAt : -1};

    if(type && type == 'popular') {
      sortQuery = {ratings: -1};
    }else if (type && type == 'download') {
      sortQuery = {downloads: -1};
    }else if(type && type == 'tv-series') {
      orConditions.push({ titleType: { $regex: "Tv Series", $options: "i" } }); 
    }else if(type && type == 'top-movies') {
      orConditions.push({ titleType: { $regex: "Movie", $options: "i" } }); 
      sortQuery = {ratings: -1};
    }

    // Use the $or operator if there are any conditions, otherwise find all documents
    let query = orConditions.length > 0 ? { $or: orConditions } : {};

    console.log("query : ", query);

    let subtitles = await subtitleModel
      .find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean()
      .exec();

    const count = await subtitleModel.countDocuments();

    subtitles = replaceMongoIdInArray(subtitles);
    return NextResponse.json(
      {
        subtitles,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ subtitles: [] });
  }
}
