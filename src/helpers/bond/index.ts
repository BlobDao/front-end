import { Networks } from "../../constants/blockchain";
import { LPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import MimIcon from "../../assets/tokens/MIM.svg";


// import CurveIcon from "../../assets/tokens/CURVE.svg";
import MimBlobIcon from "../../assets/tokens/BLOB-DAI.png";
import MaticBlobIcon from "../../assets/tokens/BLOB-MATIC.svg";
import WmaticIcon from "../../assets/tokens/matic-logo.svg";
import maticIcon from "../../assets/tokens/polygon-matic-logo.png";
// import GohmIcon from "../../assets/tokens/GOHM.svg";

import { getAddresses } from "src/constants";

import { StableBondContract, LpBondContract, WmaticBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const mim = new StableBond({
    name: "mim",
    displayName: "MIM",
    bondToken: "MIM",
    bondIconSvg: MimIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.MATIC]: {
            bondAddress: "0x0000000000000000000000000000000000000000", //bond address
            reserveAddress: "0x0000000000000000000000000000000000000000", //token address
        },
    },
});

export const wmatic = new CustomBond({
    name: "",
    displayName: "WMATIC",
    bondToken: "WMATIC",
    bondIconSvg: WmaticIcon,
    bondContractABI: WmaticBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.MATIC]: {
            bondAddress: "0x0000000000000000000000000000000000000000", //bond address
            reserveAddress: "0x0000000000000000000000000000000000000000", //token address
        },
    },
});

// export const crv = new StableBond({
//     name: "crv",
//     displayName: "CRV",
//     bondToken: "CRV",
//     bondIconSvg: CurveIcon,
//     bondContractABI: StableBondContract,
//     reserveContractAbi: StableReserveContract,
//     networkAddrs: {
//         [Networks.MATIC]: {
//             bondAddress: "0x0000000000000000000000000000000000000000", //bond address
//             reserveAddress: "0x0000000000000000000000000000000000000000", //token address
//         },
//     },
// });

// export const gOhm = new StableBond({
//     name: "gOhm",
//     displayName: "gOHM",
//     bondToken: "gOHM",
//     bondIconSvg: GohmIcon,
//     bondContractABI: StableBondContract,
//     reserveContractAbi: StableReserveContract,
//     networkAddrs: {
//         [Networks.MATIC]: {
//             bondAddress: "0x0000000000000000000000000000000000000000", //bond address
//             reserveAddress: "0x0000000000000000000000000000000000000000", //token address
//         },
//     },
// });

// export const mimBlob = new LPBond({
//     name: "dai_blob_slp",
//     displayName: "BLOB-DAI SLP",
//     bondToken: "MIM",
//     bondIconSvg: MimBlobIcon,
//     bondContractABI: LpBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.MATIC]: {
//             bondAddress: "0xB0b36f950Be625efF3D4ad32a33BB9b6401DB850",
//             reserveAddress: "0xf0147961a01c8db17c1e610b82a8568c8f79a930",
//         },
//     },
//     lpUrl: "https://app.sushi.com/add/" + mim.getAddressForReserve(Networks.MATIC) + "/" + getAddresses(Networks.MATIC).BLOB_ADDRESS,
// });

// export default [mim, wmatic, mimBlob];
// export default [wmatic, mimBlob];
export default [mim];