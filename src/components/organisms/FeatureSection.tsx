import TabCard from "../atoms/TabCard";

const features = [
  { image: "../../../assets/img/tab/calculator.png", title: "Kalkulator Risiko Jantung", description: "Hitung risiko penyakit jantung berdasarkan gaya hidup dan riwayat kesehatanmu." },
  { image: "../../../assets/img/tab/forum.png", title: "Forum & Saran Kesehatan", description: "Bergabunglah dengan komunitas dan dapatkan rekomendasi kesehatan jantung." },
  { image: "../../../assets/img/tab/edukasi.png", title: "Ensiklopedi Jantung", description: "Jelajahi anatomi jantung dan simulasi interaktif detak jantung." },
  { image: "../../../assets/img/tab/exercise.png", title: "Latihan & Perkembangan", description: "Temukan latihan terbaik dan pantau dampaknya terhadap kesehatan jantung." },
  { image: "../../../assets/img/tab/event.png", title: "Event & Webinar", description: "Ikuti acara seputar gaya hidup sehat untuk jantung." }
];

const FeatureSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-[#d90429] text-2xl font-semibold mb-8 text-center font-extrabold">
        FITUR UTAMA KAMI
      </h2>

      {/* Tampilan Desktop */}
      <div className="hidden sm:grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div className="flex justify-center" key={index}>
            <TabCard image={feature.image} title={feature.title} description={feature.description} />
          </div>
        ))}
      </div>

      {/* Tampilan Mobile (Carousel) */}
      <div className="sm:hidden overflow-x-auto flex gap-4 mt-8 px-6 py-4 scrollbar-hide snap-x snap-mandatory relative">
        {features.map((feature, index) => (
          <div key={index} className="flex-shrink-0 w-4/5 snap-center px-2">
            <TabCard image={feature.image} title={feature.title} description={feature.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
