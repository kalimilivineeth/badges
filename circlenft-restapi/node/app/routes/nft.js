const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('index');
const nftCtrl = require('../controllers/nftCtrl');
const config = require('config');
logger.level = config.logLevel;

//For Issuer/Admin
router.post('/issueNft', nftCtrl.issueNft);
router.get('/retrieveAllNfts', nftCtrl.retrieveAllNfts);
router.post('/expireNft', nftCtrl.expireNft);
router.get('/history/:nftId', nftCtrl.getNftHistory);

//For NFT User
router.get('/getNftsByUser/:userName', nftCtrl.getNftsByUser);
router.get('/getNftById/:nftId', nftCtrl.getNftById);


//For External User
router.post('/validateNft', nftCtrl.validateNft);


//mandatary to export
module.exports = router;
