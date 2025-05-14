import { FC } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EnsyclocardiumCard from "../atoms/EnsyclocardiumCard";

const topics = [
  {
    title: "Anatomi Jantung",
    img: "/assets/img/anatomy.png",
    description: "Pelajari struktur dan bagian penting jantung manusia.",
    redirectUrl: "/HeartAnatomyAndPhysiology",
    theme: "#c40d43",
    theme2: "#c40d43"
  },
  {
    title: "Gejala & Penyakit",
    img: "/assets/img/disease.png",
    description: "Kenali gejala umum penyakit jantung dan langkah penanganannya.",
    redirectUrl: "/ensyclocardium/gejala-penyakit",
    theme: "#c40d43",
    theme2: "#c40d43"
  },
  {
    title: "Gaya Hidup Sehat",
    img: "/assets/img/sport.png",
    description: "Gaya hidup yang menunjang kesehatan jantung secara menyeluruh.",
    redirectUrl: "/ensyclocardium/gaya-hidup",
     theme: "#c40d43",
    theme2: "#c40d43"
  },
  {
    title: "Nutrisi",
    img: "/assets/img/nutrition.png",
    description: "Asupan nutrisi penting yang mendukung jantung yang sehat.",
    redirectUrl: "/ensyclocardium/nutrisi",
     theme: "#c40d43",
    theme2: "#c40d43"
  },
  {
    title: "Emosi & Stress",
    img: "/assets/img/stress.png",
    description: "Pengaruh emosi dan stres terhadap kesehatan jantung.",
    redirectUrl: "/ensyclocardium/stress",
     theme: "#c40d43",
    theme2: "#c40d43"
  },
  {
    title: "Mitos & Fakta",
    img: "/assets/img/myth.png",
    description: "Bongkar mitos dan temukan fakta medis seputar jantung.",
    redirectUrl: "/ensyclocardium/mitos-fakta",
     theme: "#c40d43",
    theme2: "#c40d43"
  },
];


const EnsyclocardiumContent: FC = () => {
  const navigate = useNavigate();

  const goToHeartAnatomyAndPhysiology = () => {
    navigate('/HeartAnatomyAndPhysiology');
  }
  return (
    <>
      <Helmet>
        <title>Ensyclocardium - Cardium</title>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-[65px] h-[70dvh] bg-[url('/assets/img/bg-ensyclocardium.jpg')] bg-no-repeat bg-center bg-cover bg-fixed flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Background Image with Animation */}
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
            Ensyclocardium
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
            Sebuah ensiklopedia interaktif tentang jantung dan kehidupan sehat
            layaknya buku digital yang bisa kamu telusuri bab demi bab.
          </p>
          <button onClick={goToHeartAnatomyAndPhysiology} className="mt-8 px-8 py-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            📖 Mulai Membaca
          </button>
        </motion.div>
      </section>

      {/* Topics Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Jelajahi Bab dalam Ensyclocardium
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* {topics.map((topic, idx) => (
              <motion.div
                key={idx}
                className="relative group transform transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Card Shape */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-300 to-pink-400 rounded-2xl shadow-xl group-hover:shadow-2xl transition duration-500"></div>
                <div className="relative p-6 text-center rounded-2xl z-10 bg-white shadow-md group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300">
                  <img
                    src={topic.img}
                    alt={topic.title}
                    className="w-24 h-24 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-red-500 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Temukan informasi lebih lanjut tentang topik ini.
                  </p>
                </div>
              </motion.div> 
            ))} */}
             {topics.map((topic) => (
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
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-pink-100 text-center py-16 px-6">
        <h3 className="text-xl md:text-2xl text-gray-700 font-medium mb-4">
          Temukan wawasan menyeluruh, mulai dari struktur jantung hingga kebiasaan harian yang menjaga kesehatanmu.
        </h3>
        <p className="text-gray-600">
          Ensyclocardium bukan sekadar informasi—ini panduan hidup sehat yang bisa kamu nikmati seperti membuka bab demi bab buku favoritmu.
        </p>
      </section>
    </>
  );
};

export default EnsyclocardiumContent;
