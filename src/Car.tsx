import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Car = () => {
  const gltf = useLoader(
    GLTFLoader,
    "models/car/Corvette.glb"
  );

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.scale.set(0.005, 0.005, 0.005);
      gltf.scene.position.set(0, -0.035, 0);
      // Apply rules for children of the gltf model, like the wheels, body, doors etc...
      gltf.scene.traverse((object: any) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 20;
        }
      });
    }
  }, [gltf]);

  // useEffect(() => {
  //     gltf.scene.scale.set(1, 1, 1);
  //     gltf.scene.position.set(0, 2, 0);
  //     // Apply rules for children of the gltf model, like the wheels, body, doors etc...
  // }, [gltf]);

  return gltf ? <primitive object={gltf.scene} /> : null;
};
