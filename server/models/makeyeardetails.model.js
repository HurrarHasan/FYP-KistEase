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
let makeyeardetailsSchema = new Schema({
  makeYear: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  productPrice: { type: String, required: true },
  productImage: { type: String, required: true },
  product_id: { type: mongoose.Schema.ObjectId, required: true },
  brand_id: { type: mongoose.Schema.ObjectId, required: true },
  model_id: { type: mongoose.Schema.ObjectId, required: true },
  seller_id: { type: mongoose.Schema.ObjectId, required: true },
});
module.exports = mongoose.model("makeyeardetails", makeyeardetailsSchema);
