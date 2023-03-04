const { Chat } = require('../models');
const { Op } = require('sequelize');

class chatController {
  static getMessageHistory = async (req, res) => {
    const { from, to } = req.params;
    try {
      let getMsg;
      getMsg = await Chat.findOne({
        where: {
          [Op.or]: [
            { fromUserId: +from, toUserId: +to },
            { fromUserId: +to, toUserId: +from },
          ],
        },
      });
      if (!getMsg) throw { name: 'Not found' };
      res.status(200).json(getMsg);
    } catch (error) {
      if (error.name === 'Not found') res.status(404).json({ message: error.name });
      else res.status(500).json({ message: 'Internal server error' });
    }
  };

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
      const room = 'room ' + from * to;
      // addMsg.message = [];
      if (!addMsg) {
        addMsg = await Chat.create({
          fromUserId: +from,
          toUserId: +to,
          message: adding,
          roomId: room,
        });
      } else {
        await addMsg.update({ message: adding });
        const check = await addMsg.save();
      }
      res.status(201).json(addMsg);
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError') res.status(400).json({ message: 'Input is invalid' });
      else res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getAllUserRelatedToSender = async (req, res) => {
    const from = req.params.fromId;
    console.log(from);
    try {
      let allUsers = await Chat.findAll({
        where: {
          [Op.or]: [{ fromUserId: +from }, { toUserId: +from }],
        },
      });
      if (!allUsers || allUsers.length === 0) throw { name: 'Not found' };
      res.status(200).json(allUsers);
    } catch (err) {
      console.log(err);
      if (err.name === 'Not found') res.status(404).json({ message: err.name });
      else res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = chatController;
