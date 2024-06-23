import { subtitleModel } from "@/models/subtitle-model";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import {
  fileUpoad,
  isValidFileSize,
  isValidMimeType,
} from "@/utils/fileUpload";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export const POST = async (request) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json("Unauthorize..", {
      status: 401,
    });
  }
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const title = formData.get("title");
    const thumbnail = formData.get("thumbnail");
    const year = formData.get("year");
    const genre = formData.get("genre");
    const language = formData.get("language");
    const releaseName = formData.get("releaseName");
    const releaseInfo = formData.get("releaseInfo");
    const runtime = formData.get("runtime");
    const productionType = formData.get("productionType");
    const releaseType = formData.get("releaseType");
    const framerate = formData.get("framerate");
    const titleType = formData.get("titleType");
    const allowedMimeTypes = formData.get("allowedMimeTypes");
    const fileSizeLimit = formData.get("fileSizeLimit");

    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    if (!isValidMimeType(file, allowedMimeTypes)) {
      return NextResponse.json({ Message: "Invalid file type", status: 422 });
    }

    if (!isValidFileSize(file, fileSizeLimit)) {
      return NextResponse.json({ Message: "Invalid file size", status: 422 });
    }

    const fileObj = await fileUpoad(file);

    await dbConnect();

    const author = {
      name: session?.user?.name,
      email: session?.user?.email,
    };

    const data = {
      filePath: fileObj?.secure_url ?? "",
      title,
      thumbnail,
      year,
      genre,
      language,
      releaseName,
      releaseInfo,
      runtime,
      productionType,
      releaseType,
      framerate,
      titleType,
    };

    console.log(data);

    const subtitle = await subtitleModel.create({ ...data, author });
    const user = await userModel.findOne({ email: session?.user?.email });

    user.uploads = subtitle._id;

    await user.save();

    revalidatePath("/dashboard/my-subtitle");

    return new NextResponse("Subtitle has been created", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message, {
      status: 500,
    });
  }
};
