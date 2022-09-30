package main

import (
	"crypto/sha256"
	"encoding/hex"
	"strings"


	"cycoreutils"
	"fmt"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/pkg/errors"
	logger "github.com/sirupsen/logrus"
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Record NFT to the ledger. This is equivalent to Mint
////////////////////////////////////////////////////////////////////////////////////////////////////////////
func issueNftChaincode(stub shim.ChaincodeStubInterface, args []string) cycoreutils.Response {
	var err error
	var collectionName string
	var Avalbytes []byte
	var NftObject = &nftobject{}

	// Convert the arg to a NFT object
	logger.Info("issueNftChaincode() : Arguments for issueNftChaincode : ", args[0])
	err = cycoreutils.JSONtoObject([]byte(args[0]), NftObject)

	if err != nil {
		return cycoreutils.ConstructResponse("SASTQRY008E", fmt.Sprintf("Failed to convert arguments to a NFT object"), nil)
	}

	NftObject.NftId = createId(NftObject.NftId)

	// Query and Retrieve the NFT
	keys := []string{NftObject.NftId}
	logger.Debug("Keys for NFT %s: ", keys)

	collectionName = ""

	Avalbytes, err = cycoreutils.QueryObject(stub, NftObject.DocType, keys, collectionName)

	if err != nil {
		return cycoreutils.ConstructResponse("SASTQRY003E", (errors.Wrapf(err, "Failed to query NFT object")).Error(), nil)
	}

	if Avalbytes != nil {
		return cycoreutils.ConstructResponse("SASTQRY008E", fmt.Sprintf("NFT already exists"), nil)
	}

	// initialize the status of NFT
	NftObject.NftStatus = ISSUED

	NftObjectBytes, _ := cycoreutils.ObjecttoJSON(NftObject)
	//err = cycoreutils.UpdateObject(stub, NftObject.DocType, keys, NftObjectBytes, collectionName)
	err = cycoreutils.UpdateObject(stub, "NFT", keys, NftObjectBytes, collectionName)

	if err != nil {
		logger.Errorf("issueNftChaincode() : Error inserting NFT object into LedgerState %s", err)
		return cycoreutils.ConstructResponse("SASTUPD009E", (errors.Wrapf(err, "NFT object update failed")).Error(), nil)
	}

	return cycoreutils.ConstructResponse("SASTREC011S", fmt.Sprintf("Successfully Recorded NFT object"), NftObjectBytes)
}


////////////////////////////////////////////////////////////////////
// Update the NFT to expire. Update it's NFTStatus and Expiry Date
////////////////////////////////////////////////////////////////////
func expireNftChaincode(stub shim.ChaincodeStubInterface, args []string) cycoreutils.Response {
	logger.Debug("Arguments for expireNft : %s", args[0])

	ExpireNft := &ExpireNft{}
	err := cycoreutils.JSONtoObject([]byte(args[0]), ExpireNft)

	if err != nil {
		return cycoreutils.ConstructResponse("SASTCONV002E", (errors.Wrapf(err, "Failed to convert arguments to a ExpireNft object")).Error(), nil)
	}

	collectionName := ""

	// Check if NFT exists
	NftBytes, err := cycoreutils.QueryObject(stub, NFT, []string{ExpireNft.NftId}, collectionName)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTQRY003E", (errors.Wrapf(err, "Failed to query if NFT exists")).Error(), nil)
	}
	if NftBytes == nil {
		return cycoreutils.ConstructResponse("SASTDNE004E", fmt.Sprintf("NFT does not exist"), nil)
	}

	NftObject := &nftobject{}
	err = cycoreutils.JSONtoObject(NftBytes, NftObject)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTCONV002E", fmt.Sprintf("NFT object unmarshalling failed"), nil)
	}

	if NftObject.NftStatus == EXPIRED {
		return cycoreutils.ConstructResponse("SASTQRY008E", fmt.Sprintf("NFT already expired"), nil)
	}

	NftObject.NftStatus = EXPIRED
	NftObject.ExpiryDate = ExpireNft.TimeStamp

	NftBytes, err = cycoreutils.ObjecttoJSON(NftObject)
	err = cycoreutils.UpdateObject(stub, NFT, []string{NftObject.NftId}, NftBytes, collectionName)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTUPD009E", fmt.Sprintf("Unable to expire NFT"), nil)
	}

	return cycoreutils.ConstructResponse("SASTUPD010S", fmt.Sprintf("Successfully expired Nft"), NftBytes)
}

