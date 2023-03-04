const { Attendance } = require('../models');

class AttendanceController {
  static async addAttendance(req, res, next) {
    try {
      const { StudentId, status } = req.body;
      const data = await Attendance.create({ StudentId, status });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AttendanceController;
