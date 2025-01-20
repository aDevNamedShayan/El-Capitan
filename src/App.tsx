import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Model } from "./Corvette";

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach='background' />

      <Car />

      {/* <Model scale={[0.005, 0.005, 0.005]} position={[0, -0.035, 0]} /> */}

      <spotLight 
        color={[1, 0.25, 0.7]}
        intensity={1500}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      
      <spotLight 
        color={[0.14, 0.5, 1]}
        intensity={2000}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
    </>
  )
}

const App = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  ); 
}

export default App
