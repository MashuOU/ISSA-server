const { Chat, User, sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');

class chatController {
  static getMessageHistory = async (req, res) => {
    const { from, to } = req.params;
    try {
      let getMsg;
      getMsg = await Chat.findAll({
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
    console.log(message);
    try {
      let addMsg = await Chat.create({
        fromUserId: +from,
        toUserId: +to,
        message: message,
        roomId: 'room ' + from * to,
      });

      res.status(201).json(addMsg);
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError') res.status(400).json({ message: 'Input is invalid' });
      else res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getAllUserRelatedToSender = async (req, res) => {
    const toId = req.params.toId;
    try {
      let allUsers = await Chat.findAll({
        where: {
          toUserId: +toId,
        },
        attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), 'id'], 'toUserId', 'roomId'],
        group: ['toUserId', 'roomId'],
      });
      // let chatUsersToTeacher = await sequelize.query(`SELECT DISTINCT toUserId FROM Chats WHERE toUserId = ${+toId} ORDER BY toUserId`);
      // console.log(chatUsersToTeacher);
      // let users = await User.findAll();
      // let senders = allUsers.map((x) => {
      //   console.log(x.toUserId);
      //   return users.find((y) => y.id == x.toUserId);
      // });
      // console.log(senders);

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
