
const mongoose = require('mongoose');

const Nfts = mongoose.model('Nfts', new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
       
    },
    emailId: {
        type: String,
        required: true
    },
    practice: {
        type: String,
        required: true
    },
    circle: {
        type: String,
        required: true
    },
    masteryLevel: {
        type: String,
        required: true
    },
    nftURL: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String
    },
    docType: {
        type: String,
        required: true
    },
    nftId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    }
    
}));


exports.Nfts = Nfts;
