import { FC, useState, lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Radio, Button, Typography, Modal } from "antd";
import { motion } from "framer-motion";
import InputElement from "../atoms/InputElement";
import FraminghamFormula from "./FraminghamFormula";
import EnsyclocardiumCard from "../atoms/EnsyclocardiumCard";

const { Paragraph } = Typography;

const calculatorTopics = [
  {
    title: "Kalkulator BMI",
    img: "/assets/img/BMI.png",
    description: "Hitung indeks massa tubuhmu dan ketahui apakah berat badanmu ideal.",
    redirectUrl: "/BmiCalculator",
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


const HeartCalculator: FC = () => {
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState<string>("male");
  const [totalCholesterol, setTotalCholesterol] = useState<number | undefined>();
  const [hdlCholesterol, setHdlCholesterol] = useState<number | undefined>();
  const [systolicBP, setSystolicBP] = useState<number | undefined>();
  const [onHypertensionMeds, setOnHypertensionMeds] = useState<boolean>(false);
  const [isSmoker, setIsSmoker] = useState<boolean>(false);
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [rekomendasi, setRekomendasi] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const FraminghamRunnerGame = lazy(() => import("../molecules/FraminghamRunner"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isModalVisible) {
      setLoading(true); // Set loading true saat modal terbuka
      const timer = setTimeout(() => {
        setLoading(false); // Set loading false setelah 1 detik
      }, 1000);
      return () => clearTimeout(timer); // Bersihkan timer jika modal ditutup
    }
  }, [isModalVisible]);


  const getInfo = (field: string) => {
    switch (field) {
        case 'totalCholesterol':
            return 'Total kolesterol adalah jumlah keseluruhan kolesterol dalam darah Anda. Nilai normal < 200 mg/dL.';
          case 'hdlCholesterol':
            return 'Kolesterol HDL, juga dikenal sebagai "kolesterol baik", membantu tubuh menghilangkan kolesterol dari arteri dan mencegah penumpukan kolesterol di dinding pembuluh darah. Normal: ≥ 40 mg/dL (pria), ≥ 50 mg/dL (wanita).';
          case 'systolicBP':
            return 'Tekanan darah sistolik adalah tekanan darah maksimum yang tercatat saat jantung berkontraksi untuk memompa darah ke seluruh tubuh. Ini adalah angka pertama yang dicatat saat mengukur tekanan darah, misalnya dalam angka 120/80 mmHg, angka 120 adalah tekanan sistolik.';    
      default:
        return '';
    }
  };

  const calculateRisk = () => {
    if (
      age === undefined ||
      totalCholesterol === undefined ||
      hdlCholesterol === undefined ||
      systolicBP === undefined
    ) {
      setResult("Mohon lengkapi semua data yang diperlukan.");
      return;
    }
  
    const ln = Math.log;
    const lnAge = ln(Math.min(age, gender === "male" ? 70 : 78)); // Sesuai catatan: max ln(70) / ln(78)
    const lnChol = ln(totalCholesterol);
    const lnHDL = ln(hdlCholesterol);
    const lnBP = ln(systolicBP);
    const isMeds = onHypertensionMeds ? 1 : 0;
    const isSmk = isSmoker ? 1 : 0;
  
    let L = 0;
    let P = 0;
  
    if (gender === "male") {
      L =
        52.00961 * lnAge +
        20.014077 * lnChol +
        -0.905964 * lnHDL +
        1.305784 * lnBP +
        0.241549 * isMeds +
        12.096316 * isSmk +
        -4.605038 * lnAge * lnChol +
        -2.84367 * lnAge * isSmk +
        -2.93323 * lnAge * lnAge -
        172.300168;
  
      P = 1 - Math.pow(0.9402, Math.exp(L));
    } else {
      L =
        31.764001 * lnAge +
        22.465206 * lnChol +
        -1.187731 * lnHDL +
        2.552905 * lnBP +
        0.420251 * isMeds +
        13.07543 * isSmk +
        -5.060998 * lnAge * lnChol +
        -2.996945 * lnAge * isSmk -
        146.5933061;
  
      P = 1 - Math.pow(0.98767, Math.exp(L));
    }
  
    const percentage = (P * 100).toFixed(1);
  
    // Penjelasan personalisasi berdasarkan input
    let explanation = 'Berikut adalah informasi tentang faktor risiko penyakit jantung Anda:\n';
  
    // Penjelasan kondisi berdasarkan data pengguna
    if (isSmoker) {
      explanation += "Karena Anda seorang perokok, ini dapat meningkatkan kadar kolesterol dalam darah dan menyebabkan kerusakan pada pembuluh darah, meningkatkan risiko PJK.\n";
    }
  
    if (totalCholesterol > 240) {
      explanation += "Kadar kolesterol total Anda tinggi (>240 mg/dL). Kolesterol tinggi dapat menyebabkan penumpukan plak di pembuluh darah, meningkatkan risiko penyakit jantung.\n";
    } else if (totalCholesterol <= 240) {
      explanation += "Kadar kolesterol total Anda sehat (≤240 mg/dL), yang baik untuk kesehatan jantung Anda.\n";
    }
  
    if (hdlCholesterol < 40) {
      explanation += "HDL (kolesterol baik) Anda rendah. HDL membantu mengangkut kolesterol dari pembuluh darah ke hati, dan rendahnya kadar HDL berhubungan dengan peningkatan risiko penyakit jantung.\n";
    } else if (hdlCholesterol >= 40) {
      explanation += "HDL (kolesterol baik) Anda cukup tinggi, yang membantu menjaga kesehatan pembuluh darah dan mengurangi risiko penyakit jantung.\n";
    }
  
    if (systolicBP > 140) {
      explanation += "Tekanan darah sistolik Anda tinggi (>140 mmHg), yang merupakan faktor risiko utama untuk penyakit jantung.\n";
    } else if (systolicBP <= 140) {
      explanation += "Tekanan darah sistolik Anda berada dalam batas normal (≤140 mmHg), yang mengurangi risiko penyakit jantung.\n";
    }
  
    // Rekomendasi berdasarkan hasil perhitungan
    let recommendations = '';
    if (P < 0.10) {
      recommendations = "Risiko Anda rendah untuk terkena penyakit jantung. Tetap pertahankan gaya hidup sehat, rutin berolahraga, dan konsumsi makanan bergizi.";
    } else if (P >= 0.10 && P < 0.20) {
      recommendations = "Risiko Anda sedang untuk terkena penyakit jantung. Pertimbangkan untuk memperbaiki pola makan, berhenti merokok, dan meningkatkan aktivitas fisik.";
    } else {
      recommendations = "Risiko Anda tinggi untuk terkena penyakit jantung. Segera konsultasikan dengan dokter untuk evaluasi lebih lanjut dan pertimbangkan pengobatan serta perubahan gaya hidup yang lebih intensif.";
    }
  
    setExplanation(explanation);
    setRekomendasi(recommendations);
    setPercentage(percentage);
    setResult(percentage);
  };

  return (
    <>
      <Helmet>
            <h1 
                style={{ marginLeft: '10px', marginRight: '10px' }} 
                className="text-3xl font-bold tracking-widest uppercase"
                >
                <span className="cardium-text">Kalkulator Risiko Jantung - Cardium</span> 
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
         <h1 className="text-4xl md:text-5xl font-extrabold text-shadow-lg mb-4">Kalkulator Risiko Jantung</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
             Alat interaktif untuk menilai potensi risiko penyakit jantung dan bagaimana faktor-faktor tertentu dapat memengaruhi kondisi jantungmu.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
            onClick={() => {
              const section = document.getElementById("framingham_form");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2 min-w-[220px] bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            ❤️ Hitung Risiko Sekarang
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
      <section id="framingham_form" className="w-full bg-gradient-to-r from-blue-50 to-pink-50">
  <div className="w-full md:px-0 flex flex-col md:flex-row items-start justify-between space-x-6 bg-white">
    {/* Formulir Risiko Penyakit Jantung */}
    <div
    style={{padding: '48px', marginTop: '30px'}}
    className="w-full md:w-1/2 bg-white">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Formula Risiko Penyakit Jantung <br></br> (<i>Framingham Risk Score</i>)
      </h2>

      <Paragraph className="text-gray-600 mb-6 mt-12  text-justify">
        <strong>Catatan:</strong> Hasil perhitungan ini hanya untuk tujuan informasi dan bukan diagnosa medis. Untuk hasil yang lebih akurat, konsultasikan dengan profesional medis.
      </Paragraph>

      <Paragraph className="text-sm text-gray-500 mb-6  text-justify">
        * Data yang bertanda bintang (*) adalah wajib diisi. Pastikan data yang Anda masukkan akurat untuk mendapatkan hasil yang lebih tepat.
      </Paragraph>

      {/* Form Input */}
      <div className="grid grid-cols-1 gap-6">
        {/* Usia */}
        <InputElement
          inputClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          forwhat="age"
          labelMessage="Usia (Tahun) *"
          typeInput="number"
          inputName="age"
          inputPlaceholder="Masukkan usia Anda"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />

        {/* Jenis Kelamin */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <Radio.Group
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="mt-2"
          >
            <Radio value="male">Pria</Radio>
            <Radio value="female">Wanita</Radio>
          </Radio.Group>
        </div>

        {/* Kolesterol Total */}
        <InputElement
          inputClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          forwhat="totalCholesterol"
          labelMessage="Total Kolesterol (mg/dL)*"
          typeInput="number"
          inputName="totalCholesterol"
          inputPlaceholder="Masukkan total kolesterol Anda, Normal 150-200"
          value={totalCholesterol}
          onChange={(e) => setTotalCholesterol(parseInt(e.target.value))}
          onFocus={() => setFocusedField('totalCholesterol')}
          onBlur={() => setFocusedField('')}
        />
         {focusedField === 'totalCholesterol' && (
          <div className="z-10 text-sm text-blue-900 bg-blue-50 border border-blue-300 rounded-xl shadow-xl p-3 transition-opacity duration-300 ease-in-out animate-fade-in">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400  flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <span>
             {getInfo(focusedField)}
            </span>
          </div>
        </div>
        )}

        {/* Kolesterol HDL */}
        <InputElement
          inputClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          forwhat="hdlCholesterol"
          labelMessage="Kolesterol HDL (mg/dL) *"
          typeInput="number"
          inputName="hdlCholesterol"
          inputPlaceholder="Masukkan kolesterol HDL Anda. Normal: ≥ 40 mg/dL (pria), ≥ 50 mg/dL (wanita)"
          value={hdlCholesterol}
          onChange={(e) => setHdlCholesterol(parseInt(e.target.value))}
          onFocus={() => setFocusedField('hdlCholesterol')}
          onBlur={() => setFocusedField('')}
        />
        {focusedField === 'hdlCholesterol' && (
          <div className="z-10 text-sm text-blue-900 bg-blue-50 border border-blue-300 rounded-xl shadow-xl p-3 transition-opacity duration-300 ease-in-out animate-fade-in">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400  flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <span>
               {getInfo(focusedField)}
            </span>
          </div>
        </div>
        )}

        {/* Tekanan Darah Sistolik */}
        <InputElement
          inputClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          forwhat="systolicBP"
          labelMessage="Tekanan Darah Sistolik (mm Hg) *"
          typeInput="number"
          inputName="systolicBP"
          inputPlaceholder="Masukkan tekanan darah sistolik Anda. Normal: 90-120"
          value={systolicBP}
          onChange={(e) => setSystolicBP(parseInt(e.target.value))}
          onFocus={() => setFocusedField('systolicBP')}
          onBlur={() => setFocusedField('')}
        />
        {focusedField === 'systolicBP' && (
          <div className="z-10 text-sm text-blue-900 bg-blue-50 border border-blue-300 rounded-xl shadow-xl p-3 transition-opacity duration-300 ease-in-out animate-fade-in">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400  flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <span>
                 {getInfo(focusedField)}
            </span>
          </div>
        </div>
        )}

        {/* Obat Antihipertensi */}
<div className="mb-2">
  <label className="block font-medium text-gray-700 mb-2">
    Penggunaan Obat Antihipertensi (Opsional)
  </label>
  <Radio.Group
    onChange={(e) => setOnHypertensionMeds(e.target.value === "yes")}
    value={onHypertensionMeds ? "yes" : "no"}
    className="space-y-2"
  >
    <Radio value="yes" className="block">Ya</Radio>
    <Radio value="no" className="block">Tidak</Radio>
  </Radio.Group>
</div>

{/* Status Merokok */}
<div className="mb-2">
  <label className="block font-medium text-gray-700 mb-2">
    Status Merokok (Opsional)
  </label>
  <Radio.Group
    onChange={(e) => setIsSmoker(e.target.value === "yes")}
    value={isSmoker ? "yes" : "no"}
    className="space-y-2"
  >
    <Radio value="yes" className="block">Ya</Radio>
    <Radio value="no" className="block">Tidak</Radio>
  </Radio.Group>
</div>

{/* Status Diabetes */}
<div className="mb-2">
  <label className="block font-medium text-gray-700 mb-2">
    Status Diabetes (Opsional)
  </label>
  <Radio.Group
    onChange={(e) => setHasDiabetes(e.target.value === "yes")}
    value={hasDiabetes ? "yes" : "no"}
    className="space-y-2"
  >
    <Radio value="yes" className="block">Saya memiliki diabetes</Radio>
    <Radio value="no" className="block">Tidak memiliki diabetes</Radio>
  </Radio.Group>
</div>


      </div>

      {/* Hitung Risiko */}
      <div className="mt-8 text-center">
        <Button
          className="hover:bg-boldmaintheme"
          type="primary"
          size="large"
          style={{
            backgroundColor: "#c40d43",
            borderColor: "#c40d43",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
            width: "100%"
          }}
          onClick={calculateRisk}
        >
          Hitung Risiko
        </Button>
      </div>

      {/* Hasil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: result ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 text-justify"
      >
        {result === "Mohon lengkapi semua data yang diperlukan." && (
          <div className="text-center">
          <p className="text-sm text-gray-500 mt-2">Mohon lengkapi semua data yang diperlukan.</p>
        </div>
        )}
        {(result !== "Mohon lengkapi semua data yang diperlukan." && result !== "") && (
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Hasil Perhitungan Risiko Penyakit Jantung</h2>
            <p className="text-sm text-gray-500 mt-2">Perkiraan risiko 10 tahun berdasarkan data yang Anda masukkan</p>
          </div>
        
          <div className="space-y-4">
            {/* Hasil utama */}
            <div className="bg-blue-100 p-4 rounded-md">
              <h3 className="font-medium text-xl text-blue-700">{gender === "male" ? "Pria" : "Wanita"} usia {age} tahun</h3>
              <p className="text-gray-700">Perkiraan risiko 10 tahun terkena Penyakit Jantung Koroner adalah <span className="font-semibold text-2xl text-blue-800">{percentage}%</span>.</p>
            </div>
        
            {/* Penjelasan */}
            <div className="bg-gray-100 p-4 rounded-md">
              <h4 className="text-lg font-semibold text-gray-700">Penjelasan Faktor Risiko</h4>
              <p className="text-gray-700">{explanation}</p>
            </div>
        
            {/* Rekomendasi */}
            <div className="bg-green-100 p-4 rounded-md">
              <h4 className="text-lg font-semibold text-green-700">Rekomendasi</h4>
              <p className="text-gray-700">{rekomendasi}</p>
            </div>
          </div>
        
          {/* Additional Information */}
          <div className="text-justify text-sm text-gray-600 mt-6">
            <p>Informasi ini hanya perkiraan dan bukan pengganti nasihat medis. Segera konsultasikan dengan dokter Anda untuk evaluasi lebih lanjut.</p>
          </div>
        </div>        
        )}
      </motion.div>
    </div>

    {/* Info dan Gamifikasi Framingham */}
    <div 
    style={{padding: '48px', marginTop: '30px'}}
    className="w-full md:w-1/2 p-6 bg-white">
      <div className="drilldown-card">
      <div 
        className="header"
        onClick={() => setOpen(!open)}
      >
        <h3 className="title">
          APA ITU FRAMINGHAM RISK SCORE?
        </h3>
        <span className={`chevron ${open ? 'rotate' : ''}`}>&#9660;</span>
      </div>

      <div className={`content ${open ? 'open' : ''}`}>
        <p>
          Framingham Risk Score adalah kalkulator medis yang digunakan untuk
          memperkirakan risiko seseorang terkena penyakit jantung koroner dalam
          10 tahun mendatang. Ini mencakup berbagai faktor, termasuk usia,
          jenis kelamin, kolesterol, tekanan darah, dan kebiasaan hidup.
        </p>
      </div>
    </div>
    <FraminghamFormula />

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

export default HeartCalculator;
