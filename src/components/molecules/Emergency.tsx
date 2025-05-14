import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF, Environment, Html } from "@react-three/drei";
import { PhoneOutlined, FireOutlined, EnvironmentOutlined, AimOutlined, ThunderboltOutlined, CloudOutlined, MehOutlined, AlertOutlined, SoundOutlined, SafetyOutlined, EyeOutlined, TeamOutlined, UnlockOutlined, StopOutlined, HeartOutlined, VerticalAlignBottomOutlined, RedEnvelopeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { MeshStandardMaterial, Mesh } from "three";
import { FaHandHoldingMedical, FaHeartbeat, FaInfoCircle, FaUserFriends } from "react-icons/fa";
import useIsMobile from "../hooks/useMobile";
import NearHospital from "../atoms/NearHospital";

interface Location {
  lat: number;
  lng: number;
}


interface Annotation {
  position: [number, number, number];
  label: string;
}

const annotations: Annotation[] = [
  { position: [-0.3, -0.4, 0], label: "Tarik garis imajiner di antara dua puting dan letakkan tumit telapak tangan di tengah garis." },
  { position: [-0.4, 0.5, -0.2], label: "Letakkan tangan satunya di atasnya dan tautkan jari-jari." },
  { position: [0.5, 0.2, 0], label: "Jaga siku tetap lurus dan tekan dada korban sedalam 5 cm dengan tempo 100-120 tekanan/menit." },
  { position: [2.2, 0.2, 0], label: "Lanjutkan hingga petugas medis tiba." }
];

const Model = () => {
  const { scene, animations } = useGLTF("../../../assets/models/cpr/2d0328579da04b1d8bd14c2eebd52ca9.gltf");
  const { actions } = useAnimations(animations, scene);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }

    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          color: hoveredIndex !== null ? "#8d4514" : "#C68642",
          roughness: 0.55,
          metalness: 0.2,
        });
      }
    });
  }, [actions, animations, scene, hoveredIndex]);

  return (
    <>
      <primitive
        object={scene}
        scale={4}
        position={[0, -1, 0]}
        rotation={[0, Math.PI / -2, 0]} // Putar model ke kiri 90 derajat
      />

      {annotations.map((annotation, index) => (
        <mesh
          key={index}
          position={annotation.position}
          onPointerOver={() => setHoveredIndex(index)}
          onPointerOut={() => setHoveredIndex(null)}
        >
          {/* Titik anotasi */}
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="red" />

          {/* Angka tetap di tengah titik anotasi */}
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

          {/* Panel informasi hanya muncul saat di-hover, tanpa kedip */}
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
                  pointerEvents: "none" // Mencegah hover keluar saat ke panel
                }}
              >
                {annotation.label}
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </>
  );
};



