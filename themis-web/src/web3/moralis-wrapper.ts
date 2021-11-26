import { useWeb3ExecuteFunction } from "react-moralis";

export class Contract {
    abi: Object;
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