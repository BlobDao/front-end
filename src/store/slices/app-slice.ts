import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { StakingContract, MemoTokenContract, BlobTokenContract, PresaleContract } from "../../abi";
import { setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getMarketPrice, getTokenPrice } from "../../helpers";
import { RootState } from "../store";
import allBonds from "../../helpers/bond";
import { useWeb3Context } from "../../hooks";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {

        return {
            currentIndex: 0,
            totalSupply: 0,
            marketCap: 0,
            currentBlock: 0,
            circSupply: 0,
            fiveDayRate: 0,
            treasuryBalance: 0,
            stakingAPY: 0,
            stakingTVL: 0,
            stakingRebase: 0,
            marketPrice: 0,
            currentBlockTime: 0,
            nextRebase: 0,
            rfv: 0,
            runway: 0,
        };

        // const mimPrice = getTokenPrice("USDC");
        // const addresses = getAddresses(networkID);

        // const stakingContract = new ethers.Contract(addresses.STAKING_ADDRESS, StakingContract, provider);
        // const currentBlock = await provider.getBlockNumber();
        // const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
        // const sBlobContract = new ethers.Contract(addresses.sBLOB_ADDRESS, MemoTokenContract, provider);
        // const blobContract = new ethers.Contract(addresses.BLOB_ADDRESS, BlobTokenContract, provider);

        // const marketPrice = ((await getMarketPrice(networkID, provider)) / Math.pow(10, 9)) * mimPrice;

        // const totalSupply = (await blobContract.totalSupply()) / Math.pow(10, 9);
        // const circSupply = (await sBlobContract.circulatingSupply()) / Math.pow(10, 9);

        // const stakingTVL = circSupply * marketPrice;
        // const marketCap = totalSupply * marketPrice;

        // const tokenBalPromises = allBonds.map(bond => bond.getTreasuryBalance(networkID, provider));
        // const tokenBalances = await Promise.all(tokenBalPromises);
        // const treasuryBalance = tokenBalances.reduce((tokenBalance0, tokenBalance1) => (tokenBalance0 ? tokenBalance0 : 0) + (tokenBalance1 ? tokenBalance1 : 0), 0);

        // const tokenAmountsPromises = allBonds.map(bond => bond.getTokenAmount(networkID, provider));
        // const tokenAmounts = await Promise.all(tokenAmountsPromises);
        // const rfvTreasury = tokenAmounts.reduce((tokenBalance0, tokenBalance1) => (tokenBalance0 ? tokenBalance0 : 0) + (tokenBalance1 ? tokenBalance1 : 0), 0);

        // const blobBondsAmountsPromises = allBonds.map(bond => bond.getBlobAmount(networkID, provider));
        // const blobBondsAmounts = await Promise.all(blobBondsAmountsPromises);
        // const blobAmount = blobBondsAmounts.reduce((tokenBalance0, tokenBalance1) => (tokenBalance0 ? tokenBalance0 : 0) + (tokenBalance1 ? tokenBalance1 : 0), 0);
        // const blobSupply = totalSupply - blobAmount;

        // const rfv = rfvTreasury / blobSupply;

        // const epoch = await stakingContract.epoch();
        // const stakingReward = epoch.distribute;
        // const circ = await sBlobContract.circulatingSupply();
        // const stakingRebase = stakingReward / circ;
        // const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
        // const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;

        // const currentIndex = await stakingContract.index();
        // const nextRebase = epoch.endTime;

        // const treasuryRunway = rfvTreasury / circSupply;
        // const runway = Math.log(treasuryRunway) / Math.log(1 + stakingRebase) / 3;

        // return {
        //     currentIndex: Number(ethers.utils.formatUnits(currentIndex, "gwei")) / 4.5,
        //     totalSupply,
        //     marketCap,
        //     currentBlock,
        //     circSupply,
        //     fiveDayRate,
        //     treasuryBalance,
        //     stakingAPY,
        //     stakingTVL,
        //     stakingRebase,
        //     marketPrice,
        //     currentBlockTime,
        //     nextRebase,
        //     rfv,
        //     runway,
        // };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    stakingTVL: number;
    marketPrice: number;
    marketCap: number;
    circSupply: number;
    currentIndex: string;
    currentBlock: number;
    currentBlockTime: number;
    fiveDayRate: number;
    treasuryBalance: number;
    stakingAPY: number;
    stakingRebase: number;
    networkID: number;
    nextRebase: number;
    totalSupply: number;
    rfv: number;
    runway: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
