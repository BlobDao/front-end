import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";

function Main() {
    return (
        <div className="landing-main">
            <div className="landing-main-title-wrap">
                <p>BLOB DAO</p>
                <p></p>
            </div>
            <div className="landing-main-help-text-wrap">
                <p>Become one with da BLOB!</p>
                <br></br>
                <p>Join sustainability and wealth!</p>
            </div>
            <div className="landing-main-btns-wrap">
                <nav>
                    <ul>
                        {/* <li>
                            <div>
                                <Link href="http://app.blobdao.finance" target="_blank" rel="noreferrer">
                                    <p>ENTER APP</p>
                                </Link>
                            </div>
                        </li> */}
                        <li>
                            <Link href="http://app.blobdao.finance/#/presale" target="_blank" rel="noreferrer">
                                <p>Pre sale</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* <Link href="http://app.blobdao.finance/#/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Enter App</p>
                    </div>
                </Link>
                <Link href="/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Documentation</p>
                    </div>
                </Link> */}
            </div>
        </div>
    );
}

export default Main;
