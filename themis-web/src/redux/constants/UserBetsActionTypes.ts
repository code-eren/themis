export enum UserBetsActionTypes {
    ADD_BET = "ADD_BET",
    REFRESH = "REFRESH",
    // claim is null if you cannot claim it yet
    // it is true if you have already claim it
    // it is false if you have 
    SET_CLAIMABLE = "SET_CLAIMABLE"
}