const EmergencyPage = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Geolocation error: ", error)
      );
    }
  }, []);

  return (
    <section className="pt-20 sm:px-4 md:px-10 lg:px-20 flex justify-center mb-20">
      <div className="bg-white/90 sm:rounded-lg shadow-lg border sm:border-gray-400 w-full p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-gray-300 pb-3">
          <h2 className="text-2xl text-maintheme flex items-center">
            <PhoneOutlined />&nbsp; Situasi Darurat
          </h2>
        </div>
        <div className="w-full max-h-screen flex flex-col md:flex-row gap-4 items-stretch">
  {/* Panel Kiri */}
  <div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
    {/* Card Ambulans */}
    <Card
      className="bg-maintheme text-white shadow-md rounded-xl border-none flex-1"
      bodyStyle={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src="/assets/img/ambulance.png"
          alt="Ambulans Icon"
          className="w-12 h-12 bg-white p-1 rounded-full"
        />
        <div className="text-lg font-semibold">Keadaan Darurat?</div>
      </div>
      <button
        onClick={() => (window.location.href = "tel:119")}
        className="bg-white text-maintheme px-4 py-2 rounded-full text-sm font-semibold flex items-center  w-full gap-2 hover:bg-gray-100 transition self-start"
      >
        <PhoneOutlined />
        Hubungi Ambulans (119)
      </button>
    </Card>

    {/* Card Kontak Penting */}
    <Card
      className="bg-[#f5f5f5] text-gray-800 shadow-md rounded-xl border border-gray-200 flex-1"
      bodyStyle={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div>
        <div className="text-lg font-semibold mb-3">Kontak Penting Lainnya</div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => (window.location.href = "tel:112")}
            className="bg-maintheme text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90 transition w-full"
          >
            <FireOutlined />
            Hubungi Pemadam (112)
          </button>
          <button
            onClick={() => (window.location.href = "tel:110")}
            className="bg-maintheme text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90 transition w-full"
          >
            <PhoneOutlined />
            Hubungi Polisi (110)
          </button>
        </div>
      </div>
    </Card>
  </div>

  {/* Panel Kanan */}
  <div className={`w-full md:w-2/3 flex flex-col ${isMobile ? 'h-[50dvh]' : 'h-auto'}`}>
  {location ? (
    <Card
      className="bg-white shadow-md rounded-xl border border-gray-200 flex-1"
      bodyStyle={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <p className="text-gray-700 font-semibold flex items-center mb-2">
        <EnvironmentOutlined className="mr-2 text-lg text-maintheme" />
        Rumah Sakit Terdekat
      </p>
      <NearHospital location={{ lat: location.lat, lng: location.lng }} />
    </Card>
  ) : (
    <div className="w-full flex-1 rounded-lg border h-[50dvh] md:h-full">
       <div className="flex items-center justify-center h-full text-center p-4 text-red-500">
           <EnvironmentOutlined className="text-maintheme" />&nbsp;Tidak ada koneksi internet atau gagal memuat peta rumah sakit terdekat.
        </div>
    </div>
  )}
</div>
</div>



        <div className="w-full flex flex-col md:flex-row gap-8 items-start">
  {/* Kolom Kiri: Tanda-Tanda Serangan Jantung */}
  <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow-lg">
    <h2 className="text-2xl font-semibold text-maintheme mb-4">Gejala Umum Serangan Jantung</h2>
    <p className="text-lg text-gray-700 mb-4 text-justify">
      Serangan jantung adalah kondisi darurat medis yang dapat mengancam jiwa. Mengenali gejala serangan jantung
      secara cepat dan tepat dapat menyelamatkan nyawa.
    </p>

    <div className="space-y-4">
      {/* Tanda-tanda lengkap */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <HeartOutlined className="text-xl animate-pulse" />
        </div>
        <div>
          <p className="font-semibold text-lg">Nyeri Dada</p>
          <p className="text-gray-600">Tekanan, sesak, atau rasa seperti tertindih di area dada.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <AimOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Nyeri Menjalar</p>
          <p className="text-gray-600">Nyeri menyebar ke lengan kiri (atau kedua lengan), leher, rahang, punggung, atau perut.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <ThunderboltOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Pusing atau Pingsan</p>
          <p className="text-gray-600">Merasa ringan kepala, pusing, atau kehilangan kesadaran.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <CloudOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Sesak Napas</p>
          <p className="text-gray-600">Kesulitan bernapas bahkan saat tidak beraktivitas berat.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <MehOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Mual atau Muntah</p>
          <p className="text-gray-600">Rasa mual hebat atau bahkan muntah tiba-tiba.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <AlertOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Cemas atau Panik</p>
          <p className="text-gray-600">Perasaan panik yang tiba-tiba mirip serangan panik.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <FireOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Berkeringat Dingin</p>
          <p className="text-gray-600">Keringat dingin meskipun tidak sedang kepanasan atau olahraga.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <SoundOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Batuk atau Mengi</p>
          <p className="text-gray-600">Kadang disertai bunyi napas mengi atau batuk terus-menerus.</p>
        </div>
      </div>
    </div>
  </div>

  {/* Kolom Kanan: Pertolongan Pertama */}
  <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow-lg">
    <h2 className="text-2xl font-semibold text-maintheme mb-4">Pertolongan Pertama pada Serangan Jantung</h2>
    <p className="text-lg text-gray-700 mb-4 text-justify">
      Jika seseorang menunjukkan gejala serangan jantung, lakukan langkah berikut sebelum bantuan medis tiba:
    </p>

    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <PhoneOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Hubungi Darurat</p>
          <p className="text-gray-600">Segera hubungi layanan darurat (119).</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <SafetyOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Pastikan Lingkungan Aman</p>
          <p className="text-gray-600">Pastikan area sekitar korban aman untuk memberikan pertolongan.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <EyeOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Cek Respon Korban</p>
          <p className="text-gray-600">Coba panggil namanya atau beri rangsangan nyeri ringan.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <TeamOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Jauhkan Kerumunan</p>
          <p className="text-gray-600">Pastikan akses udara tidak terhalang oleh kerumunan orang.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <UnlockOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Longgarkan Pakaian</p>
          <p className="text-gray-600">Lepaskan atau longgarkan kerah baju dan ikat pinggang korban.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <VerticalAlignBottomOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Posisikan Korban</p>
          <p className="text-gray-600">Baringkan korban dan posisikan kaki lebih tinggi dari jantung.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <RedEnvelopeOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Miringkan Kepala</p>
          <p className="text-gray-600">Jangan dudukkan korban atau sering memindahkannya.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full min-w-12 min-h-12 aspect-square">
          <StopOutlined className="text-xl" />
        </div>
        <div>
          <p className="font-semibold text-lg">Jangan Beri Minum</p>
          <p className="text-gray-600">Hindari memberi air sebelum korban sadar sepenuhnya.</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
      <div className="w-12 h-12 bg-maintheme text-white flex items-center justify-center rounded-full animate-wavepulse shadow-lg">
        <FaHandHoldingMedical className="text-xl" />
      </div>
      <div>
        <p className="font-semibold text-lg text-maintheme">Jika Terlatih, Lakukan RJP (Resusitasi Jantung Paru)</p>
        <p className="text-gray-600">Lakukan RJP segera jika korban tidak bernapas dan Anda terlatih.</p>
      </div>
    </div>
    </div>
  </div>
</div>


<div className="mt-4 flex flex-col lg:flex-row gap-6">
  {/* Bagian RJP 3D */}
  <div className="flex-[3] p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-maintheme text-center mb-2">Model Interaktif RJP</h3>
    <div className="w-full h-[400px] lg:h-[600px] bg-gradient-to-t from-blue-900 to-blue-500 rounded-md overflow-hidden">
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        camera={{ position: [0, 2, 6], fov: 50 }}
      >
        <Environment preset="sunset" background />
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={1.2} color={"#0049d8"} />
        <directionalLight position={[-5, 5, 5]} intensity={1} color={"#ffaa55"} castShadow />
        <spotLight position={[0, 8, 0]} angle={0.4} intensity={1.2} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={1.5} color={"#ffffff"} />
        <OrbitControls enablePan enableZoom enableRotate />
        <Model />
        <meshStandardMaterial color={"#d9d9d9"} roughness={0.4} metalness={0.1} />
      </Canvas>
    </div>
    <div className="mt-6 text-gray-800">
    <div className="drilldown-card">
      <div 
        className="header"
        onClick={() => setOpen(!open)}
      >
        <h4 className="title  flex items-center gap-2 mb-2">
          <FaHeartbeat className="text-maintheme" />
          Mengapa RJP Penting?
        </h4>
        <span className={`chevron ${open ? 'rotate' : ''}`}>&#9660;</span>
      </div>

      <div className={`content ${open ? 'open' : ''}`}>
        <p>
          Serangan jantung atau henti jantung mendadak adalah kondisi darurat medis yang terjadi ketika jantung berhenti memompa darah secara efektif ke seluruh tubuh. Dalam kondisi ini, otak dan organ vital lainnya akan mengalami kerusakan hanya dalam hitungan menit jika tidak segera ditangani.
        </p>
        <p className="mt-2">
          RJP (Resusitasi Jantung Paru) merupakan kombinasi dari kompresi dada dan pemberian napas buatan yang bertujuan untuk menjaga sirkulasi darah dan oksigenasi organ penting hingga bantuan medis tiba. Penelitian menunjukkan bahwa inisiasi RJP oleh orang awam dapat meningkatkan peluang korban untuk bertahan hidup secara signifikan.
        </p>
        <p className="mt-2">
          Menurut <strong>Pedoman AHA 2020</strong>, kompresi dada dengan kedalaman 5–6 cm dan kecepatan 100–120 kali per menit adalah standar internasional yang direkomendasikan. Selain itu, jika tersedia, penggunaan AED (Automated External Defibrillator) sangat disarankan untuk memulihkan irama jantung normal.
        </p>
      </div>
    </div>
    <div className="drilldown-card">
      <div 
        className="header"
        onClick={() => setOpen2(!open2)}
      >
        <h4 className="title  flex items-center gap-2 mb-2">
        <FaUserFriends className="text-maintheme" />
        Siapa Saja yang Bisa Melakukan RJP?
        </h4>
        <span className={`chevron ${open2 ? 'rotate' : ''}`}>&#9660;</span>
      </div>

      <div className={`content ${open2 ? 'open' : ''}`}>
        <p>
          Semua orang — bahkan yang belum memiliki pelatihan medis formal — disarankan untuk melakukan RJP jika menemui seseorang yang tidak sadar dan tidak bernapas normal. Risiko memberikan RJP pada orang yang tidak mengalami henti jantung sangat kecil, sedangkan manfaatnya sangat besar jika korban memang mengalami henti jantung.
        </p>
      </div>
    </div>
    <div className="drilldown-card">
      <div 
        className="header"
        onClick={() => setOpen3(!open3)}
      >
        <h4 className="title  flex items-center gap-2 mb-2">
        <FaInfoCircle className="text-maintheme" />
        Fakta Penting
        </h4>
        <span className={`chevron ${open3 ? 'rotate' : ''}`}>&#9660;</span>
      </div>

      <div className={`content ${open3 ? 'open' : ''}`}>
        <ul className="list-disc ml-5 space-y-2">
          <li>Kurang dari 40% korban henti jantung di luar rumah sakit menerima CPR dari orang awam.</li>
          <li>Setiap menit tanpa CPR mengurangi kemungkinan selamat sebesar 7–10%.</li>
          <li>RJP yang cepat dan efektif dapat menggandakan atau melipatgandakan peluang korban untuk bertahan hidup.</li>
        </ul>
      </div>
    </div>
  {/* Kolom Narasi */}
  <div className="text-justify">
    {/* Sumber */}
    <p className="mt-2 text-sm text-gray-500 italic">
      Sumber: American Heart Association. <em>2020 AHA Guidelines for CPR and Emergency Cardiovascular Care</em>.
    </p>
  </div>

  {/* Kolom Ilustrasi atau Tambahan Visual */}
</div>

  </div>

  {/* Bagian Langkah-Langkah */}
  <div className="flex-[2] p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-justify">
  <h3 className="text-lg font-semibold text-maintheme mb-4 text-center">Langkah-Langkah Bantuan Hidup Dasar (BHD) – RJP</h3>
  <ul className="list-decimal ml-5 space-y-2 text-gray-800 leading-relaxed">
    <li>Pastikan keamanan diri, korban, dan lingkungan sekitar.</li>

    <li>
      Periksa respons korban:
      <ul className="list-disc ml-6 mt-1 space-y-1">
        <li>Panggil nama korban dan tepuk bahunya.</li>
        <li>Jika tidak ada respons, tekan bahu atau bagian atas kelopak matanya dengan lembut.</li>
      </ul>
    </li>

    <li>
      Periksa pernapasan normal:
      <ul className="list-disc ml-6 mt-1 space-y-1">
        <li>Lihat gerakan dada, dengarkan napas dari mulut/hidung, dan rasakan udara dari napas selama 10 detik.</li>
        <li>Jika korban tidak bernapas atau hanya terengah-engah, anggap sebagai henti jantung.</li>
      </ul>
    </li>

    <li>
      Segera hubungi bantuan:
      <ul className="list-disc ml-6 mt-1 space-y-1">
        <li>Telepon 119 atau minta orang sekitar menghubungi layanan darurat.</li>
        <li>Mintalah AED (Automated External Defibrillator) jika tersedia.</li>
      </ul>
    </li>

    <li>
      Lakukan kompresi dada:
      <ul className="list-disc ml-6 mt-1 space-y-1">
        <li>Letakkan tumit telapak tangan di tengah dada korban, di antara dua puting susu.</li>
        <li>Letakkan tangan yang lain di atasnya dan kunci jari-jari.</li>
        <li>Tekan dada sedalam 5-6 cm dengan kecepatan 100–120 kali per menit.</li>
        <li>Izinkan dada mengembang sepenuhnya setelah setiap kompresi, tanpa jeda yang lama.</li>
      </ul>
    </li>

    <li>
      Lanjutkan RJP hingga:
      <ul className="list-disc ml-6 mt-1 space-y-1">
        <li>Ada tanda-tanda kehidupan atau korban mulai bernapas normal kembali.</li>
        <li>Petugas medis tiba dan mengambil alih.</li>
        <li>Anda kelelahan dan tidak dapat melanjutkan.</li>
      </ul>
    </li>

    <li>
      Jika tersedia AED:
      <ul className="list-disc ml-6 mt-1 space-y-1">
        <li>Nyalakan AED dan ikuti instruksi suara.</li>
        <li>Tempelkan pad AED sesuai instruksi di dada korban.</li>
        <li>Pastikan tidak ada yang menyentuh korban saat AED menganalisis irama jantung dan saat memberikan kejut listrik.</li>
        <li>Lanjutkan RJP segera setelah kejut listrik atau jika AED menyarankan untuk tidak memberikan kejut.</li>
      </ul>
    </li>
  </ul>
</div>

</div>


      </div>
    </section>
  );
};

export default EmergencyPage;