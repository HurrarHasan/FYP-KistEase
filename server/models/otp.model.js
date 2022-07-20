const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let otpSchema = new Schema({
  email:{type:String,required:true},
  customerName: { type: String, required: true },
  expireIn:{type:Number, required:true},
});
module.exports = mongoose.model("otpdetails", otpSchema);
