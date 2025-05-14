import React from "react";
import { FaHeartbeat, FaAppleAlt, FaRunning, FaRegSmileBeam, FaChartLine, FaNotesMedical } from "react-icons/fa";

const healthTips = [
  { icon: <FaHeartbeat className="text-red-500 text-3xl" />, title: "Jaga Tekanan Darah", description: "Pantau tekanan darah secara rutin dan hindari stres berlebih. Hipertensi meningkatkan risiko serangan jantung hingga 70%." },
  { icon: <FaAppleAlt className="text-green-500 text-3xl" />, title: "Makan Sehat", description: "Konsumsi makanan kaya serat, buah, dan sayuran. Diet sehat dapat menurunkan risiko penyakit jantung hingga 30%." },
  { icon: <FaRunning className="text-blue-500 text-3xl" />, title: "Tetap Aktif", description: "Olahraga seperti jalan kaki 30 menit sehari mengurangi risiko penyakit jantung hingga 35%." },
  { icon: <FaRegSmileBeam className="text-yellow-500 text-3xl" />, title: "Kelola Stres", description: "Meditasi, yoga, dan tidur cukup dapat menurunkan tekanan darah dan meningkatkan kesehatan jantung." },
  { icon: <FaChartLine className="text-purple-500 text-3xl" />, title: "Statistik Kesehatan Jantung", description: "Penyakit jantung adalah penyebab kematian nomor satu di dunia, menyebabkan 17,9 juta kematian per tahun (WHO, 2023)." },
  { icon: <FaNotesMedical className="text-teal-500 text-3xl" />, title: "Pemeriksaan Rutin", description: "Cek kolesterol dan tekanan darah setiap 6 bulan untuk deteksi dini risiko penyakit jantung." }
];

const TipsSection: React.FC = () => {
  return (
    <div className="w-full mx-auto px-10 py-12 bg-pink-200 rounded-lg shadow-md">
      <h2 className="text-[#d90429] text-2xl font-semibold mb-8 text-center font-extrabold animate-bounce">
        PENTINGNYA MENJAGA KESEHATAN JANTUNG
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Menurut WHO, penyakit jantung menjadi penyebab utama kematian global dengan lebih dari <strong>17,9 juta</strong> kematian per tahun.
        Namun, 80% kasus dapat dicegah dengan gaya hidup sehat.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthTips.map((tip, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center transform hover:scale-105 transition duration-300 ease-in-out">
            {tip.icon}
            <h3 className="text-lg font-bold mt-4">{tip.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsSection;