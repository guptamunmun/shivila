const express = require('express');
const router = express.Router();
const UseControlller = require("../controllers/UseControlller")


router.post("/register",UseControlller.createuser)
router.get("/getuserdetails/:userId",UseControlller.getUserById)
router.put("/:userId",UseControlller.updateUser)
router.delete("/delete/:userId",UseControlller.deleteuserbyid)

module.exports = router;