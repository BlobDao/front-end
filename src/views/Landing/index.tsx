import React from "react";
import "./landing.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Background from "./components/Background";
import Blober from "./components/Blober";
import Roadmap from "./components/Roadmap";

function Landing() {
    return (
        <div className="landing-root">
            <Header />
            {/* <Blober></Blober> */}
            <Blober />

            <Main />
            <Background />
            {/* <Roadmap /> */}
            {/* <Footer /> */}
        </div>
    );
}

export default Landing;
