import mongoose, { Schema, Document } from "mongoose";

export interface IPageContent extends Document {
  pageKey: string;
  title: string;
  content: string;
  updatedAt: Date;
}

const PageContentSchema: Schema = new Schema({
  pageKey: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.PageContent || mongoose.model<IPageContent>("PageContent", PageContentSchema);
