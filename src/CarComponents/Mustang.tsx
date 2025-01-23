import { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Mustang = () => {
  const gltf = useLoader(
    GLTFLoader,
    "models/car/Hoonicorn.glb"
  );

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.scale.set(0.4, 0.4, 0.4);
      gltf.scene.position.set(0, -0.035, -1.5);
      // gltf.scene.traverse((object: any) => {
      //   if (object.isMesh) {
      //     object.castShadow = true;
      //     object.receiveShadow = true;
      //     object.material.envMapIntensity = 20;
      //   }
      // });
    }
  }, [gltf]);
  
  // useEffect(() => {
  //   if (gltf && gltf.scene) {
  //     gltf.scene.scale.set(0.005, 0.005, 0.005);
  //     gltf.scene.position.set(0, -0.035, 0);
  //     // Apply rules for children of the gltf model, like the wheels, body, doors etc...
  //     gltf.scene.traverse((object: any) => {
  //       if (object.isMesh) {
  //         object.castShadow = true;
  //         object.receiveShadow = true;
  //         object.material.envMapIntensity = 20;
  //       }
  //     });
  //   }
  // }, [gltf]);

  
  // useFrame((state, delta) => {
  //   let t = state.clock.getElapsedTime() * 2

  //   let group = gltf.scene.children[0].children[0].children[0]
  //   group.children[0].rotation.x = t * 2
  //   group.children[2].rotation.x = t * 2
  //   group.children[4].rotation.x = t * 2
  //   group.children[6].rotation.x = t * 2
  // })

  console.log(gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0])

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime() * 2

    let group = gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0]
    group.children[1].rotation.x = t
    group.children[2].rotation.x = t
    group.children[3].rotation.x = t
    group.children[4].rotation.x = t
  })

  return gltf ? <primitive object={gltf.scene} /> : null;
};
