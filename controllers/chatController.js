const { Chat } = require('../models');
const { Op } = require('sequelize');

class chatController {
  static async postMessage(req, res) {
    const { from, to, message } = req.body;
    try {
      const adding = message;
      let addMsg = await Chat.findOne({
        where: {
          [Op.or]: [
            { fromUserId: +from, toUserId: +to },
            { fromUserId: +to, toUserId: +from },
          ],
        },
      });
      console.log(addMsg);

      const room = 'room ' + from * to;

      if (!addMsg) {
        addMsg = await Chat.create({
          fromUserId: +from,
          toUserId: +to,
          message: [adding],
          roomId: room,
        });
      } else {
        addMsg.message.push(message);
        const check = await addMsg.save();
      }
      res.status(201).json(addMsg);
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError') res.status(400).json({ message: 'Input is invalid' });
      else res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = chatController;
