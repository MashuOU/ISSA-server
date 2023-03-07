const { Attendance, Student, History, Teacher, Class } = require('../models');

class AttendanceController {
  static async allAttendance(req, res, next) {
    try {
      const { StudentId } = req.query
      let query = {}
      let data
      if (StudentId !== '' && typeof StudentId !== 'undefined') {
        query.where = {
          StudentId
        }
        data = await Attendance.findAll(query)
      } else {
        data = await Attendance.findAll()

      }
      res.status(200).json(data)

    } catch (error) {
      next(error)
    }
  }

  static async addAttendance(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const { StudentId, status } = req.body;
      const check = await Student.findByPk(StudentId);
      if (!check) throw { name: `notFound` };

      const attendance = await Attendance.findAll({ where: { StudentId: StudentId } });
      if (attendance) {
        const temp = attendance.map((el) => {
          return el.createdAt;
        });
        const result = new Date(temp[temp.length - 1]).getDate();
        const now = new Date().getDate();
        if (result == now) throw { name: `absentError` };
      }
      const history = await History.create({ description: `attendance ${check.name} has been created`, createdBy: teacherClass.Teacher.name })
      const data = await Attendance.create({ StudentId, status, history });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editAttendance(req, res, next) {
    try {
      const { StudentId, status } = req.body;
      console.log(req.body);

      const check = await Student.findOne({ where: { id: StudentId }, include: Attendance });
      if (!check) throw { name: `notFound` };

      const lastIndex = check.Attendances.length - 1;
      const attendanceId = check.Attendances[lastIndex].id;
      console.log(check);
      const data = await Attendance.update(
        { status: status },
        {
          where: {
            id: attendanceId,
          },
        }
      );

      const result = check.Attendances[lastIndex];

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AttendanceController;
