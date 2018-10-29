var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var userModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    user_type: String,
    user_gender: String,
    user_email: {type:String,index: true, unique: true, required: true },
    user_npi: String,
    user_tax_id: String,
    user_mobile: String,
    user_password: String,
    user_dob: String,
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
userModel.plugin(uniqueValidator);




module.exports = userModel;