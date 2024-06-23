import { userModel } from "@/models/user-model";
import { auth } from "../../../../auth";

export async function GET(){
    const session = await auth();

    if(!session) {
        return new Response("Unauthrized", {status : 401});
    }
    const userData = await userModel.findOne({"email" : session?.user?.email});
    return new Response(JSON.stringify(userData), {status : 200});
}