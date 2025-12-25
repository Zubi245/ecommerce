import mongoose, { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    quantity: number;
    images: string[];
  }>;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  address: { type: String, required: true },
  items: [{
    id: String,
    name: String,
    price: Number,
    salePrice: Number,
    quantity: Number,
    images: [String],
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  },
}, { timestamps: true });

export default mongoose.models.Order || model<IOrder>('Order', OrderSchema);
