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
    {
      position: [-0.2, -0.05, 0.05],
      label: "Atrium kanan menerima darah terdeoksigenasi dari tubuh melalui vena cava dan mengalirkannya ke ventrikel kanan."
    },
    {
        position: [-0.22, -0.18, 0.05],
        label: "Katup trikuspid memisahkan atrium kanan dan ventrikel kanan, mencegah aliran balik darah saat jantung berkontraksi."
      },
    {
        position: [-0.10, -0.3, 0.05],
        label: "Ventrikel kanan memompa darah terdeoksigenasi ke paru-paru melalui arteri pulmonalis untuk proses oksigenasi."
      },
      {
        position: [0.15, -0.40, 0.1],
        label: "Septum interventrikular memisahkan ventrikel kanan dan kiri, mencegah pencampuran darah beroksigen dan tidak beroksigen."
      },
    {
      position: [0.2, -0.25, 0.05],
      label: "Ventrikel kiri memompa darah beroksigen dengan tekanan tinggi ke seluruh tubuh melalui aorta. Ini adalah ruang terkuat di jantung."
    },
    {
        position: [0.28, -0.05, 0.05],
        label: "Katup bikuspid (mitral) memisahkan atrium kiri dan ventrikel kiri, berperan penting dalam aliran satu arah darah beroksigen."
    },
    {
      position: [0.2, 0.05, 0.05],
      label: "Atrium kiri menerima darah beroksigen dari paru-paru melalui vena pulmonalis dan mengarahkannya ke ventrikel kiri."
    },
    {
      position: [0.07, -0.07, 0.05],
      label: "Katup aorta mengatur aliran darah dari ventrikel kiri ke aorta, mencegah darah kembali ke jantung."
    },
    {
      position: [-0.07, -0.12, 0.05],
      label: "Katup pulmonal mengontrol aliran darah dari ventrikel kanan ke arteri pulmonalis menuju paru-paru."
    },
    {
        position: [-0.07, 0.3, 0.05],
        label: "Aorta adalah arteri utama yang membawa darah kaya oksigen dari ventrikel kiri ke seluruh tubuh."
    },
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
      rotation={[0, Math.PI, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} rotation={[0, Math.PI, 0]} />
    </group>
  );
};

const CameraControls = ({
    zoomIn,
    zoomOut,
    //toggleShowAll,
    //showAll
  }: {
    zoomIn: () => void;
    zoomOut: () => void;
    toggleShowAll: () => void;
    showAll: boolean;
  }) => (
    <div className="absolute top-2 right-2 z-10 space-x-2">
      <button
        onClick={zoomIn}
        className="bg-white text-black font-semibold px-2 py-1 rounded hover:bg-gray-100"
      >
        Zoom +
      </button>
      <button
        onClick={zoomOut}
        className="bg-white text-black font-semibold px-2 py-1 rounded hover:bg-gray-100"
      >
        Zoom -
      </button>
      
      {/* <button
        onClick={toggleShowAll}
        className="bg-white text-black font-semibold px-2 py-1 rounded hover:bg-gray-100"
      >
        {showAll ? "Sembunyikan Info" : "Tampilkan Semua Info"}
      </button> */}
    </div>
  );

const Heart3DModel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showAllTooltips, setShowAllTooltips] = useState(false);
  const controlsRef = useRef<any>();
  const cameraRef = useRef<any>();

  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z -= 0.3;
    }
  };

  const zoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z += 0.3;
    }
  };

  return (
    <div className="w-full h-[400px] lg:h-[400px] relative bg-gradient-to-t from-red-400 to-pink-700 rounded-md overflow-hidden">
      <CameraControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        toggleShowAll={() => setShowAllTooltips(!showAllTooltips)}
        showAll={showAllTooltips}
      />
      <Canvas
        className="w-full h-full"
        shadows
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        camera={{ position: [0, 1, 2], fov: 35 }}
        onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 2]} intensity={2} castShadow />
        <Environment preset="city" />
        <OrbitControls ref={controlsRef} enablePan enableZoom enableRotate />
        <HeartModel />

        {/* Anotasi */}
        {annotations.map((annotation, index) => (
          <mesh
            key={index}
            position={annotation.position}
            onPointerOver={() => setHoveredIndex(index)}
            onPointerOut={() => setHoveredIndex(null)}
          >
            <sphereGeometry args={[0.001, 8, 8]} />
            <meshStandardMaterial transparent opacity={0} />

            {/* Angka anotasi */}
            <Html position={[0, 0, 0]} center zIndexRange={[100, 0]}>
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                  padding: "2px 5px",
                  borderRadius: "50%",
                  fontSize: "10px",
                  minWidth: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transform: "translate(-50%, -50%)",
                  userSelect: "none",
                }}
              >
                {index + 1}
              </div>
            </Html>

            {/* Tooltip saat hover */}
            {(hoveredIndex === index || showAllTooltips) && (
                <Html
                    position={[0, 0, 0]} // Tooltip diposisikan sama dengan angka
                    transform={false}    // Kunci posisinya di layar (tidak ikut rotasi scene)
                    zIndexRange={[100, 0]}
                >
                    <div
                    style={{
                        backgroundColor: "rgba(0,0,0,0.85)",
                        padding: "10px",
                        borderRadius: "6px",
                        color: "white",
                        width: "200px",
                        fontSize: "12px",
                        boxShadow: "0px 0px 6px rgba(255,255,255,0.5)",
                        pointerEvents: "none",
                        position: "absolute",
                        left: "25px", // Muncul tepat di kanan angka
                        top: "50%",
                        transform: "translateY(-50%)",
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
