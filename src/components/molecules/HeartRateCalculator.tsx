import { FC, useState, Suspense, lazy, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Typography, Modal } from "antd";
import { motion } from "framer-motion";
import InputElement from "../atoms/InputElement";
import SelectElement from "../atoms/SelectElement";
import HeartRateCalculationCard from "./HeartRateCalculationCard";
import EnsyclocardiumCard from "../atoms/EnsyclocardiumCard";

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
        title: "Kalkulator BMI",
        img: "/assets/img/BMI.png",
        description: "Hitung indeks massa tubuhmu dan ketahui apakah berat badanmu ideal.",
        redirectUrl: "/BmiCalculator",
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

const HeartRateCalculator: FC = () => {
  const [age, setAge] = useState<number>(0);
  const [method, setMethod] = useState<string>("nes"); // default NES
  const [maxHR, setMaxHR] = useState<number | null>(null);
  const [lowerBound, setLowerBound] = useState<number | null>(null);
  const [upperBound, setUpperBound] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const FraminghamRunnerGame = lazy(() => import("../molecules/FraminghamRunner"));
  const [open, setOpen] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const methodOptions = [
    {
      value: "nes",
      label: "NES (Norwegian Exercise Study) — 211 − 0.64 × usia",
    },
    {
      value: "tanaka",
      label: "Tanaka et al. (2001, JACC) — 208 − 0.7 × usia",
    },
    {
      value: "gulati",
      label: "Gulati et al. (2010, Circulation) — 206 − 0.88 × usia (khusus wanita)",
    },
  ];
  

  const calculateMaxHR = (age: number, method: string): number => {
    switch (method) {
      case "tanaka":
        return Math.round(208 - 0.7 * age);
      case "gulati":
        return Math.round(206 - 0.88 * age);
      case "nes":
      default:
        return Math.round(211 - 0.64 * age);
    }
  };

  const handleCalculateHR = () => {
    if (!age || age <= 0 || age > 120) return;
    const max = calculateMaxHR(age, method);
    setMaxHR(max);
    setLowerBound(Math.round(max * 0.5));
    setUpperBound(Math.round(max * 0.85));
  };

  useEffect(() => {
    if (isModalVisible) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isModalVisible]);

  return (
    <>
      {/* SEO Helmet */}
      <Helmet>
        <title>Kalkulator Detak Jantung - Cardium</title>
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-shadow-lg mb-4">
            Kalkulator Detak Jantung Ideal
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
            Ketahui zona detak jantung idealmu saat berolahraga untuk manfaat maksimal bagi jantung.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              const section = document.getElementById("heartRate_form");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2 min-w-[220px] bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            📏 Hitung Sekarang
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
      <section id="heartRate_form" className="w-full bg-gradient-to-r from-blue-50 to-green-50">
        <div className="w-full md:px-0 flex flex-col md:flex-row items-start justify-between space-x-6 bg-white">
           <div style={{ padding: '48px', marginTop: '30px' }} className="w-full md:w-1/2 bg-white">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Kalkulator Zona Detak Jantung
            </h2>

            <Paragraph className="text-gray-600 mb-4 text-justify">
              Detak jantung ideal saat berolahraga berada pada kisaran <strong>50% hingga 85%</strong> dari detak jantung maksimalmu.
            </Paragraph>

            <InputElement
              inputClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-8"
              forwhat="age"
              labelMessage="Usia (tahun) *"
              typeInput="number"
              inputName="age"
              inputPlaceholder="Contoh: 30"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />

            <SelectElement
              inputClass="mb-6"
              forwhat="method"
              labelMessage="Pilih Rumus Detak Jantung Maksimum"
              options={methodOptions}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />


            <button
              onClick={handleCalculateHR}
              className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Hitung Detak Jantung Ideal
            </button>

            {maxHR && (
  <div className="mt-8 border rounded-xl p-4 shadow-md bg-blue-50 border-blue-300 text-blue-700 text-justify">
    <h3 className="text-xl font-bold mb-2">Hasil Perhitungan HRmax:</h3>
    <p>🔹 Detak Jantung Maksimum (HRmax): <strong>{maxHR} bpm</strong></p>
    <p>🔹 Zona Target Ideal:
      <strong>{lowerBound} - {upperBound} bpm</strong>
    </p>

    <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm">
      <p>
        Berdasarkan usia dan rumus yang digunakan, detak jantung maksimum (HRmax) Anda adalah {maxHR} bpm. Ini adalah batas atas detak jantung yang aman saat berolahraga.
      </p>
      <p>
        🔹 Zona Target Ideal Anda berada di antara <strong>{lowerBound} bpm</strong> dan <strong>{upperBound} bpm</strong>. Ini adalah zona di mana latihan kardio Anda dapat memberikan manfaat kardiovaskular optimal, seperti meningkatkan kesehatan jantung dan kebugaran secara keseluruhan.
      </p>
    </div>

    <div className="mt-4 p-3 bg-yellow-100 rounded-md text-sm">
      <h4 className="font-semibold">💡 Tips Latihan:</h4>
      <ul className="list-disc pl-5">
        <li>
          Usahakan untuk berolahraga dengan detak jantung Anda berada dalam zona ini untuk mendapatkan manfaat kesehatan yang optimal.
        </li>
        <li>
          Jika Anda baru memulai latihan, pilih intensitas yang lebih rendah dan perlahan-lahan tingkatkan detak jantung Anda seiring dengan peningkatan kebugaran.
        </li>
        <li>
          Jangan berolahraga terlalu keras di luar zona target ini untuk menghindari risiko cedera atau masalah kesehatan.
        </li>
      </ul>
    </div>

    <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm">
      <h4 className="font-semibold">🔍 Apa itu HRmax?</h4>
      <p>
        HRmax (Heart Rate Maximum) adalah jumlah detak jantung maksimal yang dapat Anda capai saat berolahraga dengan intensitas tertinggi. Memahami HRmax Anda penting untuk menentukan zona latihan yang aman dan efektif.
      </p>
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
                    APA ITU DETAK JANTUNG (HEART RATE)?
                    </h3>
                    <span className={`chevron ${open ? 'rotate' : ''}`}>&#9660;</span>
                </div>

                <div className={`content ${open ? 'open' : ''}`}>
                    <p>
                    Detak jantung atau <i>heart rate</i> adalah jumlah denyut jantung per menit (bpm – beats per minute).
                    Ini merupakan indikator penting dari kesehatan jantung dan kebugaran tubuh. Detak jantung
                    yang normal saat istirahat untuk orang dewasa berkisar antara 60 hingga 100 bpm. 
                    Detak jantung dapat berubah tergantung pada aktivitas fisik, tingkat stres, dan kondisi kesehatan.
                    Memahami detak jantung ideal dapat membantu menilai kebugaran kardiovaskular serta
                    mengidentifikasi potensi risiko penyakit jantung.
                    </p>
                </div>
                </div>


            <HeartRateCalculationCard />
        
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

export default HeartRateCalculator;
