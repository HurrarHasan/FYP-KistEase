const db = require("../models/index");
const mongoose = require("mongoose");
async function addBrand(BrandName, modelName, product_id, seller_id) {
  console.log("addBrand");
  console.log({ product_id });
  console.table({ BrandName, modelName, product_id, seller_id });
  await db.productsdetails
    .findOneAndUpdate(
      { _id: product_id, seller_id: seller_id },
      { $push: { productBrand: BrandName } }
    )
    .then((result) => {
      console.log("addBrand result", result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "error" });
    });
  const existingBrand = await db.branddetails.findOne({
    brandName: BrandName,
    seller_id: seller_id,
  });
  console.log({ existingBrand });
  if (existingBrand) {
    let returnDetails;
    await db.branddetails
      .findOneAndUpdate(
        { _id: existingBrand._id, seller_id: existingBrand.seller_id },
        {
          $push: {
            modelName: modelName,
          },
        }
      )
      .then((result) => {
        console.log("Brand Result", result);
        returnDetails = result._id;
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "error" });
      });
    return returnDetails;
  } else {
    let brandDetails = new db.branddetails({
      brandName: BrandName,
      modelName: modelName,
      product_id: product_id,
      seller_id: seller_id,
    });
    console.log("afterBrandDetails");
    let returnDetails;
    await brandDetails
      .save()
      .then((result) => {
        console.log("Result Brand", result);
        returnDetails = result._id;
        console.log({ returnDetails });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "error" });
      });
    return returnDetails;
  }
}
async function addModel(modelName, product_id, seller_id, brand_id, makeYear) {
  console.log("addModel");
  console.table({ modelName, product_id, seller_id, brand_id, makeYear });
  const existingmodel = await db.modeldetails.findOne({
    modelName: modelName,
    product_id: product_id,
    brand_id: brand_id,
  });
  console.log({ existingmodel });
  if (existingmodel) {
    let model_id;
    await db.modeldetails
      .findOneAndUpdate(
        { _id: existingmodel._id, product_id: product_id },
        { $push: { makeYear: makeYear } }
      )
      .then((result) => {
        console.log("Model Result before else", result._id);
        debugger;
        model_id = result._id;
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "error" });
      });
    return model_id;
  } else {
    let modelDetails = new db.modeldetails({
      modelName: modelName,
      makeYear: makeYear,
      product_id: product_id,
      brand_id: brand_id,
      seller_id: seller_id,
    });
    let model_id;
    await modelDetails
      .save()
      .then((result) => {
        console.log("Model Result in else", result._id);
        debugger;
        model_id = result._id;
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "error" });
      });
    return model_id;
  }
}
async function addMakeYear(
  product_id,
  MakeYear,
  seller_id,
  brand_id,
  model_id,
  productQuantity,
  productPrice,
  productImage
) {
  console.log("addMakeYear");
  console.log({
    product_id,
    MakeYear,
    seller_id,
    brand_id,
    model_id,
    productQuantity,
    productPrice,
    productImage,
  });
  console.table({
    product_id,
    MakeYear,
    seller_id,
    brand_id,
    model_id,
    productQuantity,
    productPrice,
    productImage,
  });
  let makeyearDetails = new db.makeyeardetails({
    makeYear: MakeYear,
    productQuantity: productQuantity,
    productPrice: productPrice,
    productImage: productImage,
    product_id: product_id,
    brand_id: brand_id,
    model_id: model_id,
    seller_id: seller_id,
  });
  makeyearDetails
    .save()
    .then((result) => {
      console.log("makeyearDetails", result);
    })
    .catch((err) => {
      console.log("we have error", err);
      return res.status(500).json({ message: "Failed to register" });
    });
}
exports.register_Product = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const productNameExist = await db.productsdetails.findOne({
    productName: req.body.productName,
    seller_id: req.body.seller_id,
  });
  // console.log({ productNameExist });
  if (productNameExist) {
    // return res.status(500).json({ message: "product exists" });
    let {
      productName,
      productBrand,
      productMakeYear,
      productModelName,
      productPrice,
      productQuantity,
      seller_id,
    } = req.body;
    let productImage = req.file.filename;
    let product_id = productNameExist._id;
    console.log({ product_id });
    const brand_id = await addBrand(
      productBrand,
      productModelName,
      product_id,
      seller_id
    );
    console.log("brandDetails:", brand_id);
    const model_id = await addModel(
      productModelName,
      product_id,
      seller_id,
      brand_id,
      productMakeYear
    );
    console.log("modelDetails:", model_id);
    await addMakeYear(
      product_id,
      productMakeYear,
      seller_id,
      brand_id,
      model_id,
      productQuantity,
      productPrice,
      productImage
    )
      .then((result) => {
        return res.status(200).json({ message: "Successful", result: result });
      })
      .catch((err) => {
        console.log("we have error", err);
        return res.status(500).json({ message: "Failed to register" });
      });
  } else {
    let {
      productName,
      productBrand,
      productMakeYear,
      productModelName,
      productPrice,
      productQuantity,
      seller_id,
    } = req.body;
    let productImage = req.file.filename;
    let productDetails = new db.productsdetails({
      productName,
      productBrand,
      seller_id,
    });
    productDetails
      .save()
      .then((result) => {
        console.log("saved to MongoDB Atlas>>", result);
        const product_id = result._id;

        let brandDetails = new db.branddetails({
          brandName: productBrand,
          modelName: productModelName,
          product_id: product_id,
          seller_id,
        });
        brandDetails
          .save()
          .then((result) => {
            console.log(result);
            const brand_id = result._id;
            let modelDetails = new db.modeldetails({
              modelName: productModelName,
              makeYear: productMakeYear,
              product_id: product_id,
              brand_id: brand_id,
              seller_id,
            });
            modelDetails
              .save()
              .then((result) => {
                console.log(result);
                const model_id = result._id;
                let makeyearDetails = new db.makeyeardetails({
                  makeYear: productMakeYear,
                  productPrice: productPrice,
                  productQuantity: productQuantity,
                  productImage: productImage,
                  product_id: product_id,
                  brand_id: brand_id,
                  model_id: model_id,
                  seller_id: seller_id,
                });
                makeyearDetails
                  .save()
                  .then((result) => {
                    console.log(result);
                    return res
                      .status(200)
                      .json({ message: "Read Successful", result: result });
                  })
                  .catch((err) => {
                    console.log("we have error", err);
                    return res
                      .status(500)
                      .json({ message: "Failed to register" });
                  });
              })
              .catch((err) => {
                console.log("we have error", err);
                return res.status(500).json({ message: "Failed to register" });
              });
          })
          .catch((err) => {
            console.log("we have error", err);
            return res.status(500).json({ message: "Failed to register" });
          });
      })
      .catch((err) => {
        console.log("we have error", err);
        return res.status(500).json({ message: "Failed to register" });
      });
  }
};

