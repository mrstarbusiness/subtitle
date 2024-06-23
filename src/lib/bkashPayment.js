import { counterModel } from "@/models/counter-model";
import axios from "axios";

export const grantToken = async () => {
    try {
      const { data } = await axios.post(
        process.env.BKASH_GRANT_TOKEN_URL,
        {
          app_key: process.env.BKASH_API_KEY,
          app_secret: process.env.BKASH_SECRET_KEY,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            username: process.env.BKASH_USERNAME,
            password: process.env.BKASH_PASSWORD,
          },
        }
      );
  
      return data.id_token;
    } catch (error) {
      return null;
    }
  };

export const makeHeaders = (bkashGrantToken) => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: bkashGrantToken,
    "x-app-key": process.env.BKASH_API_KEY,
  }
}

export const getNextInvoiceNumber = async ()  => {
  const counter = await counterModel.findByIdAndUpdate(
    { _id: 'invoiceNumber' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
}