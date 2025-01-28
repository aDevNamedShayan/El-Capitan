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
  useHelper,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Ground } from "./Ground";
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
import { Cat } from "./Cat";

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

const CarShow = ({
  setIsDriving,
}: {
  setIsDriving: Dispatch<SetStateAction<boolean>>;
}) => {
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
  const PLControlsRef = useRef<any>(null);

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
    // camera.position.set(0.15, 0.798, 0.04);
    // camera.lookAt(-1.25, 0.2, 7);
    // camera.updateProjectionMatrix();
  }, [camera, cameraControlsRef]);

  console.log(cameraControlsRef.current);
  console.log(PLControlsRef.current);

  const [PLCEnable, setPLCEnable] = useState(false);
  console.log(PLCEnable);

  const [isMonitorOn, setIsMonitorOn] = useState(false);

  const light = useRef<any>()

  useHelper(light, THREE.SpotLightHelper, 'cyan')

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

      {/* fuck this shit💩👇 */}
      {/* <PointerLockControls
        enabled={PLCEnable}
        // onUnlock={()=> alert("moz")}
        isLocked={true}
        selector="#plcontrol"
        ref={PLControlsRef}
        // maxPolarAngle={Math.PI - 0.0001}
        // minPolarAngle={0.0001}
      /> */}

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
      <Float
        // position={[0, 0.3, 0]}
        speed={8}
        rotationIntensity={0}
        floatIntensity={0.2}
        floatingRange={[0.05, -0.05]}
      >
        <Cat />
      </Float>

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

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={1200}
        angle={0.6}
        penumbra={0.5}
        position={[0, 5, -5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1200}
        angle={0.6}
        penumbra={0.5}
        position={[0, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Car's Interior Light */}
      <spotLight
        ref={light}
        color={[1, 0.89, 0.4]}
        intensity={3}
        angle={1.8}
        penumbra={1}
        position={[0, 1.21, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />

      {/* Door Handle Mesh */}
      <mesh
        position={[0.88, 0.73, -0.57]}
        scale={[0.25, 2, 4]}
        visible={false}
        onClick={() => {
          if (cameraControlsRef.current) {
            // cameraControlsRef.current.setPosition(0.45, 1.0, -0.5)
            // cameraControlsRef.current.setOrbitPoint(0.45, 1.0, -0.5)
            cameraControlsRef.current.setLookAt(
              0.45,
              1.0,
              -0.5,
              0.45,
              1.0,
              -0.4,
              true
            );
            cameraControlsRef.current.smoothTime = 1.6
            // cameraControlsRef.current.enabled = false;
          }
          // setTimeout(() => {
          //   cameraControlsRef.current.enabled = true;
          // }, 500);
          // setPLCEnable(true);
          // setTimeout(() => {
          //   if (PLControlsRef.current) {
          //     // PLControlsRef.current.connect();
          //     PLControlsRef.current.lock();
          //   }
          // }, 250);
          // camera.position.set(0.45, 1.0, -0.5);
          // camera.lookAt(0.3, 1, 7);
          // controls.target(0.45, 1.0, -0.5);!!!!!!!!!!!!!!!!!!!!!!!!!
          // camera.updateProjectionMatrix();
          setIsDriving(true);
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="yellow" />
      </mesh>

      {/* Monitor Enter Cat Mesh */}
      <mesh
        position={[0.15, 0.96, 0.4]}
        scale={[1, 1, 1]}
        visible={false}
        onClick={() => {
          if (cameraControlsRef.current) {
            cameraControlsRef.current.enabled = false;
          }
          camera.position.set(0.15, 0.798, 0.04);
          camera.lookAt(-1.25, 0.2, 7);
          camera.updateProjectionMatrix();
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="orange" />
      </mesh>

      {/* Monitor Back Button Mesh  */}
      <mesh
        // name="clickable"
        position={[0.22, 0.825, 0.21]}
        scale={[0.2, 0.2, 0.2]}
        onClick={() => {
          if (cameraControlsRef.current) {
            cameraControlsRef.current.enabled = true;
          }
          // camera.position.set(0.15, 0.798, 0.04);
          // camera.lookAt(-1.25, 0.2, 7);
          // camera.updateProjectionMatrix();
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="orange" />
      </mesh>

      {/* Monitor On/Off Button Mesh  */}
      <mesh
        // name="clickable"
        position={[0.22, 0.8, 0.21]}
        scale={[0.2, 0.2, 0.2]}
        onClick={() => {
          setIsMonitorOn(!isMonitorOn);
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      {/* Exit Car Mesh */}
      <mesh
        position={[0.81, 0.75, 0.02]}
        scale={[0.25, 2, 9]}
        visible={false}
        onClick={() => {
          if (cameraControlsRef.current) {
            // cameraControlsRef.current.setPosition(0.45, 1.0, -0.5)
            // cameraControlsRef.current.setOrbitPoint(0.45, 1.0, -0.5)
            cameraControlsRef.current.setLookAt(3, 2, 5, 0, 0, 0, true);
            // cameraControlsRef.current.enabled = false;
          }
          setIsDriving(false);
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="red" />
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

      <Monitor
        scale={[0.58, 0.58, 0.5]}
        position={[0.1, 0.73, 0.256]}
        rotation={[-0.2, 2.954, 0.04]}
        isMonitorOn={isMonitorOn}
      />

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
  const [isDriving, setIsDriving] = useState(false);
  return (
    <>
      <Suspense fallback={null}>
        {/* <div className="w-[5rem] h-12 bg-amber-300 absolute z-10 flex justify-center items-center">
          <button
            id="plcontrol"
            className={`size-6 text-base/[0rem] text-white bg-black cursor-pointer ${
              isDriving ? "" : "hidden"
            }`}
          >
            D
          </button>
        </div> */}
        <Canvas
          shadows 
          // colorManagement 
          // concurrent 
          // shadowMap
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
          <CarShow setIsDriving={setIsDriving} />
        </Canvas>
      </Suspense>
      <Loader />
    </>
  );
};

export default App;
