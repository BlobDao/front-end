import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import SimplexNoise from "simplex-noise";
import * as THREE from "three";

const Model = ({ ...props }) => {
    const geoRef = useRef();
    const meshRef = useRef();
    const simplex = new SimplexNoise();

    const geometry = new THREE.SphereBufferGeometry(6, 128, 128);
    const position_clone = JSON.parse(JSON.stringify(geometry.attributes.position.array));

    useFrame(() => {
        animate();
    });

    function animate() {
        if (meshRef.current) meshRef.current.rotation.x = meshRef.current.rotation.y += 0.001;

        if (geoRef.current) {
            const geo = geoRef.current;

            // change to see more or less spikes
            const spikes = 0.3;
            const time = performance.now() * 0.0005;
            for (let i = 0; i < geo.attributes.position.count; i++) {
                const ix = i * 3;
                const iy = i * 3 + 1;
                const iz = i * 3 + 2;

                const offset = 0.3 * (1 + 0.15 * simplex.noise3D(position_clone[ix] * spikes, position_clone[iy] * spikes, position_clone[iz] * spikes + time));

                geo.attributes.position.setX(i, position_clone[ix] * offset);
                geo.attributes.position.setY(i, position_clone[iy] * offset);
                geo.attributes.position.setZ(i, position_clone[iz] * offset);
            }

            geo.computeVertexNormals();
            geo.attributes.position.needsUpdate = true;
            geo.normalsNeedUpdate = true;
            geo.verticesNeedUpdate = true;
        }
    }

    return (

        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 128, 128]} ref={geoRef} />
            <meshPhongMaterial color="rgb(211, 211, 211);" shininess="50" ref={meshRef} />
        </mesh>
    );
};

export default Model;
