import { grantToken, makeHeaders } from "@/lib/bkashPayment";
import { configurationModel } from "@/models/configuration-model";
import { dbConnect } from "@/service/mongo";
import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(request) {
  await dbConnect();
  try {
    const requestData = await request.json();
    const bkashGrantToken = await grantToken();

    const configData = await configurationModel.findOne({type : "PER_DOWNLOAD_AMOUNT"}).lean();

    const { data } = await axios.post(
      process.env.BKASH_CREATE_PAYMENT_URL,
      {
        mode: "0011",
        payerReference: requestData?.path,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
        amount: configData?.value ?? 10,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: requestData?.subtitleId,
        
      },
      {
        headers: makeHeaders(bkashGrantToken),
      }
    );

    return NextResponse.json({ bkashURL: data.bkashURL, success : true, message: "success" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 400 }
    );
  }
}