//////////////////////////////////////////////////////////////
/// Query Nft Info from the ledger against a NFT Id
//////////////////////////////////////////////////////////////
func getNftByIdChaincode(stub shim.ChaincodeStubInterface, args []string) cycoreutils.Response {

	var err error
	var Avalbytes []byte
	var collectionName string
	var NftObject = &nftobject{}

	// In future , it should be > 1 and ,= mo_of_keys for object
	if len(args) != 1 {
		return cycoreutils.ConstructResponse("SUSRPARM001E", fmt.Sprintf("Expecting NFT ID}. Received %d arguments", len(args)), nil)
	}

	NftObject.DocType = "NFT"

	err = cycoreutils.JSONtoObject([]byte(args[0]), NftObject)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTCONV002E", (errors.Wrap(err, "Failed to convert arg[0] to NftObject object")).Error(), nil)
	}

	// Query and Retrieve the Full NftObject
	keys := []string{NftObject.NftId}
	logger.Info("Keys for NFT : ", keys)

	collectionName = ""

	Avalbytes, err = cycoreutils.QueryObject(stub, NftObject.DocType, keys, collectionName)

	if err != nil {
		cycoreutils.ConstructResponse("SASTQRY003E", (errors.Wrapf(err, "Failed to query NFT object")).Error(), nil)
	}

	if Avalbytes == nil {
		return cycoreutils.ConstructResponse("SASTDNE004E", fmt.Sprintf("NFT not found"), nil)
	}

	err = cycoreutils.JSONtoObject(Avalbytes, NftObject)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTCONV002E", (errors.Wrapf(err, "Failed to convert query result to NFT object")).Error(), nil)
	}

	logger.Info("getNftByIdChaincode() : Returning NFT results")

	return cycoreutils.ConstructResponse("SASTQRY005S", fmt.Sprintf("Successfully Queried NFT object"), Avalbytes)
}


//////////////////////////////////////////////////////////////
/// Query NFT History from the ledger
//////////////////////////////////////////////////////////////
func queryNftHistoryChaincode(stub shim.ChaincodeStubInterface, args []string) cycoreutils.Response {
	var err error
	var Avalbytes []byte
	var NftObject = &nftobject{}

	if len(args) != 1 {
		return cycoreutils.ConstructResponse("SUSRPARM001E", fmt.Sprintf("Expecting NFT ID}. Received %d arguments", len(args)), nil)
	}

	err = cycoreutils.JSONtoObject([]byte(args[0]), NftObject)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTCONV002E", (errors.Wrapf(err, "Failed to convert arg[0] to NFT object")).Error(), nil)
	}

	// Query and Retrieve the Full NFT
	keys := []string{NftObject.NftId}
	logger.Info("Keys for NFT : ", keys)

	Avalbytes, err = cycoreutils.GetObjectHistory(stub, "NFT", keys)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTQRY003E", (errors.Wrapf(err, "Failed to query NFT object history")).Error(), nil)
	}
	if Avalbytes == nil {
		return cycoreutils.ConstructResponse("SASTDNE004E", fmt.Sprintf("NFT object not found"), nil)
	}

	return cycoreutils.ConstructResponse("SASTQRY014S", fmt.Sprintf("Successfully Queried NFT object History"), Avalbytes)
}

//////////////////////////////////////////////////////////////
/// Query All NFTs from the ledger
//////////////////////////////////////////////////////////////
func getAllNftsChaincode(stub shim.ChaincodeStubInterface, args []string) cycoreutils.Response {

	var collectionName string
	collectionName = ""

	queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"NFT\"}}")
	logger.Info("Query List: queryString: ", queryString)

	queryResults, err := cycoreutils.GetQueryResultForQueryString(stub, queryString, collectionName)
	if err != nil {
		return cycoreutils.ConstructResponse("SASTQRY006E", (errors.Wrapf(err, "Failed to query NFT object list")).Error(), nil)
	}

	if queryResults == nil {
		return cycoreutils.ConstructResponse("SASTDNE004E", fmt.Sprintf("No Nfts found"), nil)
	}

	return cycoreutils.ConstructResponse("SASTQRY007S", fmt.Sprintf("Successfully Retrieved the list of NFT objects "), queryResults)
}

func createId(uuId string) string {
	s := []string{uuId}
	h := sha256.New()
	h.Write([]byte(strings.Join(s, "")))
	hash_hex := hex.EncodeToString(h.Sum(nil))
	nftId := hash_hex[len(hash_hex)-20:]

	return nftId
}
