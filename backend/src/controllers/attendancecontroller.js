import Attendance from "../models/attendancemodels.js";

///////// Get All
export async function getAllAttendance(_, res) {
  try {
    const attendance = await Attendance.find().sort({
      createdAt: -1,
    });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

/////////// Get By ID
export async function getAttendanceByID(req, res) {
  try {
    const attendance = await Attendance.findById(
      req.params.id
    );

    if (!attendance)
      return res
        .status(404)
        .json({ message: "Not found" });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

/////// Create
export async function createAttendance(req, res) {
  try {
    const attendance = new Attendance(req.body);
    const saved = await attendance.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

///////// Update
export async function updateAttendance(req, res) {
  try {
    const updated =
      await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

//////// Delete
export async function deleteAttendance(req, res) {
  try {
    const deleted =
      await Attendance.findByIdAndDelete(
        req.params.id
      );

    if (!deleted)
      return res
        .status(404)
        .json({ message: "Not found" });

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
