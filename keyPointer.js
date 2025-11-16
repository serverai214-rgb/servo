import mongoose from "mongoose";

const keyPointerSchema = new mongoose.Schema({
  index: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("KeyPointer", keyPointerSchema);
