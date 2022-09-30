const config = require('config');
const helper = require('../helpers/fabric-helper');
const util = require('../helpers/util');
const mime = require('mime-types');
const dateUtil = require('../helpers/date-helper');
const crypto = require('crypto');
const path = require('path');
const { parseOnchainData } = require('../helpers/onchainDataParser');
const objectBuilder = require('../object-builders');
const images = require("images");
const { Nfts } = require('../models/nfts');
const log4js = require('log4js');
const logger = log4js.getLogger('nftService');
logger.level = config.logLevel;

  // **** helper functions ****
  function groupNftsByNftId(onchainNfts) {
      return onchainNfts.reduce((groups, nft) => {
          const group = (groups[nft.nftId] || []);
          group.push(nft);
          groups[nft.nftId] = group;
          return groups;
      }, {});
  }

  class Nft {

    // issue NFT along with metadata
    async issueNftService(payload) {
        try {
            let nftObj = objectBuilder.nftOnchainStruct(payload, "admin");

            let payloadForOnchain = [];
            payloadForOnchain.push(JSON.stringify(nftObj));
            logger.info("Reached NFT service invoke smart contract");

            let onchainResponse = await helper.invokeTransaction(config.channelName, config.chaincodeName, payloadForOnchain, "issueNftChaincode", "admin", "org1");
            logger.info("Reached NFT service smart contract invoked, nft: ", nftObj);
              
            let onchainNfts = parseOnchainData(onchainResponse);
            let nfts = new Nfts({

                userName: onchainNfts.nftOwner,

                fName: onchainNfts.fName,

                lName: onchainNfts.lName,

                practice: onchainNfts.practice,

                circle: onchainNfts.circle,

                masteryLevel: onchainNfts.masteryLevel,

                expiryDate: onchainNfts.expiryDate,

                emailId: onchainNfts.emailId,

                nftURL: onchainNfts.nftURL,

                docType: onchainNfts.docType,

                nftId: onchainNfts.nftId,

                name: onchainNfts.name,

                symbol: onchainNfts.symbol,

                owner: onchainNfts.owner,

                timeStamp: onchainNfts.timeStamp

            });

            await nfts.save();
            let jsonResponse = {};
            jsonResponse.result =nfts;
            return jsonResponse;

        } catch (error) {
            throw error;
        }
    }



    // get all the NFTs
    async getAllNftsService() {
        try {
            let payloadForOnchain = [];
            let onchainResponse = await helper.queryChaincode(config.channelName, config.chaincodeName, payloadForOnchain, "getAllNftsChaincode", "admin", "org1");
            let onchainNfts = parseOnchainData(onchainResponse);
            if (onchainNfts) {
                return onchainNfts;
            } else {
                return [];
            };
        } catch (error) {
            throw error;
        }
    }


    // get all the NFTs owned by a user
    async getNftsByUserService(userName) {
        try {
            let payloadForOnchain = [];

            let onchainResponse = await helper.queryChaincode(config.channelName, config.chaincodeName, payloadForOnchain, "getAllNftsChaincode", "admin", "org1");
            let onchainNfts = parseOnchainData(onchainResponse);
            if (onchainNfts) {
                let jsonResponse = [];
                // group all nfts by nftId
                const groups = groupNftsByNftId(onchainNfts);

                let nfts = Object.keys(groups);
                for (let i = 0; i < nfts.length; i++) {

                  if (onchainNfts[i].nftOwner == userName) {
                    jsonResponse.push(onchainNfts[i])
                  }

                }
                return jsonResponse;
            } else {
                return [];
            };
        } catch (error) {
            throw error;
        }
    }

    // get an NFT by NftId
    async getNftByIdService(nftId) {
        try {
            let payloadForOnchain = [];
            let nft = { nftId: nftId };
            payloadForOnchain.push(JSON.stringify(nft));

            let onchainResponse = await helper.queryChaincode(config.channelName, config.chaincodeName, payloadForOnchain, "getNftByIdChaincode", "admin", "org1");
            let onchainNft = parseOnchainData(onchainResponse);
            if (onchainNft) {

                // send item object and nft object as the response
                let jsonResponse = {};
                jsonResponse.nft = onchainNft;

                return jsonResponse;
            };
        } catch (error) {
            throw error;
        }
    }

    // validate an NFT by NftId
    async validateNftService(payload) {
      try {
          let payloadForOnchain = [];
          let nft = { nftId: payload.nftId };
          payloadForOnchain.push(JSON.stringify(nft));

          let onchainResponse = await helper.queryChaincode(config.channelName, config.chaincodeName, payloadForOnchain, "getNftByIdChaincode", "admin", "org1");
          let onchainNft = parseOnchainData(onchainResponse);
          if (onchainNft) {
              let jsonResponse = {};
              jsonResponse.result = "invalid";

              if (onchainNft.nftOwner == payload.userName
                && onchainNft.fName == payload.fName
                && onchainNft.lName == payload.lName
                && onchainNft.practice == payload.practice
                && onchainNft.circle == payload.circle
                && onchainNft.masteryLevel == payload.masteryLevel
                && onchainNft.expiryDate == ""
                && onchainNft.emailId == payload.emailId
                && onchainNft.nftURL == payload.url
                && onchainNft.nftStatus == "ISSUED"
              ) {
                jsonResponse.result = "valid";
              }

              return jsonResponse;
          };
      } catch (error) {
          throw error;
      }

    }

    // get the history of an NFT
    async getNftHistoryService(nftId) {
        try {
            logger.info("Reached NFT getNftHistory 1. nftId: ", nftId);

            let payloadForOnchain = [];
            let nft = { nftId: nftId };
            payloadForOnchain.push(JSON.stringify(nft));

            let onchainResponse = await helper.queryChaincode(config.channelName, config.chaincodeName, payloadForOnchain, "queryNftHistoryChaincode", "admin", "org1");
            let onchainNft = parseOnchainData(onchainResponse);
            let jsonResponse = {};
            jsonResponse.nft = onchainNft;
            
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    }

    // expire the NFT with nftId
    async expireNftService(payload) {
        try {
            let expireNftObj = objectBuilder.expireNftOnchainStruct(payload.nftId, "admin");
            let payloadForOnchain = [];
            payloadForOnchain.push(JSON.stringify(expireNftObj));

            let onchainResponse = await helper.invokeTransaction(config.channelName, config.chaincodeName, payloadForOnchain, "expireNftChaincode", "admin", "org1");
            let onchainNft = parseOnchainData(onchainResponse);
            logger.info("Reached expireNFT, onchainNft: ", onchainNft);
            let jsonResponse = {};
            jsonResponse.result = "success";
            await Nfts.remove({nftId: onchainNft.nftId});
            return jsonResponse;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Nft;
