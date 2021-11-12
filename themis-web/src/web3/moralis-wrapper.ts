import { useWeb3ExecuteFunction } from "react-moralis";

export class Contract {
    abi: Object;
    contractAddress: string;
    constructor (abi: Object, contractAddress: string) {
        this.abi = abi;
        this.contractAddress = contractAddress;
    }

    useFunction(functionName: string, params?: Record<string, unknown>) {
        return useWeb3ExecuteFunction({
            abi: this.abi,
            contractAddress: this.contractAddress,
            functionName,
            params
        });
    }
}