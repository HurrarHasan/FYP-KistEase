const authSellerSignupdetailsSchema = require('./sellersignupdetails.validation.model')
exports.validating = async function (req, res, next) {
    const get = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        CNIC: req.body.CNIC,
        emailAddress: req.body.emailAddress,
        cellNumber: req.body.cellNumber,
        shopName: req.body.shopName,
        shopLogo: req.body.shopLogo,
        password: req.body.password
    }
    try {
        console.log("result",{get})
        const result = await authSellerSignupdetailsSchema.validate(get)
        console.log(get)
        console.log(result)
        next()
    }
    catch (err) {
        if (err.isJoi === true) err.status = 422
        console.log("there has been an error Credentials are not correct:", err)
        res.send(err)
        next(err)
    }

}