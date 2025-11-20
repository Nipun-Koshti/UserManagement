import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
  },
  geo: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    }
  }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Invalid phone number"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/.+@.+\..+/, "Invalid email format"],
  },
  company: {
    type: String,
    trim: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
