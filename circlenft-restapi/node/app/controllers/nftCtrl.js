const nftCtrl = {}; //controller object

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('config');
const {errorResponse} = require('../object-builders/client-response-builder');
const NftService = require('../services/nft.service');

const log4js = require('log4js');
const logger = log4js.getLogger('nftCtrl');
logger.level = config.logLevel;

router.use(bodyParser.urlencoded({ extended: true }));


nftCtrl.issueNft = async function (req, res) {
    logger.info(">>> inside nftCtrl.issueNft() ...");
    res.set('Content-Type', 'application/json');
    try {
        let nftService = new NftService();
        logger.info("req.body: ", req.body);
        let response = await nftService.issueNftService(req.body);
        return res.status(200).send(response);
    } catch (error) {
        logger.error(error);
        return res.status(401).send(errorResponse.format(error.message));
        
    }
}

nftCtrl.retrieveAllNfts = async function (req, res) {
    logger.debug(">>> inside nftCtrl.retrieveAllNfts() ...");
    res.set('Content-Type', 'application/json');
    try {
        let nftService = new NftService();
        let response = await nftService.getAllNftsService();
        return res.status(200).send(response);
    } catch (error) {
        logger.error(error);
        return res.status(401).send(errorResponse.format(error.message));
    }
}

nftCtrl.getNftsByUser = async function (req, res) {
    logger.debug(">>> inside nftCtrl.getNFTsByUser() ...");
    res.set('Content-Type', 'application/json');
    try {
        let nftService = new NftService();
        let response = await nftService.getNftsByUserService(req.params.userName);
        return res.status(200).send(response);
    } catch (error) {
        logger.error(error);
        return res.status(401).send(errorResponse.format(error.message));
    }
}

nftCtrl.getNftById = async function (req, res) {
    logger.debug(">>> inside nftCtrl.getNftById() ...");
    res.set('Content-Type', 'application/json');
    try {
        let nftService = new NftService();
        logger.info("req.params.nftId: " + req.params.nftId);
        let response = await nftService.getNftByIdService(req.params.nftId);
        return res.status(200).send(response);
    } catch (error) {
        logger.error(error);
        return res.status(401).send(errorResponse.format(error.message));
    }
}

nftCtrl.validateNft = async function (req, res) {
    logger.info(">>> inside nftCtrl.validateNft() ...");
    res.set('Content-Type', 'application/json');
    try {
        let nftService = new NftService();
        logger.info("req.body: ", req.body);
        let response = await nftService.validateNftService(req.body);
        return res.status(200).send(response);
    } catch (error) {
        logger.error(error);
        return res.status(401).send(errorResponse.format(error.message));
    }
}

nftCtrl.getNftHistory = async function (req, res) {
    logger.debug(">>> inside nftCtrl.getNftHistory() ...");
    res.set('Content-Type', 'application/json');
    try {
        let nftService = new NftService();
        let response = await nftService.getNftHistoryService(req.params.nftId);
        return res.status(200).send(response);
    } catch (error) {
        logger.error(error);
        return res.status(401).send(errorResponse.format(error.message));
    }
}

nftCtrl.expireNft = async function (req, res) {
    logger.debug(">>> inside nftCtrl.expireNFT() ...");
    res.set('Content-Type', 'application/json');
    try {
        let nftService = new NftService();
        logger.info("req.params.nftId: " + req.params.nftId);
        let response = await nftService.expireNftService(req.body);
        return res.status(200).send(response);
    } catch (error) {
        logger.error(error);
        return res.status(401).send(errorResponse.format(error.message));
    }
}
//mandatary to export
module.exports = nftCtrl
