#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

#make sure to run to fork the blockchain to local 
#ganache-cli --fork https://eth-mainnet.alchemyapi.io/v2/TMiqUT40lVJHOR8ptTjBbqN5I7uHn-7I -e 70000

#it will compile all contracts, and deploy to local network
truffle migrate --network development

