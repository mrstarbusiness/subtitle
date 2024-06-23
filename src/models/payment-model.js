import { getNextInvoiceNumber } from "@/lib/bkashPayment";
import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  invoiceNumber: { type: String },
  user: { type: String},
  amount: { type: Number },
  trxID: { type: String },
  paymentID: { type: String },
  date: { type: Date, default: Date.now },
  paymentStatus: { type: String },
  status: { type: Number, default: 1 },
  misc: { type: String },
  refId : {type: String},
});

paymentSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.invoiceNumber = await getNextInvoiceNumber();
  }
  next();
});

export const paymentModel =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
