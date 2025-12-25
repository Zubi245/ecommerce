import mongoose, { Schema, model, Document } from 'mongoose';

export interface ISlider extends Document {
  image: string;
  title: string;
  subtitle: string;
  enabled: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const SliderSchema = new Schema<ISlider>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  enabled: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Slider || model<ISlider>('Slider', SliderSchema);
