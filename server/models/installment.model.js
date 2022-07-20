const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let installmentdetailsSchema = new Schema({
  seller_id: { type: mongoose.Schema.ObjectId, required: true },
  product_id: { type: mongoose.Schema.ObjectId, required: true },
  customer_id: { type: mongoose.Schema.ObjectId, required: true },
  productPrice: { type: Number, required: false },
  installmentAmount: { type: Number, required: false },
  installmentStartDate: { type: String, required: true },
  downPayment: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
  interestRate:{type:String,required:true},
  installmentStatus: { type: String, required: false },
  productMonthlyInstallment: [
    {
      date: { type: String, required: false },
      montlyInstallment: { type: Number, required: false },
      status: { type: String, required: false },
      payedAmount: { type: Number, required: false },
      payDate: { type: String, required: false },
    },
  ],
});
module.exports = mongoose.model("installmentdetails", installmentdetailsSchema);
