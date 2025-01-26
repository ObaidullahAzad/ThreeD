import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  PresentationControls,
  useAnimations,
} from "@react-three/drei";

function Model(props: any) {
  const { scene, animations } = useGLTF("/drone.gltf");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && animations.length > 0) {
      console.log("Animations found:", animations);
      console.log("Actions available:", actions);

      // Play all animations
      Object.values(actions).forEach((action) => {
        if (action) {
          action.timeScale = 1.5;
          action.play();
        }
      });
    } else {
      console.log("No animations found or no actions available");
    }
  }, [actions, animations]);
  return <primitive object={scene} {...props} />;
}

function Drone() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 60, zoom: 1.5 }}
      style={{ position: "relative", touchAction: "none" }}
    >
      <PresentationControls speed={1.5} global zoom={0.5}>
        <Stage environment={"sunset"} shadows={false}>
          <Model scale={0.8} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default Drone;
