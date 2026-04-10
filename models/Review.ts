import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  clientName: string;
  reviewText: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  clientName: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Avoid OverwriteModelError in Next.js development
export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
