const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their userName 
    let user = await User.findOne({ userName: req.body.userName });
    if (!user) {
        return res.status(400).send('Incorrect username or password.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect username or password.');
    }

    var lastUpdated = new Date(user.lastUpdated);
    console.log("last Updated", lastUpdated);                           
    var currentTime = new Date();                                             
    console.log("current time", currentTime);
    var expireTime = new Date(user.lastUpdated);                                               
    expireTime.setDate(lastUpdated.getDate() + 30);    
    console.log("expire Time", expireTime);
    
    if ((user.passwordAllocatedBy === false) && (currentTime <= expireTime) ) {
        res.send('Successfully LoggedIn, Please Update The Password');
    } else if (currentTime > expireTime) {
        res.send('Password Expired, Please Update The Password');
    } else  {
        // localDate = new Date(user.lastUpdated).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})
        // console.log(localDate);
        // console.log(typeof(user.passwordAllocatedBy))
        res.send('Successfully LoggedIn');
    }

});

function validate(req) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = router; 