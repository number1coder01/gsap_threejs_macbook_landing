// 14 and 16 mei switch karega -> dono render karega ... size and transition yeh detect and apply karnedega 
// Presentation Controls -> rotate vgrh
import { useRef} from "react";
import {PresentationControls} from "@react-three/drei";
import gsap from 'gsap';

import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";
import {useGSAP} from "@gsap/react";
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5; // how far 1 model will move off screen when its hidden

// helper functions that allow us to fade diff meshes & move to diff grps
// yeh nahi karenge toh dono smallMac and LargeMac ek saath dikhenge on screen
const fadeMeshes = (group, opacity) => {
    if(!group) return; 

    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION })
        }
    })
}
// for moving the element (horizontally)
const moveGroup = (group, x) => {
    if(!group) return;

    gsap.to(group.position, { x, duration: ANIMATION_DURATION })
}

// prop of scale and isMobile 
const ModelSwitcher = ({ scale, isMobile }) => {
    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    // agar 0.08 hai => on laptop & 0.05 hai => mobile par
    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;
    
    // yeh enable karega us to use the 2 utility functions upon a scale change just like useEffect works 
    useGSAP(() => {
        if(showLargeMacbook) {
            // slide out karega pichle wala and slide in karega selected wala
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        } else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale])

    // object -> this will define how we wanna move around this 3D model
    const controlsConfig = {
        snap: true, // snap back when released
        speed: 1,
        zoom: 1,
        azimuth: [-Infinity, Infinity], // horizontal scroll => back bhi dekh paayenge
        config: {mass:1, tension: 0, friction: 26} // real-life physics implemented thru this
    }

    return (
        <>
            {/* lets users interactively rotate and slightly move a 3D object in a smooth, controlled way. */}
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
                </group>
            </PresentationControls>

            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    )
}
export default ModelSwitcher
