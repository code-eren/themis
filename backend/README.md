# Themis backend

## campaign-manager

`npx ts-node index.ts` starts the campaign-manager server which manages campaign deployed and serve to frontend

## data-provider

`npx ts-node cronjob.ts` starts the cronjob that periodically fetch and process data from data sources,
and send to campaign-manager

TODOs:
- [ ] add more data provider to increase decentralization

## score-ea

`node index.js` starts external adapter that serves data through bridge from chainlink job 

TODOs: 
- [ ] add multiple data sources and external adapters
- [ ] migrate to typescript if possible

## chainlink-node

`sudo dockerd` to start the docker daemon if it's not already running

`sudo service postgresql restart` to restart the postgre db if it's not already running

Follow the tutorial to [run a chainlink-node](https://docs.chain.link/docs/running-a-chainlink-node/)

Example of command to run the node locally after env setup:
`cd ~/.chainlink-kovan && docker run -p 6688:6688 -v ~/.chainlink-kovan:/chainlink -it --env-file=.env --network host smartcontract/chainlink:1.0.0 local n`

## [WIP] keeper-registry
Run google-chrome locally `google-chrome --remote-debugging-port=9222 --user-data-dir="~/ChromeProfile"`, install metamask and setup your wallet that you want to use to be the admin for registering the keepers

`python3 register.py`

TODOs:
- [ ] connect with typescript using either python-shell or server-client
- [ ] figure out why transferAndCall on link doesn't work...
- [ ] figure out why sometimes google-chrome crashs when start


## db
`sqlite3` to enter sqlite3 cli

Connect to the db `sqlite> .open ./backend/themis.db`