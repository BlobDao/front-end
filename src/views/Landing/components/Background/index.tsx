import React from "react";
import "./background.scss";
import BlobsTop from "../../../../assets/icons/landing-blobs-center.png";
import BlobsCenter from "../../../../assets/icons/landing-blobs-center.png";
import back from "../../../../assets/icons/gg.png";

function Background() {
    return (
        <div className="landing-background">
            <div className="landing-background-blobs-top">{/* <img alt="" src={back} /> */}</div>

            <div className="landing-background-blobs-center">{/* <img alt="" src={BlobsCenter} /> */}</div>
        </div>
    );
}

export default Background;
