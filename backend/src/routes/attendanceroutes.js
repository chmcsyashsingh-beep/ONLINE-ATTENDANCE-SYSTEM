import express from "express";

import {
  getAllAttendance,
  getAttendanceByID,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendancecontroller.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.get("/:id", getAttendanceByID);
router.post("/", createAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
