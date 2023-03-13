const { Transaction, Student, Class, User } = require('../models');
const midtransClient = require('midtrans-client');
const sendMail = require('../helpers/nodemailer');

class TransactionController {
  static async midtransToken(req, res, next) {
    try {
      const StudentId = req.params.id;
      const student = await Student.findOne({
        where: { id: StudentId },
        include: [{ model: Class }, { model: User }],
      });
      // console.log(student.Class.SPP, '>>>>>');
      const { NIM } = req.user;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: 'SB-Mid-server-hJt-nLiZ4zT2U1ugrPxzah2p',
      });
      const orderNumber = new Date().getTime();
      let parameter = {
        transaction_details: {
          order_id: orderNumber,
          gross_amount: student.Class.SPP,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          NIM: NIM,
          name: student.name,
          clsss: student.Class.name,
        },
      };
      // const transaction = await Transaction.create({ status: true, StudentId: student.id, dueDate: new Date() });
      snap.createTransaction(parameter).then((transaction) => {
        let transactionToken = transaction.token;
        console.log(transactionToken);
        res.status(201).json({ transactionToken });
      });
      const payed = await Transaction.update({ status: true }, { where: { StudentId } });
      sendMail(student);
    } catch (error) {
      next(error);
    }
  }

  static async allTransactions(req, res, next) {
    try {
      const data = await Transaction.findAll();
      if (!data) throw { name: 'notFound' };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = TransactionController;
