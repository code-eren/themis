import { useWeb3ExecuteFunction } from "react-moralis";
import axios from 'axios';

const etherscanKovanUrl = "https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=";

export class Contract {
    abi: any;
    contractAddress: string;
    constructor (abi: Object, contractAddress: string) {
        this.abi = abi;
        this.contractAddress = contractAddress;
    }

    metadata() {
        return {
            abi: this.abi,
            contractAddress: this.contractAddress
        };
    }
}