import { FC, useState, lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Typography, Modal } from "antd";
import { motion } from "framer-motion";
import InputElement from "../atoms/InputElement";
import EnsyclocardiumCard from "../atoms/EnsyclocardiumCard";
import BMICalculationCard from "./BmiCalculationCard";

const { Paragraph } = Typography;

const calculatorTopics = [
  {
    title: "Risiko Jantung Koroner",
    img: "/assets/img/framingham.png",
    description: "Hitung perkirakan risiko seseorang terkena penyakit jantung koroner dalam 10 tahun mendatang.",
    redirectUrl: "/HeartCalculator",
    theme: "#0c6ebd",
    theme2: "#0c6ebd"
  },
  {
    title: "Detak Jantung Ideal",
    img: "/assets/img/heartbeat.png",
    description: "Ketahui detak jantung istirahat idealmu dan evaluasi kebugaran jantung.",
    redirectUrl: "/HeartRateCalculator",
    theme: "#0c6ebd",
    theme2: "#0c6ebd"
  },
  {
    title: "TDEE & Kalori Harian",
    img: "/assets/img/TDEE.png",
    description: "Cari tahu kebutuhan kalori harian berdasarkan aktivitas fisikmu.",
    redirectUrl: "/kalkulator/tdee",
    theme: "#0c6ebd",
    theme2: "#0c6ebd"
  },
  {
    title: "Rasio Pinggang-Pinggul",
    img: "/assets/img/WHR.png",
    description: "Ukuran lemak tubuh yang lebih akurat untuk risiko penyakit jantung.",
    redirectUrl: "/kalkulator/whr",
    theme: "#0c6ebd",
    theme2: "#0c6ebd"
  },
  {
    title: "Tekanan Darah",
    img: "/assets/img/blood-pressure.png",
    description: "Klasifikasi tekanan darah dan risikonya terhadap jantungmu.",
    redirectUrl: "/kalkulator/blood-pressure",
    theme: "#0c6ebd",
    theme2: "#0c6ebd"
  },
  {
    title: "Skor Gaya Hidup Sehat",
    img: "/assets/img/lifestyle.png",
    description: "Nilai gaya hidupmu dan temukan cara memperbaikinya.",
    redirectUrl: "/kalkulator/lifestyle",
    theme: "#0c6ebd",
    theme2: "#0c6ebd"
  }  
];


