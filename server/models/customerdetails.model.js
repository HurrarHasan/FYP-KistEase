const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let customerdetailsSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhoneNo: { type: String, required: true },
  customerAddress: { type: String, required: true },
  CNICNO:{type:String,required:true},
  guarantorName: { type: String, required: true },
  guarantorEmail: { type: String, required: true },
  guarantorPhoneNo: { type: String, required: true },
  guarantorCNICNO: { type: String, required: true },
  customerPicture:{type: String, required: true},
  customerCNIC:{type: String, required: true},
  customerUtilityBill:{type: String, required: true},
  guarantorPicture:{type: String, required: true},
  guarantorCNIC:{type: String, required: true},
  // guarantorUtilityBill:{type: String, required: false},
  seller_id: { type: mongoose.Schema.ObjectId, required: false },
  isDefaulter:{type:Boolean,required:true}
});
module.exports = mongoose.model("customerdetials", customerdetailsSchema);
