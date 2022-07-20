const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let guarantordetailsSchema = new Schema({
  guarantorName: { type: String, required: true },
  guarantorEmail: { type: String, required: true },
  guarantorPhoneNo: { type: String, required: true },
  CNIC: { type: String, required: true },
  utilityBill: { type: String, required: true },
  customer_id: { type: mongoose.Schema.ObjectId, required: false },
  seller_id: { type: mongoose.Schema.ObjectId, required: false },
});
module.exports = mongoose.model("guarantordetails", guarantordetailsSchema);
