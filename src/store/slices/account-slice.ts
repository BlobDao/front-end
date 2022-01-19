import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { BlobTokenContract, MemoTokenContract, MimTokenContract, PresaleContract, WhitelistContract } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        sBlob: string;
        blob: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);
    var sBlobBalance = 0;
    var blobBalance = 0;

    try{
    const sBlobContract = new ethers.Contract(addresses.sBLOB_ADDRESS, MemoTokenContract, provider);
    sBlobBalance = await sBlobContract.balanceOf(address);

    const blobContract = new ethers.Contract(addresses.BLOB_ADDRESS, BlobTokenContract, provider);
    blobBalance = await blobContract.balanceOf(address);
    }catch(error){

    }
    return {
        balances: {
            sBlob: ethers.utils.formatUnits(sBlobBalance, "gwei"),
            blob: ethers.utils.formatUnits(blobBalance, "gwei"),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        blob: string;
        sBlob: string;
    };
    staking: {
        blob: number;
        sBlob: number;
    };
    presale: {
        deposited: number;
        claimable: number;
        weiRaised: number;
        presaleEnd: Date;
        whitelisted: boolean;
    };
    redeem: {
        pBlobBalance: string;
        redeemAllowance: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let blobBalance = 0;
    let sBlobBalance = 0;
    let pBlobBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;
    let redeemAllowance = 0;

    const addresses = getAddresses(networkID);

    try {
        if (addresses.BLOB_ADDRESS) {
            const blobContract = new ethers.Contract(addresses.BLOB_ADDRESS, BlobTokenContract, provider);
            blobBalance = await blobContract.balanceOf(address);
            stakeAllowance = await blobContract.allowance(address, addresses.STAKING_HELPER_ADDRESS);
        }

        if (addresses.sBLOB_ADDRESS) {
            const sBlobContract = new ethers.Contract(addresses.sBLOB_ADDRESS, MemoTokenContract, provider);
            sBlobBalance = await sBlobContract.balanceOf(address);
            unstakeAllowance = await sBlobContract.allowance(address, addresses.STAKING_ADDRESS);
        }

        if (addresses.PBLOB_ADDRESS) {
            const pBlobContract = new ethers.Contract(addresses.PBLOB_ADDRESS, MimTokenContract, provider);
            pBlobBalance = await pBlobContract.balanceOf(address);
            redeemAllowance = await pBlobContract.allowance(address, addresses.REDEEM_ADDRESS);
        }
    } catch (error) {}

    let deposited = "0",
        claimable = "0",
        weiRaised = "0",
        presaleEnd = new Date(),
        whitelisted = false;

    try {
        const whitelistContract = new ethers.Contract(addresses.WHITELIST_CONTROLLER_ADDRESS, WhitelistContract, provider);
        whitelisted = await whitelistContract.isWhiteListed(address);

        const presaleContract = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, provider);

        deposited = await presaleContract.checkContribution(address);

        if (deposited) claimable = await presaleContract.getTokenAmount(deposited);

        weiRaised = await presaleContract.weiRaised();

        presaleEnd = new Date((await presaleContract.endLBE.call()) * 1000);
    } catch (error) {}

    return {
        balances: {
            sBlob: ethers.utils.formatUnits(sBlobBalance, "gwei"),
            blob: ethers.utils.formatUnits(blobBalance, "gwei"),
        },
        staking: {
            blob: Number(stakeAllowance),
            sBlob: Number(unstakeAllowance),
        },
        presale: {
            deposited: Number(deposited) / 1e18,
            claimable: Number(claimable) / 1e18,
            weiRaised: Number(weiRaised) / 1e18,
            presaleEnd: presaleEnd,
            whitelisted: whitelisted,
        },
        redeem: {
            pBlobBalance: ethers.utils.formatUnits(pBlobBalance, "gwei"),
            redeemAllowance: Number(redeemAllowance),
        },
    };
});

interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserBondDetails {
    allowance: number;
    balance: number;
    maticBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
}

export const calculateUserBondDetails = createAsyncThunk("account/calculateUserBondDetails", async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (true) {
        return new Promise<any>(resevle => {
            resevle({
                bond: "",
                displayName: "",
                bondIconSvg: "",
                isLP: false,
                allowance: 0,
                balance: 0,
                interestDue: 0,
                bondMaturationBlock: 0,
                pendingPayout: "",
                maticBalance: 0,
            });
        });
    }

    // const bondContract = bond.getContractForBond(networkID, provider);
    // const reserveContract = bond.getContractForReserve(networkID, provider);

    // let interestDue, pendingPayout, bondMaturationBlock;

    // const bondDetails = await bondContract.bondInfo(address);
    // interestDue = bondDetails.payout / Math.pow(10, 9);
    // bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastBlob);
    // pendingPayout = await bondContract.pendingPayoutFor(address);

    // let allowance,
    //     balance = "0";

    // allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    // balance = await reserveContract.balanceOf(address);
    // const balanceVal = ethers.utils.formatEther(balance);

    // const maticBalance = await provider.getSigner().getBalance();
    // const maticVal = ethers.utils.formatEther(maticBalance);

    // const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "gwei");

    // return {
    //     bond: bond.name,
    //     displayName: bond.displayName,
    //     bondIconSvg: bond.bondIconSvg,
    //     isLP: bond.isLP,
    //     allowance: Number(allowance),
    //     balance: Number(balanceVal),
    //     maticBalance: Number(maticVal),
    //     interestDue,
    //     bondMaturationBlock,
    //     pendingPayout: Number(pendingPayoutVal),
    // };
});

interface ICalcUserTokenDetails {
    address: string;
    token: IToken;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isMatic?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk("account/calculateUserTokenDetails", async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (true) {
        return new Promise<any>(resevle => {
            resevle({
                token: "",
                address: "",
                img: "",
                allowance: 0,
                balance: 0,
            });
        });
    }

    // if (token.isMatic) {
    //     const maticBalance = await provider.getSigner().getBalance();
    //     const maticVal = ethers.utils.formatEther(maticBalance);

    //     return {
    //         token: token.name,
    //         tokenIcon: token.img,
    //         balance: Number(maticVal),
    //         isMatic: true,
    //     };
    // }

    // const addresses = getAddresses(networkID);

    // const tokenContract = new ethers.Contract(token.address, MimTokenContract, provider);

    // let allowance = "0",
    //     balance = "0";

    // // allowance = await tokenContract.allowance(address, addresses.ZAPIN_ADDRESS);
    // balance = await tokenContract.balanceOf(address);

    // const balanceVal = Number(balance) / Math.pow(10, token.decimals);

    // return {
    //     token: token.name,
    //     address: token.address,
    //     img: token.img,
    //     allowance: Number(allowance),
    //     balance: Number(balanceVal),
    // };
});

export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
        sBlob: string;
        blob: string;
    };
    loading: boolean;
    staking: {
        blob: number;
        sBlob: number;
    };
    presale: {
        deposited: number;
        claimable: number;
        weiRaised: number;
        presaleEnd: Date;
        whitelisted: boolean;
    };
    tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
    loading: true,
    bonds: {},
    balances: { sBlob: "", blob: "" },
    staking: { blob: 0, sBlob: 0 },
    presale: {
        deposited: 0,
        claimable: 0,
        weiRaised: 0,
        presaleEnd: new Date(Date.now()),
        whitelisted: false,
    },
    tokens: {},
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserBondDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const bond = action.payload.bond;
                state.bonds[bond] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserTokenDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const token = action.payload.token;
                state.tokens[token] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
