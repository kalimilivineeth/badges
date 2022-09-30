const constants = require('../constants');
const dateUtil = require('../helpers/date-helper');
const util = require('../helpers/util');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const dataModels = {

    nftOnchainStruct: (payload, username, aesKey) => {

        let struct = {
            nftOwner: payload.userName,
            fName: payload.fName,
            lName: payload.lName,
            practice: payload.practice,
            circle: payload.circle,
            masteryLevel: payload.masteryLevel,
            expiryDate: payload.expiryDate,
            emailId: payload.emailId,
            nftURL: payload.url,
            docType: "NFT",
            nftId: uuidv4().toString(),
            name: "CIRCLE NFT",
            symbol: "CIRNFT",
            owner: username,
            timeStamp: dateUtil.getTimestamp()
        };

        return struct;
    },

    expireNftOnchainStruct: (nftId, username) => {
        // generate random AES key for the new nft
        let newAESKey = crypto.randomBytes(32).toString('base64');

        let struct = {
            nftId: nftId,
            timeStamp: dateUtil.getYesterdayTimestamp()
        }

        return struct;
    },

}

module.exports = dataModels;
