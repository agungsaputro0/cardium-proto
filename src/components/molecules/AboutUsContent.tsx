import { FC } from "react";
import { Helmet } from "react-helmet";

const teamMembers = [
  { name: "Agung B Saputro", img: "/assets/img/team/ABS.jpeg", role: "Developer" },
  { name: "Andi Nugroho", img: "/assets/img/team/AN.png", role: "Team Leader" },
  { name: "Putri Prama Ananta", img: "/assets/img/team/PPA.jpg", role: "Conceptor - UI/UX Designer" },
];

const AboutUsContent: FC = () => {

  return (
    <>
      <Helmet>
        <title>Tentang Kami - Cardium</title>
      </Helmet>
      <section className="pt-[65px] flex justify-center">
        <div className="w-full">
          <div className="w-full max-w-full">
            {/* Hero Section */}
            <div style={{
               backgroundImage: "url('/assets/img/about-us-hero.png')", 
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               color: 'white',
               paddingTop: '7rem', 
               paddingBottom: '7rem',
               textAlign: 'center',
            }}>
            <h1 
                style={{ marginLeft: '10px', marginRight: '10px' }} 
                className="text-3xl font-bold tracking-widest uppercase"
                >
                <span className="cardium-text">Cardium</span> 
                <span className="slogan-text">- Prioritaskan Kesehatan Jantung</span>
            </h1>
              <p style={{marginLeft: '10px', marginRight: '10px'}} className="text-xl mt-4">Meningkatkan Kesadaran & Perawatan Pencegahan</p>
            </div>

            {/* About Us Section */}
            <section className="bg-white py-16 px-4 md:px-32 text-center">

                {/* Ikon pemisah */}
                <div className="flex justify-center items-center mb-2 pt-2">
                    <div className="w-16 h-px bg-gray-300"></div>
                    <div className="mx-4 text-red-500 text-2xl">
                        <img src="/assets/img/cardium.png" className="w-20 h-20" />
                    </div>
                    <div className="w-16 h-px bg-gray-300"></div>
                </div>
                <h2 className="text-gray-800 mb-4 text-3xl font-semibold">Tentang Cardium</h2>
                <p style={{ fontSize: '1.02em'}} className="text-gray-600 w-full pb-2">
                    Cardium berkomitmen untuk menyediakan informasi kesehatan jantung yang mudah diakses. Misi kami adalah
                    meningkatkan kesadaran tentang kesehatan kardiovaskular, mendidik individu mengenai pencegahan, dan
                    mendukung pilihan gaya hidup sehat. Dengan tim ahli kami, kami bertujuan untuk memberdayakan masyarakat
                    agar dapat mengendalikan kesehatan jantung mereka.
                </p>
            </section>

            {/* Meet the Team Section */}
            <section className="bg-pink-100 py-2 px-4 md:px-20 text-center">
              <h3 className="text-gray-800 mb-4 text-2xl font-bold pt-8 pb-2">Kenali Tim Kami</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 pb-8 md:grid-cols-3 gap-8 justify-items-center">
                {teamMembers.map((person, index) => (
                  <div key={index} className="hover:scale-105 transition-transform duration-300">
                    <div style={{
                      width: '128px',
                      height: '128px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #ccc',
                      backgroundColor: '#f0f0f0',
                      margin: '0 auto',
                    }}>
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-4 font-medium text-gray-700">{person.name}</p>
                    <p className="text-sm text-gray-500">{person.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Mission and Vision Section */}
            <section style={{backgroundColor: '#f7d2dc'}} className="pt-8 px-4 md:px-32 text-center">
            <h3 className="text-gray-800 text-3xl pb-8 font-semibold">Komitmen Kami</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 pb-10">
                {[
                    {
                    title: "Edukasi Kardiovaskular",
                    img: "/assets/img/edukasi.png",
                    desc: "Kami menyediakan informasi kesehatan jantung yang akurat dan mudah dipahami untuk mendukung keputusan yang tepat.",
                    },
                    {
                    title: "Gaya Hidup Sehat",
                    img: "/assets/img/healthy.png",
                    desc: "Mendorong penerapan pola hidup sehat yang realistis dan preventif, berdasarkan pendekatan ilmiah dan kebutuhan masyarakat.",
                    },
                    {
                    title: "Komunitas Peduli",
                    img: "/assets/img/komunitas.png",
                    desc: "Membentuk ruang kolaborasi dan dukungan antarindividu untuk bersama menjaga kesehatan jantung secara berkelanjutan.",
                    },
                ].map((card, index) => (
                    <div
                    key={index}
                    className="bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center text-center min-h-[340px]"
                    >
                    <h4 className="text-xl font-semibold text-red-600 mb-4">{card.title}</h4>
                    <img
                        style={{width: '128px', height: '128px'}}
                        src={card.img}
                        alt={card.title}
                        className="w-32 h-32 object-contain mb-4"
                    />
                    <p className="text-gray-700 text-base leading-relaxed">{card.desc}</p>
                    </div>
                ))}
                </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsContent;
