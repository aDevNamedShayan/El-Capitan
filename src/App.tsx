import {
  CameraControls,
  CubeCamera,
  Environment,
  Float,
  Html,
  Loader,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Ground } from "./Ground";
import { CorvetteUnused } from "./Corvette";
import { Rings } from "./Rings";
import { Boxes } from "./Boxes";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { FloatingGrid } from "./FloatingGrid";
import { Corvette } from "./CarComponents/Corvette";
import { Mustang } from "./CarComponents/Mustang";
import { Vector3 } from "three";
import * as THREE from "three";
import { useSpring } from "@react-spring/three";
import { Monitor } from "./Monitor";

function Controls() {
  const { gl, camera } = useThree();

  useSpring({
    from: {
      z: 300,
    },
    z: 2,
    onFrame: ({ z }: any) => {
      camera.position.z = z;
    },
  });

  return (
    <OrbitControls
      autoRotate
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
    />
  );
}

const CarShow = () => {
  // const cameraRef = useRef();
  // const { set, camera } = useThree();

  // useEffect(() => {
  //   //   cameraRef.current?.lookAt(10, 20, 0);
  //   if (camera) {
  //     camera.lookAt(30, 20, 20);
  //   }
  // }, [camera]);

  // const LookAt = new Vector3(0, 0, 0);

  const cameraControlsRef = useRef<CameraControls>(null);
  const PLControlsRef = useRef(null);

  // useEffect(() => {
  //cameraControlsRef.current?.rotate(1, 0, false)
  // cameraControlsRef.current?.setPosition(0, 0.8, 0, true)
  // cameraControlsRef.current?.lookInDirectionOf(0, 0, 200, true);
  // fppRef.current?.position(0, 0.8, 5, true)
  // }, []);

  const { gl, camera, controls, set } = useThree();

  useEffect(() => {
    // camera.position.set(0, 0, 5);
    // camera.lookAt(0, 0, 0);
    // if(cameraControlsRef.current) cameraControlsRef.current.enabled = false;
    // camera.position.set(0.45, 1.0, -0.5);
    // camera.lookAt(0.3, 1, 7);
    // camera.updateProjectionMatrix();
  }, [camera, cameraControlsRef]);

  console.log(PLControlsRef.current);

  const [PLCEnable, setPLCEnable] = useState(false);

  return (
    <>
      {/* <OrbitControls
        // target={[0, 0, 0]}
        maxPolarAngle={1.45}
      /> */}

      <CameraControls
        enabled={true}
        ref={cameraControlsRef}
        // setTarget={new}
      />

      {/* <Controls /> */}

      {/* <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} /> */}
      <PerspectiveCamera
        // ref={cameraRef}
        makeDefault
        fov={50}
        position={[3, 2, 5]}
        // rotation={[50, 50, -50]}
        // rotateX={3}
        // lookAt={new THREE.Vector3(0, 0, 0)}
      />

      <PointerLockControls
        enabled={PLCEnable}
        isLocked={true}
        // selector="clickable"

        ref={PLControlsRef}
        maxPolarAngle={Math.PI - 0.0001}
        minPolarAngle={0.0001}
      />

      <color args={[0, 0, 0]} attach="background" />

      {/* <Float
        position={[0, 0.3, 0]}
        speed={2}
        rotationIntensity={1}
        floatIntensity={2}
      > */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Mustang />
            {/* <Corvette /> */}
          </>
        )}
      </CubeCamera>
      {/* </Float> */}

      <Rings />
      <Boxes />
      <FloatingGrid />

      {/* <CorvetteUnused scale={[0.005, 0.005, 0.005]} position={[0, -0.035, 0]} /> */}

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1000}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={1200}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />

      <mesh
        position={[2.5, 1, 0]}
        scale={[3, 3, 3]}
        // onClick={() => {camera.position.x = 3; camera.position.y = 2; camera.position.z = 7;}}
        onClick={() => {
          if (cameraControlsRef.current)
            cameraControlsRef.current.enabled = false;
          setPLCEnable(true);
          if (PLControlsRef.current) {
            // PLControlsRef.current.connect();
            // PLControlsRef.current.isLocked = true;
          }
          camera.position.set(0.45, 1.0, -0.5);
          camera.lookAt(0.3, 1, 7);
          camera.updateProjectionMatrix();
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="purple" />
      </mesh>

      <mesh name="clickable" position={[0, 0.925, 0.4]} scale={[1, 1, 1]}>
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="orange" />
      </mesh>

      {/* <mesh
        position={[0.1, 0.78, 0.196]}
        scale={[1.9, 1.2, 0.2]}
        rotation={[0.125, -0.21, 0.02]}
        // onClick={() => {camera.position.x = 3; camera.position.y = 2; camera.position.z = 7;}}
        onClick={() => {}}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="purple" />
        <Html>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "black",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Click Me!
          </div>
        </Html>
      </mesh> */}

      <Monitor scale={[0.58, 0.58, 0.5]} position={[0.1, 0.73, 0.256]} rotation={[-0.2, 2.954, 0.04]}/>

      {/* <EffectComposer> */}
      {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
      {/* <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.3} //Changed from 1.3
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer> */}
    </>
  );
};

const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          shadows
          // onCreated={({ camera, gl, scene }) => {
          // gl.setPixelRatio(window.devicePixelRatio);
          // gl.outputEncoding = sRGBEncoding;
          // gl.physicallyCorrectLights = true;
          // gl.shadowMap.enabled = true;
          // gl.shadowMap.type = PCFSoftShadowMap;
          // gl.toneMapping = ACESFilmicToneMapping;
          // console.log({ camera });
          // const yAxis = new Vector3(0, 1, 0);
          // const xAxis = new Vector3(1, 0, 0);
          // camera.setRotationFromAxisAngle(yAxis, 60);
          // camera.lookAt([0, 50, 0]);
          // camera.rotateX(100);
          // camera.rotateY(10);
          // camera.rotateZ(10);

          // camera.rotateY(100);
          // camera.updateProjectionMatrix();
          // }}
        >
          {/* <Html style={{ display: "flex", justifyContent: "start" }}>
            <div
              style={{
                position: "absolute",
                top: "0%",
                right: "0%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                fontSize: "24px",
                padding: "16px",
                cursor: "pointer",
                borderRadius: '20px'
              }}
            >3D</div>
          </Html> */}
          <CarShow />
        </Canvas>
      </Suspense>
      <Loader />
    </>
  );
};

export default App;
