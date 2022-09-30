# bring down the current network
./network.sh down

# Pull the images
./bootstrap.sh 2.2.3 1.5.1

# bring up the network
./network.sh up -ca -s couchdb

# create the defaultchannel
./network.sh createChannel -c defaultchannel -p DefaultChannel

# package and install 'nftchaincode' chaincode on org1 nodes
./network.sh deployCC -ccn nftchaincode -ccp ../../../circlenft-chaincode/src/gocirclenft -ccl go -ccsd true

# deploy 'nftchaincode' chaincode on 'defaultchannel'
./network.sh deployCC -c defaultchannel -ccn nftchaincode -ccp ../../../circlenft-chaincode/src/gocirclenft -ccl go -cci Init -ccsp true