const BmiCalculator: FC = () => {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmiValue, setBmiValue] = useState<number | null>(null);
  const [bmiResult, setBmiResult] = useState<string>("");
  const [bmiCategory, setBmiCategory] = useState<string>("");
  const [bmiRecommendation, setBmiRecommendation] = useState<string>("");
  const [bmiDescription, setBmiDescription] = useState<string>("");
  const [open, setOpen] = useState(false);
  const FraminghamRunnerGame = lazy(() => import("../molecules/FraminghamRunner"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const [loading, setLoading] = useState(true);

  const handleCalculateBMI = () => {
    if (!weight || !height) return;
  
    const heightInMeters = height / 100;
    const rawBmi = weight / (heightInMeters * heightInMeters);
    const bmi = parseFloat(rawBmi.toFixed(1)); // Membulatkan ke 1 desimal untuk penyajian yang rapi
    setBmiValue(bmi);
  
    let category = "";
    let description = "";
    let recommendation = "";
  
    if (bmi < 18.5) {
      category = "Kurus";
      description = "Berat badan Anda di bawah normal. Kondisi ini bisa meningkatkan risiko kekurangan gizi, gangguan hormon, dan masalah kekebalan tubuh.";
      recommendation = "Disarankan meningkatkan asupan kalori sehat dengan memperbanyak konsumsi makanan bergizi tinggi (seperti kacang-kacangan, alpukat, produk susu), olahraga kekuatan, dan berkonsultasi dengan ahli gizi.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal";
      description = "Berat badan Anda berada dalam rentang ideal. Ini merupakan indikasi bahwa Anda memiliki risiko kesehatan yang rendah terkait berat badan.";
      recommendation = "Pertahankan gaya hidup sehat dengan pola makan seimbang, olahraga rutin (150 menit/minggu), dan manajemen stres.";
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Kelebihan berat badan";
      description = "Berat badan Anda sedikit di atas normal. Kondisi ini bisa meningkatkan risiko tekanan darah tinggi, penyakit jantung, dan diabetes.";
      recommendation = "Mulailah dengan pengurangan asupan kalori dari makanan tinggi gula dan lemak, tingkatkan aktivitas fisik (seperti jalan kaki 30 menit per hari), dan lakukan monitoring berat badan secara berkala.";
    } else {
      category = "Obesitas";
      description = "Anda berada dalam kategori obesitas, yang berisiko tinggi terhadap penyakit jantung, diabetes tipe 2, stroke, dan gangguan sendi.";
      recommendation = "Sangat disarankan melakukan perubahan gaya hidup menyeluruh: diet sehat dengan porsi terkontrol, olahraga aerobik dan kekuatan secara teratur, serta konsultasi medis untuk program penurunan berat badan yang aman.";
    }
    setBmiResult(category);
    setBmiCategory(category);
    setBmiDescription(description);
    setBmiRecommendation(recommendation);
  };
  
  

  useEffect(() => {
    if (isModalVisible) {
      setLoading(true); // Set loading true saat modal terbuka
      const timer = setTimeout(() => {
        setLoading(false); // Set loading false setelah 1 detik
      }, 1000);
      return () => clearTimeout(timer); // Bersihkan timer jika modal ditutup
    }
  }, [isModalVisible]);

  return (
    <>
    <Helmet>
      <h1
        style={{ marginLeft: '10px', marginRight: '10px' }}
        className="text-3xl font-bold tracking-widest uppercase"
      >
        <span className="cardium-text">Kalkulator BMI - Cardium</span>
      </h1>
    </Helmet>
  
    {/* Hero Section */}
    <section
      style={{ height: '70dvh', backgroundImage: "url('/assets/img/bg-calculator.jpg')" }}
      className="pt-[65px] bg-no-repeat bg-center bg-cover bg-fixed flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/img/hero-bg.jpg')" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-white"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-shadow-lg mb-4">Kalkulator Indeks Massa Tubuh</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
          Hitung BMI-mu dan ketahui apakah kamu berada di kisaran berat badan yang sehat.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              const section = document.getElementById("bmi_form");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2 min-w-[220px] bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            📏 Hitung BMI Sekarang
          </button>
          <button
            onClick={() => {
              const section = document.getElementById("all_calculator");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2 min-w-[220px] bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            📖 Jelajahi semua
          </button>
        </div>
      </motion.div>
    </section>
  
    {/* Form Section */}
    <section id="bmi_form" className="w-full bg-gradient-to-r from-blue-50 to-green-50">
      <div className="w-full md:px-0 flex flex-col md:flex-row items-start justify-between space-x-6 bg-white">
        {/* Formulir BMI */}
        <div style={{ padding: '48px', marginTop: '30px' }} className="w-full md:w-1/2 bg-white">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
            Kalkulator Indeks Massa Tubuh (BMI)
          </h2>
  
          <Paragraph className="text-gray-600 mb-6 mt-12 text-justify">
            <strong>Catatan:</strong> BMI adalah indikator umum kesehatan berat badan terhadap tinggi badan. Namun, hasil ini tidak memperhitungkan komposisi tubuh (misal: otot atau lemak).
          </Paragraph>
  
          <Paragraph className="text-sm text-gray-500 mb-6 text-justify">
            * Hasil ini bersifat indikatif. Untuk penilaian kesehatan yang lebih akurat, konsultasikan dengan tenaga medis profesional.
          </Paragraph>
  
          <div className="grid grid-cols-1 gap-6">
            {/* Berat Badan */}
            <InputElement
              inputClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              forwhat="weight"
              labelMessage="Berat Badan (kg) *"
              typeInput="number"
              inputName="weight"
              inputPlaceholder="Contoh: 70"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
  
            {/* Tinggi Badan */}
            <InputElement
              inputClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              forwhat="height"
              labelMessage="Tinggi Badan (cm) *"
              typeInput="number"
              inputName="height"
              inputPlaceholder="Contoh: 170"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
  
            {/* Tombol Hitung */}
            <button
              onClick={handleCalculateBMI}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Hitung BMI
            </button>
          </div>
  
          {/* Hasil */}
          {bmiResult && (
  <div
    className={`mt-8 border rounded-xl p-4 shadow-md ${
      bmiCategory === "Normal"
        ? "bg-green-50 border-green-300 text-green-700"
        : bmiCategory === "Kelebihan berat badan"
        ? "bg-yellow-50 border-yellow-300 text-yellow-700"
        : bmiCategory === "Obesitas"
        ? "bg-red-50 border-red-300 text-red-700"
        : "bg-blue-50 border-blue-300 text-blue-700"
    }`}
  >
    <h3 className="text-xl font-bold mb-2">Hasil BMI:</h3>
    <p className="text-lg">{bmiValue !== null && <span>Your BMI is: {bmiValue}</span>}</p>
    <p className="text-sm mt-2">
      Kategori: <em>{bmiCategory}</em>
    </p>
    
    {/* Deskripsi */}
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <h4 className="font-semibold text-lg">Deskripsi:</h4>
      <p className="text-sm">{bmiDescription}</p>
    </div>

    {/* Rekomendasi */}
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <h4 className="font-semibold text-lg">Rekomendasi:</h4>
      <p className="text-sm">{bmiRecommendation}</p>
    </div>
  </div>
)}



        </div>
        <div 
            style={{padding: '48px', marginTop: '30px'}}
            className="w-full md:w-1/2 p-6 bg-white">
              <div className="drilldown-card">
                <div 
                    className="header"
                    onClick={() => setOpen(!open)}
                >
                    <h3 className="title">
                    APA ITU BODY MASS INDEX (BMI)?
                    </h3>
                    <span className={`chevron ${open ? 'rotate' : ''}`}>&#9660;</span>
                </div>

                <div className={`content ${open ? 'open' : ''}`}>
                    <p>
                    Body Mass Index (BMI) atau Indeks Massa Tubuh adalah ukuran yang digunakan
                    untuk menentukan apakah seseorang memiliki berat badan yang sehat dibandingkan
                    dengan tinggi badannya. BMI dihitung dengan membagi berat badan (kg) dengan kuadrat tinggi badan (m²).
                    Nilai BMI dapat digunakan untuk mengidentifikasi risiko kesehatan yang berhubungan
                    dengan kelebihan atau kekurangan berat badan.
                    </p>
                </div>
                </div>

            <BMICalculationCard />
        
              <div className="text-center mb-6 drilldown-card">
                <img
                  src="/assets/img/cardiumRunner.png"
                  alt="Cardium Runner"
                  className="w-48 h-48 mx-auto mb-4"
                />
                <Button
                  type="primary"
                  style={{
                    borderRadius: "12px",
                    fontWeight: "bold",
                    backgroundColor: "#c40d43",
                    borderColor: "transparent",
                    color: "#fff",
                    padding: "20px 20px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease",
                    marginBottom: "1rem"
                  }}
                  onClick={openModal}
                >
                  Mainkan Cardium Runner
                </Button>
               
                   <Modal
                   title="Cardium Runner: Framingham Edition"
                   open={isModalVisible}
                   onCancel={closeModal}
                   footer={null}
                   width={900}
                   bodyStyle={{ height: '600px', overflow: 'hidden' }}
                   centered
                   destroyOnClose
                 >
                   <Suspense fallback={<div>Memuat game...</div>}>
                     {!loading && <FraminghamRunnerGame />}
                   </Suspense>
                 </Modal>
          
              </div>
            </div>
      </div>
    </section>
    <section id="all_calculator" className="w-full bg-gradient-to-r from-blue-50 to-pink-50 py-8 px-8">
    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Kalkulator Lainnya
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {calculatorTopics.map((topic) => (
                  <EnsyclocardiumCard
                    title={topic.title}
                    description={topic.description}
                    imageUrl={topic.img}
                    redirectUrl={topic.redirectUrl}
                    theme={topic.theme}
                    theme2={topic.theme2}
                  />
                ))}
              </div>
    </section>
  </>  
  );
};

export default BmiCalculator;
