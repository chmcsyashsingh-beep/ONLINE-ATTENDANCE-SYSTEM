import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

export default mongoose.model("Attendance", attendanceSchema);