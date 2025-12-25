import mongoose, { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  fabric: string;
  price: number;
  salePrice?: number;
  images: string[];
  page: 'home' | 'shop' | 'both';
  pageType: 'hero' | 'home' | 'shop';
  featured: boolean;
  sortOrder: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  fabric: { type: String, default: '' },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  images: { type: [String], default: [] },
  page: { type: String, enum: ['home', 'shop', 'both'], default: 'shop' },
  pageType: { type: String, enum: ['hero', 'home', 'shop'], default: 'shop' },
  featured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Product || model<IProduct>('Product', ProductSchema);
