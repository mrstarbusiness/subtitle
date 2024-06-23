import { grantToken, makeHeaders } from "@/lib/bkashPayment";
import { paymentModel } from "@/models/payment-model";
import { userModel } from "@/models/user-model";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const paymentID = searchParams.get("paymentID");
  const status = searchParams.get("status");

  console.log("Payment id , status :", paymentID, status);

  if (status === "cancel" || status === "failure") {
    redirect(`/payment/error?message=${status}`);
  }

  if (status === "success") {
    try {
      const session = await auth();
      const user = await userModel
        .findOne({ email: session?.user?.email })
        .lean();
      const bkashGrantToken = await grantToken();
      const { data } = await axios.post(
        process.env.BKASH_EXECUTE_PAYMENT_URL,
        { paymentID },
        {
          headers: makeHeaders(bkashGrantToken),
        }
      );

      console.log("payment data", data);

      if (data && data.statusCode === "0000") {
        //const userId = globals.get('userId')
        await paymentModel.create({
          invoiceNumber: paymentID,
          user: user?._id,
          paymentID,
          trxID: data?.trxID,
          amount: parseInt(data?.amount),
          paymentStatus: status,
          refId : data?.merchantInvoiceNumber,
          misc: JSON.stringify(data),
        });

        console.log("come here for success");

        return NextResponse.redirect(
          new URL(
            `/payment/success?message=success&redirectUrl=${data?.payerReference}`,
            request.url
          )
        );
      } else {
        redirect(`/payment/error?message=${data.statusMessage}`);
      }
    } catch (error) {
      console.log(error);
      redirect(`/payment/error?message=${error.message}`);
    }
  }
}
