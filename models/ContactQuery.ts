import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactQuery extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactQuerySchema: Schema<IContactQuery> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactQuery: Model<IContactQuery> =
  mongoose.models.ContactQuery || mongoose.model<IContactQuery>("ContactQuery", ContactQuerySchema);

export default ContactQuery;
