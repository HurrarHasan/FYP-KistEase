const db = require("../models/index");
const mongoose = require("mongoose")
exports.register_Guarantor = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  let {
    guarantorName,
    guarantorEmail,
    guarantorPhoneNo,
    guarantorAddress,
    seller_id,
  } = req.body;
  console.log({ seller_id });
  // const result = await db.customerdetails.find({ seller_id: seller_id });
  // console.log({ result });
  // console.log(
  //   "seller_id from customer model:",
  //   result[-1],
  //   "customer_id from customer model:",
  //   result[-1]
  // );
  let getResult = await db.customerdetails
    .aggregate([
      {
        $match: { seller_id
          : mongoose.Types.ObjectId(seller_id) },
      },
    ]);
  const result=getResult.reverse();
  console.log("last Element:",result[0] );
  let guarantorDetails = new db.guarantordetails({
    guarantorName,
    guarantorEmail,
    guarantorPhoneNo,
    CNIC:req.files.CNIC[0].filename,
    utilityBill:req.files.utilityBill[0].filename,
    customer_id:result[0]._id,
    seller_id:result[0].seller_id,
  });
  guarantorDetails
    .save()
    .then((result) => {
      console.log("saved to MongoDB Atlas>>", result);
      return res.status(201).json({ message: "User registerd Successfully" });
    })
    .catch((err) => {
      console.log("we have error", err);
      return res.status(500).json({ message: "Failed to register" });
    });
};
