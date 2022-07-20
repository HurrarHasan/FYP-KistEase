const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
let sellersignupdetaislsSchema = new Schema({
  shopName: { type: String, required: true },
  shopNTN: { type: String, required: true },
  shopAddress: { type: String, required: true },
  emailAddress: { type: String, required: true },
  cellNumber: { type: String, required: true },
  password: { type: String, required: true },
  shopLogo: { type: String, required: false },
  defaulterDuration: { type: Number, required: false },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});
sellersignupdetaislsSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
sellersignupdetaislsSchema.pre("findByIdAndUpdate", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
sellersignupdetaislsSchema.methods.generateAuthToken = async function () {
  // console.log('we are at generateAuthToken')
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    // console.log("Here we have the token",token)
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
module.exports = mongoose.model("sellerdetails", sellersignupdetaislsSchema);
