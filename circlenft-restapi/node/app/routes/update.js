const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const { hashPassword } = require('../helpers/util');
const router = express.Router();
var { Validator } = require('node-input-validator');



router.post('/', async (req, res) => {
    
    const v = new Validator(req.body, {
        userName: 'required',
        old_password: 'required',
        new_password: 'required',
        confirm_password: 'required|same:new_password'
    });

    const matched = await v.check();

    if (!matched) {
        return res.send(v.errors);
    }

    //  Now find the user by their userName 
    let user = await User.findOne({ userName: req.body.userName });
    
    if (!user) {
        return res.status(400).send('Incorrect userName');
    }

    if (user) {

        // Then validate the Credentials in MongoDB match
        // those provided in the request
        const validPassword = await bcrypt.compare(req.body.old_password, user.password);

        if (req.body.old_password === req.body.new_password) {
            res.send("old password and new password can't be same");
        }

        else if (!validPassword) {
            return res.status(400).send('Incorrect password.');
        } else {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(req.body.new_password, salt);
            
            // console.log(user.password, hashedPassword);

            // var lastUpdated = new Date(user.lastUpdated);
            // console.log(lastUpdated);
            var currentTime = new Date();
            console.log(currentTime);
            // var expireTime = new Date();
            // expireTime.setTime(currentTime.getTime() - (((24*30)*60) * 60 * 1000));
            // // console.log(expireTime);
        
            if (user.passwordAllocatedBy == false){
                
                // var lastUpdated = new Date(user.lastUpdated);
                // console.log(lastUpdated);
                // var currentTime = new Date();
                // console.log(currentTime);
                // var expireTime = new Date();
                // expireTime.setTime(currentTime.getTime() + (((24*30)*60) * 60 * 1000));
                // // console.log(expireTime);
                // //if (lastUpdated <= expireTime){
                await User.updateOne({_id: user._id}, { password: hashedPassword});
                await User.updateOne({_id: user._id}, {passwordAllocatedBy: true});
                await User.updateOne({_id: user._id}, {lastUpdated: currentTime});

                return res.send ('password successfully updated!');
                //}
                /*else{
                    // res.send('Account is locked please contact the admin');
                    await User.updateOne({_id: user._id}, { password: hashedPassword});
                    return res.send ('password successfully updated!!');
                } */
            } else {
                await User.updateOne({_id: user._id}, { password: hashedPassword});
                await User.updateOne({_id: user._id}, {lastUpdated: currentTime});
                return res.send ('password successfully updated');
            }
            
    }
}
});

module.exports = router; 

