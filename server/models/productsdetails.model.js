const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// let productsdetailsSchema = new Schema({
//   productName: { type: String, required: true },
//   productBrand:{type:String,required:true},
//   productMakeYear:{type:String,required:true},
//   productModelName:{type:String,required:true},
//   productPrice: { type: String, required: false },
//   productCategory: { type: String, required: false },
//   productQuantity:{type:Number,required:true},
//   productImage: { type: String, required: true },
//   seller_id: { type: mongoose.Schema.ObjectId, required: false },
// });
let productsdetailsSchema = new Schema({
  productName: { type: String, required: true },
  productBrand: { type: Array, required: true },
  seller_id: { type: mongoose.Schema.ObjectId, required: false },
});
module.exports = mongoose.model("productsdetails", productsdetailsSchema);
