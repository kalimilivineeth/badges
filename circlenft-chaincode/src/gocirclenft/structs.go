package main

type nftobject struct {
	NFTOwner    string `json:"nftOwner"`
	FNAME       string `json:"fName"`
	LNAME       string `json:"lName"`
	Practice  string `json:"practice"`
	Circle  string `json:"circle"`
	MasteryLevel  string `json:"masteryLevel"`
	ExpiryDate  string `json:"expiryDate"`
	EmailId     string `json:"emailId"`
	NftURL      string `json:"nftURL"`
	DocType     string `json:"docType"`
	NftId       string `json:"nftId"`
	NftStatus   string `json:"nftStatus"`
	Name        string `json:"name"`
	Symbol      string `json:"symbol"`
	Owner       string `json:"owner"`
	TimeStamp   string `json:"timeStamp"`
}

// ExpireNft - Asset using for transferring an NFT (Inventory)
type ExpireNft struct {
	NftId            string `json:"nftId"`
	TimeStamp        string `json:"timeStamp"`
}
