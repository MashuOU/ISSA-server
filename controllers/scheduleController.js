class ScheduleController {
  static async schedules(req, res, next) {
    const { idTeacher } = req.user;
    try {
      const data = await Schedule.findAll({
        where: { ClassId: idTeacher },
        include: {
          model: Lesson,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }
}
