// components/Heart3DModel.tsx
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF, Environment, useTexture, Html } from "@react-three/drei";
import { MeshStandardMaterial, Mesh, Group } from "three";

interface Annotation {
  position: [number, number, number];
  label: string;
}

const annotations: Annotation[] = [
  { position: [0.1, 0.6, 0.3], label: "Atrium kanan menerima darah dari tubuh dan memompanya ke ventrikel kanan." },
  { position: [-0.3, 0.4, -0.2], label: "Ventrikel kiri bertanggung jawab memompa darah ke seluruh tubuh." },
  { position: [0.2, 0.2, 0.6], label: "Aorta membawa darah beroksigen dari jantung ke tubuh." },
];

const HeartModel = () => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/assets/models/heart/source/heartbeat.glb");
  const { actions } = useAnimations(animations, group);
  const texture = useTexture("/assets/models/heart/textures/gltf_embedded_0.png");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: texture,
          color: hovered ? "#f43f5e" : "#ffffff",
          metalness: 0.2,
          roughness: 0.6,
        });
      }
    });
  }, [hovered, scene, texture]);

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.reset().fadeIn(0.5).play();
    }
  }, [actions, animations]);

  return (
    <group
      ref={group}
      scale={[6.5, 6.5, 6.5]}
      position={[0, -0.6, 0]}
      rotation={[0, -Math.PI, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  );
};

const Heart3DModel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-[400px] lg:h-[400px] relative bg-gradient-to-t from-red-400 to-pink-700 rounded-md overflow-hidden">
      <Canvas
        className="w-full h-full"
        shadows
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        camera={{ position: [0, 1.2, 2], fov: 35 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 2]} intensity={2} castShadow />
        <Environment preset="city" />
        <OrbitControls enablePan enableZoom enableRotate />
        <HeartModel />

        {annotations.map((annotation, index) => (
          <mesh
            key={index}
            position={annotation.position}
            onPointerOver={() => setHoveredIndex(index)}
            onPointerOut={() => setHoveredIndex(null)}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="red" />

            <Html position={[0, 0, 0]}>
              <div
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                  padding: "3px 6px",
                  borderRadius: "50%",
                  fontSize: "12px",
                  textAlign: "center",
                  cursor: "pointer",
                  transform: "translate(-50%, -50%)"
                }}
                onPointerEnter={() => setHoveredIndex(index)}
                onPointerLeave={() => setHoveredIndex(null)}
              >
                {index + 1}
              </div>
            </Html>

            {hoveredIndex === index && (
              <Html position={[0.4, 0.5, 0]}>
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.85)",
                    padding: "10px",
                    borderRadius: "6px",
                    color: "white",
                    width: "200px",
                    fontSize: "12px",
                    boxShadow: "0px 0px 6px rgba(255,255,255,0.5)",
                    pointerEvents: "none"
                  }}
                >
                  {annotation.label}
                </div>
              </Html>
            )}
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default Heart3DModel;
