const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let sellerfinanceSchema= new Schema({
    // installment_id:{type: mongoose.Schema.ObjectId, required: true},
    // seller_id:{type: mongoose.Schema.ObjectId, required: true},
    // income
}) 
module.exports = mongoose.model('sellerfinance',sellerfinanceSchema);