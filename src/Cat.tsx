import { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Cat = () => {
  const gltf = useLoader(
    GLTFLoader,
    "models/car/Cat.glb"
  );

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      gltf.scene.position.set(0.2, 0.925, 0.25);
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

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime() * 4
    
    let group = gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0]
    // console.log(group)
    group.rotation.y = t
    // group.children[2].rotation.x = t * 2
    // group.children[4].rotation.x = t * 2
    // group.children[6].rotation.x = t * 2
  })

  return gltf ? <primitive object={gltf.scene} /> : null;
};
