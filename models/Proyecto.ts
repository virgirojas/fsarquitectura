import mongoose, { Schema, model, models } from 'mongoose';

export interface IProyecto {
  name: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  gallery?: string[];
  isFeatured?: boolean;
  planImage?: string;
  squareMeters?: string;
  bedrooms?: string;
  features?: string;
}

const ProyectoSchema = new Schema<IProyecto>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  gallery: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
  planImage: { type: String, required: false },
  squareMeters: { type: String, required: false },
  bedrooms: { type: String, required: false },
  features: { type: String, required: false },
}, {
  timestamps: true
});

const Proyecto = models.Proyecto || model<IProyecto>('Proyecto', ProyectoSchema);

export default Proyecto;
