import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useGLTF } from "@react-three/drei";

export const Car = () => {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  );

  // const gltf = useGLTF('/models/car/scene.gltf')

  // console.log(gltf)

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

  return gltf ? <primitive object={gltf.scene} /> : null;
};
