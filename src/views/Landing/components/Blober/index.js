import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import Model from "./Model";
import "./styles.scss"

function Blober() {
    return (
        <div className="blober-wrapper">
            <Canvas
                className="canvas"
                camera={{
                    fov: 45,
                    position: [window.innerWidth / window.innerHeight, 0.1, 5],
                }}
            >
                {/* <Stars /> */}
                <ambientLight intensity={0.1} />
                <directionalLight intensity={0.5} position={[0, 100, 200]} />
                <Model />
            </Canvas>
        </div>
    );
}

export default Blober;
