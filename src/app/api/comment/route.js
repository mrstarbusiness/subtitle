import { commentModel } from "@/models/comment-model";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function GET(request) {
    const searchParams = await request.nextUrl.searchParams;
    const subtitleID = searchParams.get("subtitleId");

    const comments = await commentModel.find({"subtitle" : subtitleID, status : 1}).sort({createdAt: -1}).populate({
        path: "user",
        model: userModel,
        select: 'name image'
    }).lean();

    return NextResponse.json({comments});

}

export async function POST(request) {
    try {
        await dbConnect();

        const session = await auth();
        if(!session?.user?.email) {
            return NextResponse.json({success: false, message : "Unauthorize"}, {status : 401});
        }

        const user = await userModel.findOne({email : session?.user?.email});
        const data = await request.json();

        const newData = {
            user : user._id,
            subtitle : data.subtitleId,
            comment: data.comment
        }

        await commentModel.create(newData);

        return NextResponse.json({success: true, message : "Comment submitted successfully"}, {status : 201});

    } catch(error) {
        console.log(error);
        return NextResponse.json({error , success: false, message : "Something went wrong"}, {status : 400});
    }
}