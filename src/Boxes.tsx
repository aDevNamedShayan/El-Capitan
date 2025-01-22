import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

const Box = ({ color }) => {
  const box = useRef();
  const [xRotateSpeed] = useState(() => Math.random());
  const [yRotateSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
  const [position, setPosition] = useState(resetPosition());

  // Interesting fact✨: this function wont work as a const because it throws lexical error for reasons i dont know yet
  function resetPosition() {
    let vec = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (vec.x < 0) vec.x -= 1.75;
    if (vec.x > 0) vec.x += 1.75;

    // setPosition(vec)
    return vec;
  }

  useFrame(
    (state, delta) => {
      box.current.position.set(position.x, position.y, position.z);
      box.current.rotation.x += delta * xRotateSpeed;
      box.current.rotation.y += delta * yRotateSpeed;
    },
    [xRotateSpeed, yRotateSpeed, position]
  );

  return (
    <mesh ref={box} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
};

export const Boxes = () => {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 100; i++) a.push(0);
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Box
          key={i}
          color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
};
