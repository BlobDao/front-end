import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import RebaseTimer from "../../components/RebaseTimer/index";
import { trim } from "../../helpers";
import { depositPresale, changeApproval } from "../../store/slices/stake-thunk";
import "./stake.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import Countdown from "react-countdown";

function Presale() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
    const MAX_MATIC = 700;

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);

    const maticBalance = useSelector<IReduxState, number>(state => {
        return state.account.tokens["MATIC"] && state.account.tokens["MATIC"].balance;
    });

    const whitelisted = useSelector<IReduxState, boolean>(state => {
        return state.account.presale && state.account.presale.whitelisted;
    });
    const depositedMatic = useSelector<IReduxState, number>(state => {
        return state.account.presale && state.account.presale.deposited;
    });
    const claimablepBlob = useSelector<IReduxState, number>(state => {
        return state.account.presale && state.account.presale.claimable;
    });
    const weiRaised = useSelector<IReduxState, number>(state => {
        return state.account.presale && state.account.presale.weiRaised;
    });
    const presaleEndDate = useSelector<IReduxState, Date>(state => {
        return state.account.presale && state.account.presale.presaleEnd;
    });
    let presaleStartDate = new Date(presaleEndDate);
    presaleStartDate.setDate(presaleEndDate.getDate() - 2);

    const [view, setView] = useState(0);
    // const [view, setView] = useState(presaleEndDate.getTime() >= Date.now() ? 1 : 0 );
    const [quantity, setQuantity] = useState<string>("");

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const setMax = () => {
        let max = 0;
        const maxDeposit = MAX_MATIC - depositedMatic;
        if (maticBalance >= maxDeposit) {
            max = maxDeposit;
        } else {
            max = maticBalance;
        }

        setQuantity(trim(max, 6).toString());
    };

    const onChangeStake = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (action === "pBlobClaim" || action === "blobClaim") {
            await dispatch(depositPresale({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        } else if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "stake" ? messages.before_stake : messages.before_unstake }));
        } else {
            await dispatch(depositPresale({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        }
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    const changeView = (newView: number) => () => {
        setView(newView);
        setQuantity("");
    };

    const hasAllowance = useCallback(
        token => {
            if (token === "matic") return maticBalance > 0;
            if (token === "pBlob") return claimablepBlob > 0;
            return 0;
        },
        [maticBalance],
    );

    return (
        <div className="stake-view">
            <Zoom in={true}>
                <div className="stake-card">
                    <Grid className="stake-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="stake-card-header">
                                <p className="stake-card-header-title">BLOB Presale (🦠, 🦠)</p>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className="stake-card-metrics">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <div className="stake-card-apy">
                                            <p className="stake-card-metrics-title">Whitelisted</p>
                                            <p className="stake-card-metrics-value">{whitelisted ? "Genesis Blob" : "No"}</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="stake-card-tvl">
                                            <p className="stake-card-metrics-title">Total FTM Locked</p>
                                            <p className="stake-card-metrics-value">{weiRaised}</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="stake-card-index">
                                            <p className="stake-card-metrics-title">Countdown</p>
                                            <p className="stake-card-metrics-value">
                                                <Countdown date={presaleEndDate} />
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <div className="stake-card-area">
                            {!address && (
                                <div className="stake-card-wallet-notification">
                                    <div className="stake-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="stake-card-wallet-desc-text">Connect your wallet to participate in the presale!</p>
                                </div>
                            )}
                            {address && whitelisted && (
                                <div>
                                    <div className="stake-card-action-area">
                                        {/*<div className="stake-card-action-stage-btns-wrap">
                                            
                                            {/* {presaleEndDate.getTime() >= Date.now()
                                                ? ( 
                                            <div onClick={changeView(0)} className={classnames("stake-card-action-stage-btn", { active: !view })}>
                                                <p>Deposit</p>
                                            </div>
                                            {/* // ) :
                                                // (
                                                //     <div onClick={changeView(1)} className={classnames("stake-card-action-stage-btn", { active: view })}>
                                                //         <p>Claim</p>
                                                //     </div>
                                                // )} */}
                                        {/* <div onClick={changeView(1)} className={classnames("stake-card-action-stage-btn", { active: view })}>
                                                <p>Claim</p>
                                            </div>*/}

                                        <div className="stake-card-action-stage-btns-wrap">
                                            <div onClick={changeView(0)} className={classnames("stake-card-action-stage-btn", { active: !view })}>
                                                <p>Deposit</p>
                                            </div>
                                            {presaleEndDate.getTime() >= Date.now() && (
                                                <div onClick={changeView(1)} className={classnames("stake-card-action-stage-btn", { active: view })}>
                                                    <p>Redeem</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="stake-card-action-row">
                                            {view === 0 && [
                                                <OutlinedInput
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="stake-card-action-input"
                                                    value={quantity}
                                                    onChange={e => setQuantity(e.target.value)}
                                                    labelWidth={0}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <div onClick={setMax} className="stake-card-action-input-btn">
                                                                <p>Max</p>
                                                            </div>
                                                        </InputAdornment>
                                                    }
                                                />,
                                                <div className="stake-card-tab-panel">
                                                    {address && hasAllowance("matic") ? (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "staking")) return;
                                                                onChangeStake("stake");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "staking", "Deposit FTM")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_staking")) return;
                                                                onSeekApproval("matic");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_staking", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>,
                                            ]}

                                            {view === 1 && [
                                                <div className="stake-card-tab-panel">
                                                    {address && hasAllowance("pBlob") ? (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "unstaking")) return;
                                                                onChangeStake("blobClaim");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "unstaking", "Claim BLOB")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_staking")) return;
                                                                onSeekApproval("pBlob");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_staking", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>,
                                                // <div className="stake-card-tab-panel">
                                                //     <div
                                                //         className="stake-card-tab-panel-btn"
                                                //         onClick={() => {
                                                //             if (isPendingTxn(pendingTransactions, "unstaking")) return;
                                                //             onChangeStake("blobClaim");
                                                //         }}
                                                //     >
                                                //         <p>{txnButtonText(pendingTransactions, "unstaking", "Claim BLOB")}</p>
                                                //     </div>
                                                // </div>
                                            ]}
                                        </div>

                                        <div className="stake-card-action-help-text">
                                            <p>
                                                Note: The presale will be open for 48 hours since {presaleStartDate.toUTCString()}. Tokens will be claimable at the end of the
                                                presale at {presaleEndDate.toUTCString()}. Tokens will be locked during this period.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="stake-user-data">
                                        <div className="data-row">
                                            <p className="data-row-name">Your Claimable Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{claimablepBlob} pBLOB</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Your Deposited Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{depositedMatic}/700 FTM</>}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Presale;
