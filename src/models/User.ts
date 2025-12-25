import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

export default mongoose.models.User || model<IUser>('User', UserSchema);
