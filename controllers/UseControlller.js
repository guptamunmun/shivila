const mongoose =require("mongoose")
const UserModel = require("../Models/UserModel");


const isValidEmail = function (email) {
    const regexForEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regexForEmail.test(email);
};
const isValidPhone = function (phone) {
    const regexForMobile = /^[6-9]\d{9}$/;
    return regexForMobile.test(phone);
};
const isNameValid = function (value) {
    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return regex.test(value)
};
const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length > 0) return true;
};
const createuser = async function (req,res) {
    try{
    let {name , phone, email,password,address}=req.body
    if(Object.entries(req.body).length==0){
        return res.status(400).send({ status: false, message: "Data should be provided" })
    }
    if (!isValid(name) || !isNameValid(name)) {
        return res
            .status(400)
            .send({ status: false, message: `name is required and should be in valid format ` });
    }
    //validation of phone 
    
    if (!isValid(phone)) {
        return res
            .status(400)
            .send({ status: false, message: "mobile number is required" });
    }

    if (!isValidPhone(phone)) {
        return res
            .status(400)
            .send({ status: false, message: " please enter a valid 10 digit mobile number" });
    }
    const isPhoneUnique = await UserModel.findOne({ phone });

        if (isPhoneUnique) {
            return res
                .status(400)
                .send({ status: false, message: `mobile number: ${phone} already exist` });
        }
    //if email is unique
    if (!isValid(email)) {
        return res
            .status(400)
            .send({ status: false, message: "email address is required" });
    }

    if (!isValidEmail(email)) {
        return res
            .status(400)
            .send({ status: false, message: " please enter a valid email address" });
    }

const isEmailUnique = await UserModel.findOne({ email });

    if (isEmailUnique) {
        return res
            .status(400)
            .send({ status: false, message: `email: ${email} already exist` });
    }
    //validation of password
    if (!isValid(password)) {
        return res
            .status(400)
            .send({ status: false, message: "password is required" });
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/.test(password)) {
        return res
            .status(400)
            .send({ status: false, message: "Password must contain 8 to 15 characters and have at least one number, one unique character, one Capital letter and one small letter " });
    }
//validAtion of address 
if (address) {

    if (!isValid(address.street)) {
        return res
            .status(400)
            .send({ status: false, message: "invalid street" })
    }

    if (!isValid(address.city) || !isNameValid(address.city)) {
        return res
            .status(400)
            .send({ status: false, message: "invalid city" });
    }

    if (! /^\+?([1-9]{1})\)?([0-9]{5})$/.test(address.pincode)) {
        return res
            .status(400)
            .send({ status: false, message: "invalid pin" })
    }

}
const userData = await UserModel.create(req.body)
return res.status(201).send({ status: true, data: userData })
}
 catch (err) {
    return res.status(500).send({ status: false, message: err.message });
}

}
const isValidIdType = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
  }
//get user by id
const getUserById = async function (req, res) {

  try {

    let userId = req.params.userId
    //if (!isValidIdType(userId)) { return res.status(400).send({ status: false, message: "please give valid userId" }) }
    let findUser = await UserModel.findOne({ _id: userId, isDeleted: false })
    if (!findUser) { return res.status(404).send({ status: false, message: "No user found" }) }


    res.status(200).send({ status: true, message: 'user list', data: findUser })

  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message });

  }
};
//update user
const updateUser = async function (req, res) {
    try {
      let userId = req.params.userId
      
      let queryParams = req.query
  
  
      const isEmailnotUnique = await UserModel.findOne({ email: queryParams.email, isDeleted: false })
  
      
  
        if (isEmailnotUnique) { return res.status(400).send({ status: false, message: `email already exist` }) }
             
  
        const isUniquePhonenot = await UserModel.findOne({ phone: queryParams.phone, isDeleted: false })
  
        if (isUniquePhonenot) { return res.status(400).send({ status: false, message: "phone already exist" }) }
      
  
  
      const userUpdted = await UserModel.findOneAndUpdate({ _id: userId, isDeleted: false }, { $set: { email:queryParams.email,phone:queryParams.phone, updatedAt: Date.now() } }, { new: true })
      if (!userUpdted) return res.status(400).send({ status: false, message: "user are already deleted" })
      return res.status(200).send({ status: true, data: userUpdted })
}
    catch (err) {
      return res.status(500).send({ status: false, message: err.message })
    }
}
//delete user 
const deleteuserbyid = async function (req, res) {
    try {
      let userId = req.params.userId;
      let deletedata = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true }
      );
      res.status(200).send({ status: true, message: "SuccessFully Deleted" });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  }

  module.exports.createuser=createuser
  module.exports.getUserById=getUserById
  module.exports.updateUser=updateUser
  module.exports.deleteuserbyid=deleteuserbyid