import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
// import { mimBlob } from "../helpers/bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    // const mimBlobAddress = mimBlob.getAddressForReserve(networkID);
    // const pairContract = new ethers.Contract(mimBlobAddress, LpReserveContract, provider);
    // const reserves = await pairContract.getReserves();
    // const marketPrice = reserves[0] / reserves[1]; //TODO
    // return marketPrice;
    return 0 //TODO CHANGEEEEEEE
} 
