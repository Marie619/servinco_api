let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let bodyParser = require("body-parser");
let userModel = require("./userModel");
let baseDbUrl = require("../../utils/constants");


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

let User = mongoose.model('User', userModel);

let url = baseDbUrl;



router.post('/signup', function (req, res, next) {

    let userData = req.body;


    let incomingUser = makeNewUser(userData);

    mongoose.connect(url, {useNewUrlParser: true}, function (err) {

        if (err) throw err;

        console.log('Successfully connected');


        incomingUser.save(function (err) {
            if (err) {
                res.json({success: err.toString(), status: 404});
                // res.json({success: "something went wrong retry", status: 405});
            } else {
                console.log('User successfully saved.');
                res.json({success: "User successfully saved.", status: 200});
            }


        });

        // mongoose.disconnect();

    });


});


router.post('/signin', function (req, res, next) {

    let userData = req.body;


    mongoose.connect(url, {useNewUrlParser: true}, function (err) {

        if (err) throw err;

        console.log('Successfully connected for loggin in==> ');

        mongoose.model('users',userModel);

        mongoose.model('users').find(
            { user_email: userData.user_email, user_password: userData.user_password},
            function (err, docs) {
                if (err) {
                    res.json({success: err.toString(), status: 404});
                } else {
                    console.log(docs);
                    if(docs.length>0){
                        res.status(200).json({status:200,data:docs[0]});
                    }else{
                        res.status(200).json({status:404,data:'password or email is wrong'});
                    }

                }

            });



    });


});








function makeNewUser(userData) {

    return new User({

        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: userData.user_first_name,
            lastName: userData.user_last_name,
        },
        user_type: userData.user_type,
        user_gender: userData.user_gender,
        user_email: userData.user_email,
        user_npi: userData.user_npi,
        user_tax_id: userData.user_tax_id,
        user_mobile: userData.user_mobile,
        user_password: userData.user_password,
        user_dob: userData.user_dob,

    });
}


module.exports = router;
