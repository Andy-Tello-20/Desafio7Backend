import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, require:true},
  age: { type: Number, required: false },
  role:{ type: String, required: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema);