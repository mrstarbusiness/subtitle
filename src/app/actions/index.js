"use server";

import { paymentModel } from "@/models/payment-model";
import { ratingModel } from "@/models/rating-model";
import { subtitleModel } from "@/models/subtitle-model";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInArray } from "@/utils/data-util";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "../../auth";

export async function login(data) {
  try {
    const response = await signIn("credentials", { ...data, redirect: false });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function postComment(data, blogId) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("User not authrize", { status: 401 });
  }

  try {
    await dbConnect();

    const userdata = await userModel.findOne({ email: session?.user?.email });

    const author = {
      _id: userdata?._id,
      name: userdata?.name,
    };

    const blogData = await blogModel.findOne({ _id: blogId });

    data.author = author;
    let comments = blogData.comments;
    comments.push(data);
    blogData.comments = comments;

    return await blogData.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProfileData(profileId) {
  try {
    const user = await userModel.findOne({ _id: profileId });

    return { user, blogs };
  } catch (err) {
    throw new Error(err);
  }
}

export async function uploadFile(
  formData,
  acceptFiles = [],
  fileSize = 1000,
  fileDirectory = "./public/uploads"
) {
  try {
    const session = await auth();

    if (!session) {
      return { status: 401, message: "Unauthrized" };
    }

    const file = formData.get("file");

    const { originalname, mimetype, size } = file;

    if (!acceptFiles.find((item) => item == mimetype)) {
      return { status: 422, message: "File not supported" };
    }

    if (size > fileSize) {
      return { status: 422, message: "Maximum file size" + fileSize + "kb" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.mkdir(fileDirectory, { recursive: true });
    const filePath = `${fileDirectory}/${Date.now()}_${file.name}`;

    await fs.writeFile(filePath, buffer);

    return { status: 200, message: "Success", filePath };
  } catch (err) {
    throw new Error(err);
  }
}

export async function getAllUser(type = 1) {
  const session = await auth();
  if (!session) {
    return { status: 401, message: "Unauthrized" };
  }

  try {
    let users = null;
    if (type == 1) {
      users = await userModel.find({ type }).lean();
    } else if (type == 2) {
      users = await userModel
        .find({ uploads: { $exists: true, $ne: [] } })
        .lean();
    } else if (type == 3) {
      users = await userModel
        .find({ downloads: { $exists: true, $ne: [] } })
        .lean();
    }

    if (!users) {
      return { status: 404, message: "Users not found", users };
    }

    users = replaceMongoIdInArray(users);

    return { status: 200, message: "User found", users };
  } catch (error) {
    throw new Error(error);
  }
}

export async function statusToggle(data, type = "users") {
  try {
    const session = await auth();
    if (!session) {
      return { status: 401, message: "Unauthrized" };
    }

    let model = null;

    if (type == "users") {
      model = await userModel.findOne({ _id: data.id });
    } else if (type == "my-subtitle" || type == "all-subtitle") {
      model = await subtitleModel.findOne({ _id: data.id });
    }

    let nextStatus = data.status == "1" ? 2 : 1;
    model.status = nextStatus;

    await model.save();

    revalidatePath(`/dashboard/${type}`);
    return { status: 200, message: "Success" };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSubtitles(type, limit = 50) {
  const session = await auth();
  if (!session) {
    return { status: 401, message: "Unauthrized" };
  }

  try {
    let subtitles = [];
    if (type == "my-subtile") {
      subtitles = await subtitleModel
        .find({ "author.email": session?.user?.email })
        .limit(limit)
        .lean();
    } else if (type == "all-subtile") {
      subtitles = await subtitleModel.find({}).limit(limit).lean();
    }

    subtitles = replaceMongoIdInArray(subtitles);

    return { status: 200, message: "Subtitle found", subtitles };
  } catch (error) {
    throw new Error(error);
  }
}

export async function doSignIn(type) {
  await signIn(type, {
    callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
  });
}

export async function doSingOut() {
  await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` });
}

export async function ratingSubmit(subtitleId, rating) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { status: 401, message: "Unauthrized" };
    }

    const user = await userModel.findOne({ email: session?.user?.email });

    await ratingModel.findOneAndUpdate(
      { user: user?._id, subtitle: subtitleId },
      { $set: { rating } },
      { new: true, upsert: true }
    );

    return { success: true, status: 201 };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getRatingSubtitle(subtitleId) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return null;
    }

    const user = await userModel.findOne({ email: session?.user?.email });

    const rating = await ratingModel
      .findOne({ user: user?._id, subtitle: subtitleId })
      .lean();

    return rating?.rating;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function checkPayment(subtitleId) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return false;
    }

    const user = await userModel.findOne({ email: session?.user?.email });

    const payment = await paymentModel.findOne({
      user: user._id,
      refId: subtitleId,
    });

    if (payment) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
