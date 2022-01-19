import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=fantom,olympus,magic-internet-money,curve-dao-token&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["CRV"] = data["curve-dao-token"].usd;
    cache["FTM"] = data["fantom"].usd;
    cache["USDC"] = data["magic-internet-money"].usd;
    cache["OHM"] = data["olympus"].usd;
};

export const getTokenPrice = (symbol: string): number => {
    return Number(cache[symbol]);
};
