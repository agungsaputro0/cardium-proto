import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const stories = [
  { video: "https://www.example.com/video1.mp4", title: "Bangkit dari Serangan Jantung", name: "Budi Santoso", description: "Budi berbagi perjalanan pemulihannya setelah serangan jantung mendadak di usia 45 tahun." },
  { video: "https://www.example.com/video2.mp4", title: "Menjalani Hidup dengan Penyakit Jantung", name: "Siti Rahma", description: "Siti tetap aktif dan sehat meskipun didiagnosis dengan penyakit jantung bawaan." },
  { video: "https://www.example.com/video3.mp4", title: "Perubahan Gaya Hidup yang Menyelamatkan", name: "Agus Wijaya", description: "Bagaimana perubahan pola makan dan olahraga membantu Agus mengatasi risiko jantung koroner." },
  { video: "https://www.example.com/video4.mp4", title: "Melawan Penyakit Jantung dengan Semangat", name: "Rina Dewi", description: "Rina berbagi kisah inspiratifnya dalam menghadapi gagal jantung." }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } }
  ]
};

const TheirStories: React.FC = () => {
  return (
    <div className="w-full mx-auto px-10 py-12 bg-pink-50 rounded-lg shadow-md">
      <h2 className="text-[#d90429] text-2xl font-semibold mb-8 text-center font-extrabold">
        CERITA MEREKA
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Kisah nyata dari mereka yang berhasil melewati tantangan penyakit jantung.
      </p>
      
      <Slider {...settings}>
        {stories.map((story, index) => (
          <div key={index} className="p-4">
            <div className="relative group cursor-pointer">
              <video
                src={story.video}
                className="w-full h-56 rounded-lg shadow-lg group-hover:opacity-80 transition duration-300"
                controls
              />
              <FaPlayCircle className="absolute inset-0 m-auto text-white text-6xl opacity-80 group-hover:opacity-100" />
            </div>
            <h3 className="text-lg font-bold mt-4 text-center">{story.title}</h3>
            <p className="text-sm text-gray-600 mt-1 text-center">{story.name}</p>
            <p className="text-sm text-gray-500 mt-2 text-center">{story.description}</p>
          </div>
        ))}
      </Slider>
      
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md text-sm text-gray-700 text-center">
        <p>
          <strong>Disclaimer:</strong> Kesaksian ini berdasarkan pengalaman pribadi dan bukan pengganti nasihat medis. 
          Gejala penyakit jantung dapat bervariasi pada setiap individu. Jika Anda mengalami gejala yang mencurigakan, 
          segera konsultasikan dengan dokter atau kunjungi unit gawat darurat terdekat.
        </p>
      </div>
    </div>
  );
};

export default TheirStories;