exports.get_Product = (req, res) => {
  const seller_id = mongoose.Types.ObjectId(req.body.seller_id);
  console.log("second Sellerid:", { seller_id });
  db.productsdetails
    .find({ seller_id: seller_id })
    .then((result) => {
      console.log({ result });
      return res
        .status(200)
        .json({ message: "Read Successful", result: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "failed to Read" });
    });
};

exports.view_Product = async (req, res) => {
  // console.log("seller_id2:", req.body);
  const seller_id = mongoose.Types.ObjectId(req.body.seller_id);
  const product_id = mongoose.Types.ObjectId(req.body.product_id);
  console.log({ seller_id, product_id });
  const productName = await db.productsdetails
    .findOne({ _id: product_id })
    .select("productName");
  console.log({ productName });
  await db.makeyeardetails
    .aggregate([
      { $match: { seller_id: seller_id, product_id: product_id } },
      {
        $lookup: {
          from: "modeldetails",
          localField: "model_id",
          foreignField: "_id",
          as: "Model",
        },
      },
      { $unwind: "$Model" },
      {
        $lookup: {
          from: "branddetails",
          localField: "Model.brand_id",
          foreignField: "_id",
          as: "Brand",
        },
      },
      { $unwind: "$Brand" },
      // {
      //   $lookup: {
      //     from: "productsdetails",
      //     localField: "Brand.product_id",
      //     foreignField: "_id",
      //     as: "Product",
      //   },
      // },
      // { $unwind: "$Product" },
      // {
      //   $project: {
      //     "Brand._id": 1,
      //     "Brand.brandName": 1,
      //     "Model._id": 1,
      //     "Model.modelName": 1,
      //     "Product.productName": 1,
      //     "Product._id": 1,
      //     "Product.brandName":1,
      //     _id: 1,
      //     brand_id: 1,
      //     model_id: 1,
      //     product_id: 1,
      //     seller_id: 1,
      //     makeYear: 1,
      //     productQuantity: 1,
      //     productPrice: 1,
      //     productImage: 1,
      //   },
      // },
    ])
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Successfully",
        result: result,
        productName: productName.productName,
      });
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json({ message: "Unsuccessful!", error: err });
    });
  // console.log(result);
};
exports.view_Product_Category = async (req, res) => {
  // console.log("seller_id2:", req.body);
  const seller_id = mongoose.Types.ObjectId(req.body.seller_id);
  // console.log("second Sellerid:", { seller_id });
  // db.productsdetails
  //   .find({ seller_id: seller_id })
  //   .then((result) => {
  //     // console.log({ result });
  //     return res
  //       .status(200)
  //       .json({ message: "Read Successful", result: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).json({ message: "failed to Read" });
  //   });
  await db.productsdetails
    .aggregate([
      { $match: { seller_id: seller_id } },
      // {
      //   $lookup: {
      //     from: "makeyeardetails",
      //     localField: "_id",
      //     foreignField: "product_id",
      //     as: "MakeYear",
      //   },
      // },
      // {$unwind:"$MakeYear"}
    ])
    .then((result) => {
      console.log(result);
      let new_res = new Set(
        result.map((item) => {
          return item.productName;
        })
      );
      console.log({ new_res });
      return res.status(200).json({ message: "Successfully", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Unsuccessful!", error: err });
    });
  // console.log(result);
};
exports.update_Product = async (req, res) => {
  // console.log(req.body);
  // let {
  //   product_id,
  //   brand_id,
  //   model_id,
  //   makeYear_id,
  //   productName,
  //   makeYear,
  //   brandName,
  //   modelName,
  //   productPrice,
  //   productQuantity,
  // } = req.body;
  // const updateProduct = await db.productsdetails.findByIdAndUpdate(
  //   { _id: product_id },
  //   { $set: { productName: productName } }
  // );
  // const updateProductBrand = await db.branddetails.findByIdAndUpdate(
  //   { _id: brand_id },
  //   { $set: { brandName: brandName } }
  // );
  // const updateProductModel = await db.modeldetails.findByIdAndUpdate(
  //   { _id: model_id },
  //   { $set: { modelName: modelName } }
  // );
  // const updateProductMakeYear = await db.makeyeardetails.findByIdAndUpdate(
  //   {_id:makeYear_id},
  //   {$set:{makeYear:makeYear}}
  // )
  // if(updateProduct&&updateProductBrand&&updateProductModel&&updateProductMakeYear){
  //   return res.status(200).json({message:"Successful"})
  // }else{
  //   return res.status(500).json({message:"UnSuccessful"})
  // }
  console.log(req.body);
  let {
    product_id,
    brand_id,
    model_id,
    makeYear_id,
    productPrice,
    productQuantity,
  } = req.body;
  await db.makeyeardetails
    .findByIdAndUpdate(
      {
        _id: makeYear_id,
        product_id: product_id,
        brand_id: brand_id,
        model_id: model_id,
      },
      { $set: { productPrice: productPrice, productQuantity: productQuantity } }
    )
    .then((result) => {
      console.log(result);
      return res.status(204).json({ message: "successful", result: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Unsuccessful" });
    });
};
exports.get_installment_Customer_Product = async (req, res) => {
  let { seller_id, makeYearId } = req.body;
  console.log({seller_id,makeYearId})
  const product_result=await db.makeyeardetails
    .aggregate([
      {
        $match: {
          seller_id: mongoose.Types.ObjectId(seller_id),
          _id: mongoose.Types.ObjectId(makeYearId),
        },
      },
      {
        $lookup: {
          from: "modeldetails",
          localField: "model_id",
          foreignField: "_id",
          as: "Model",
        },
      },
      { $unwind: "$Model" },
      {
        $lookup: {
          from: "branddetails",
          localField: "Model.brand_id",
          foreignField: "_id",
          as: "Brand",
        },
      },
      { $unwind: "$Brand" },
      {
        $lookup: {
          from: "productsdetails",
          localField: "Brand.product_id",
          foreignField: "_id",
          as: "Product",
        },
      },
      { $unwind: "$Product" },
      {
        $project:{
          "Product.productName":1,
          "Product._id":1,
          "Brand.brandName":1,
          "Model.modelName":1,
          "productPrice":1,
          "productQuantity":1,
          "productImage":1,
          "makeYear":1
        }
      }
    ]);
    const installmentResult = await db.installmentdetails.find({seller_id:seller_id,product_id:product_result[0].Product._id})
    if(product_result){
      console.log({product_result,installmentResult})
      return res.status(200).json({message:"Successful", result:product_result[0], installmentResult: installmentResult})
    }else{
      return res.status(500).json({mesage:"Unsuccessful"})
    }
    // .then((result) => {
    //   return res.status(200).send(result);
    // })
    // .catch((err) => {
    //   return res.status(500).send(err);
    // });
};
exports.delete_Product = async (req, res) => {
  console.log(req.body);
  const { makeYearId } = req.body;
  db.makeyeardetails
    .findByIdAndDelete({ _id: mongoose.Types.ObjectId(makeYearId) })
    .then((result) => {
      console.log("successfully", { result });
      return res.status(204).json({ message: "Delete Successful" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "failed to Read" });
    });
};
exports.callBrand = (req, res) => {
  console.log("Request Body", req.body);
  let { seller_id, product_id } = req.body;
  db.branddetails
    .find({ seller_id: seller_id, product_id: product_id })
    .then((result) => {
      console.log({ result });
      return res
        .status(200)
        .json({ message: "got the result", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Unsuccessful!", error: err });
    });
};
exports.callModel = (req, res) => {
  console.log(req.body);
  console.log("we are in call model");
  let { seller_id, product_id, brand_id } = req.body;
  db.modeldetails
    .find({
      product_id: product_id,
      brand_id: brand_id,
      seller_id: seller_id,
    })
    .then((result) => {
      console.log({ result });
      return res
        .status(200)
        .json({ message: "got the result", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Unsuccessful!", error: err });
    });
};
exports.callMakeYear = (req, res) => {
  console.log(req.body);
  console.log("we are callMakeYear");
  let { seller_id, product_id, brand_id, model_id } = req.body;
  db.makeyeardetails
    .find({
      seller_id: seller_id,
      product_id: product_id,
      brand_id: brand_id,
      model_id: model_id,
    })
    .then((result) => {
      console.log({ result });
      return res
        .status(200)
        .json({ message: "got the result", result: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Unsuccessful!", error: err });
    });
};
exports.getOne_Product = (req, res) => {};
//testing model
exports.printTable = (req, res) => {};
