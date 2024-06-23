"use server";
import { configurationModel } from "@/models/configuration-model";
import { subtitleModel } from "@/models/subtitle-model";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInArray } from "@/utils/data-util";

export async function getSubtitle(type, limit= 5) {
    await dbConnect();
    let subtitles = [];
    if(type == 'top-subttile') {
        subtitles = await subtitleModel.find({}).sort({"ratings" : 1}).limit(limit).lean();
    }

    if(type == 'top-movies') {
        subtitles = await subtitleModel.find({"titleType" : "Movie"}).sort({"ratings" : 1}).limit(limit).lean();
    }

    if(type == 'tv-series') {
        subtitles = await subtitleModel.find({"titleType" : "Tv Series"}).sort({"ratings" : 1}).limit(limit).lean();
    }

    subtitles  = replaceMongoIdInArray(subtitles);
    return {status : 200, subtitles}
}

export async function getConfigurationByType(type) {
    await dbConnect();
    let configuration = await configurationModel.findOne({"type" : type}).lean();

    // configuration  = replaceMongoIdInObject(configuration);
    return {status : 200, configuration}
}


export async function getUsersByType(type) {
    await dbConnect();
    let users = [];

    if(type == 'top_five_uploaders') {
      users =  await userModel.aggregate([
        {
          $project: {
            name: 1,
            email: 1,
            uploads: 1,
            uploadsLength: {
              $size: {
                $ifNull: ["$uploads", []]
              }
            }
          }
        },
        {
          $sort: { uploadsLength: -1 }
        },
        {
          $limit: 5
        }
      ]);
    }else if(type == 'top_translator') {
      users =  await userModel.aggregate([
        {
          $project: {
            name: 1,
            email: 1,
            uploads: 1,
            uploadsLength: {
              $size: {
                $ifNull: ["$uploads", []]
              }
            }
          }
        },
        {
          $sort: { uploadsLength: -1 }
        },
        {
          $skip: 5
        },
        {
          $limit: 15
        }
      ]);
    }

    return {status: 200, users}
    
}


export async function getSubtitleById (id) {
  try {
    await dbConnect();
    const subtitle = await subtitleModel.findOne({_id : id}).lean();
    return {status: 200, subtitle}
  } catch (error ) {

    return {status: 400, message : 'Something went wrong'}
  }
}

export async function getRelatedSutitle(id, data) {
  try {
    await dbConnect();
    let subtitles = await subtitleModel.find({
       _id: { $ne: id }, 
       $or: [
        { year: data?.year },
        { genre: { $regex: data?.genre, $options: "i" } },
      ],
      }).sort({createdAt : -1})
      .lean();
      subtitles =  replaceMongoIdInArray(subtitles);
    return {status: 200, subtitles}
  } catch (error ) {

    return {status: 400, message : 'Something went wrong'}
  }
}

export async function getUserById(id) {
  try {
    await dbConnect();

    return await userModel.findOne({_id : id}).lean();
    
  } catch(error) {
    throw new Error(error.message);
  }
}