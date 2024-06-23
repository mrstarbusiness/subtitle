import { IMDB_URL } from "@/helpers/config";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET(request) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorize user", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let title = searchParams.get("query").trim().toLowerCase();
    let page = searchParams.get("page").trim() ?? 1;

    let url = `&s=${title}&page=${page}`;
    const newData = { title };


    let finalUrl = `${IMDB_URL}${url}`;
    const res = await fetch(finalUrl, { method: "GET" });
    const imdb = await res.json();

    return new NextResponse(JSON.stringify(imdb), { status: 200 });

  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 400 });
  }
}
