import React, { useState, Suspense, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Helmet } from 'react-helmet';
import {
  FaArrowRight,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaThLarge,
  FaLayerGroup,
  FaShieldAlt,
  FaProjectDiagram,
} from 'react-icons/fa';
import HeartPhysiologyQuiz from './HeartPhysiologyQuiz';
import Heart3DModel from './Heart3DModel';
import FraminghamRunnerGame from './FraminghamRunner';

const HeartAnatomyAndPhysiology: React.FC = () => {
  const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('letak');
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

  const sections = [
    { id: 'letak', title: 'Letak dan Posisi Jantung', icon: <FaMapMarkerAlt /> },
    { id: 'ruang', title: 'Ruang-Ruang Jantung', icon: <FaThLarge /> },
    { id: 'katup', title: 'Katup Jantung & Alur Darah', icon: <FaArrowRight /> },
    { id: 'dinding', title: 'Dinding dan Lapisan Jantung', icon: <FaLayerGroup /> },
    { id: 'perikardium', title: 'Perikardium', icon: <FaShieldAlt /> },
    { id: 'otot', title: 'Otot Jantung & Interkoneksi', icon: <FaProjectDiagram /> },
  ];

  const mainTopics = [
    { id: 'anatomi', title: '1. Anatomi & Struktur Jantung' },
    { id: 'elektrikal', title: '2. Aktivitas Listrik Jantung' },
    { id: 'siklus', title: '3. Siklus Jantung & Kontraksi' },
    { id: 'output', title: '4. Output Jantung & Regulasi' },
    { id: 'koordinasi', title: '5. Penyebaran Eksitasi & Sinkronisasi' },
    { id: 'ekg', title: '6. Elektrokardiogram (EKG/ECG)' },
  ];
  
  
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const openQuizModal = () => setIsQuizModalVisible(true);
  const closeQuizModal = () => setIsQuizModalVisible(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'ruang':
        return (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-2">Ruang-Ruang Jantung</h3>
            <p className="text-gray-700 mb-2">
              Jantung manusia terdiri dari <strong>empat ruang utama</strong>: 
              <em> atrium kanan dan kiri</em> (di bagian atas), serta <em>ventrikel kanan dan kiri</em> (di bagian bawah).
              Keempat ruang ini bekerja sama sebagai <strong>dua pompa sinkron</strong>: 
              sisi kanan untuk <strong>sirkulasi pulmoner</strong>, sisi kiri untuk <strong>sirkulasi sistemik</strong>.
            </p>
            <p className="text-gray-700 mb-2">
              ➤ <strong>Atrium kanan</strong> menerima darah kaya karbon dioksida dari tubuh melalui 
              vena kava superior dan inferior, lalu mengalirkannya ke <strong>ventrikel kanan</strong>. 
              Ventrikel kanan memompa darah ini ke paru-paru melalui arteri pulmonalis untuk proses pertukaran gas.
            </p>
            <p className="text-gray-700 mb-2">
              ➤ Setelah mendapat oksigen di paru-paru, darah kembali ke <strong>atrium kiri</strong> 
              melalui vena pulmonalis, lalu masuk ke <strong>ventrikel kiri</strong> yang memiliki otot dinding paling tebal,
              dan memompa darah ke seluruh tubuh melalui aorta.
            </p>
            <p className="text-gray-700 mb-2">
              ➤ Keempat ruang ini dipisahkan oleh <strong>septum</strong>, sekat otot yang mencegah pencampuran darah
              antara sisi kanan dan kiri. 
            </p>
            <div className="w-full h-52 bg-red-100 rounded-md flex items-center justify-center">
              [GambarDiagramAlurDarah]
            </div>
            <p className="text-gray-700 mt-4">
              Meskipun sisi kiri dan kanan memompa volume darah yang sama, tekanan di sisi kiri jauh lebih tinggi 
              karena harus melawan resistensi sistemik, sehingga <strong>ventrikel kiri lebih tebal</strong> dari kanan.
            </p>
          </>
        );
  
      case 'letak':
        return (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-2">Letak dan Posisi Jantung</h3>
            <p className="text-gray-700 mb-2">
              Jantung terletak di <strong>rongga toraks bagian tengah</strong>, tepatnya dalam <strong>mediastinum</strong>,
              di antara kedua paru-paru, di belakang tulang dada (sternum), dan di depan tulang belakang (vertebra).
            </p>
            <p className="text-gray-700 mb-2">
              Arah orientasi jantung miring: <strong>pangkal jantung (base)</strong> mengarah ke kanan atas dan 
              <strong> ujung bawah (apex)</strong> mengarah ke kiri bawah. 
              Oleh karena itu, denyut jantung terasa di sisi kiri dada.
            </p>
            <div className="w-full h-60 rounded-md flex items-center justify-start">
            <img
                    src="/assets/img/heart-position.jpg"
                    alt="Heart Position"
                    className="h-60"
                  />
            </div>
            <p className="text-gray-700 mt-4">
              Letak ini penting untuk prosedur <strong>CPR</strong> karena memungkinkan kompresi efektif antara 
              sternum dan vertebra, membantu memompa darah saat jantung berhenti.
            </p>
          </>
        );
  
      case 'katup':
        return (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-2">Katup Jantung & Alur Darah</h3>
            <p className="text-gray-700 mb-2">
              Jantung memiliki <strong>empat katup satu arah</strong> yang memastikan aliran darah hanya satu arah:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-2">
              <li><strong>Katup Trikuspid:</strong> antara atrium kanan dan ventrikel kanan</li>
              <li><strong>Katup Pulmonal:</strong> antara ventrikel kanan dan arteri pulmonalis</li>
              <li><strong>Katup Bikuspid (Mitral):</strong> antara atrium kiri dan ventrikel kiri</li>
              <li><strong>Katup Aorta:</strong> antara ventrikel kiri dan aorta</li>
            </ul>
            <p className="text-gray-700 mb-2">
              Katup bekerja berdasarkan <strong>gradien tekanan</strong>: tekanan tinggi dari belakang membuka katup, 
              sedangkan tekanan balik dari depan menutupnya. 
              Katup AV distabilkan oleh <strong>chordae tendineae</strong> dan otot papiler untuk mencegah eversi.
            </p>
            <div className="w-full h-52 bg-red-100 rounded-md flex items-center justify-center">
              [GambarKatupJantung]
            </div>
          </>
        );
  
      case 'dinding':
        return (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-2">Dinding dan Lapisan Jantung</h3>
            <p className="text-gray-700 mb-2">
              Dinding jantung terdiri dari tiga lapisan utama yang bekerja secara sinergis:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-2">
              <li><strong>Endokardium:</strong> lapisan epitel halus yang melapisi bagian dalam ruang jantung</li>
              <li><strong>Miokardium:</strong> lapisan otot utama yang menghasilkan kekuatan kontraksi</li>
              <li><strong>Epikardium:</strong> lapisan luar yang melindungi permukaan jantung</li>
            </ul>
            <p className="text-gray-700 mb-2">
              <strong>Miokardium ventrikel kiri</strong> jauh lebih tebal dari kanan karena memompa darah ke seluruh tubuh
              (sistemik), sedangkan kanan hanya ke paru-paru (pulmoner).
            </p>
            <div className="w-full h-52 bg-red-100 rounded-md flex items-center justify-center">
              [GambarIrisanDindingJantung]
            </div>
          </>
        );
  
      case 'perikardium':
        return (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-2">Perikardium</h3>
            <p className="text-gray-700 mb-2">
              Jantung dilindungi oleh <strong>kantung perikardial</strong> yang terdiri dari:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-2">
              <li><strong>Lamina fibrosa:</strong> lapisan luar yang kuat dan melindungi dari trauma fisik</li>
              <li><strong>Lamina serosa:</strong> terdiri dari parietal dan viseral (epikardium)</li>
            </ul>
            <p className="text-gray-700 mb-2">
              Di antara kedua lapisan terdapat <strong>cairan perikardial</strong> yang mencegah gesekan.
              Peradangan pada perikardium disebut <em>perikarditis</em> dan bisa menyebabkan nyeri saat bernapas.
            </p>
            <div className="w-full h-52 bg-red-100 rounded-md flex items-center justify-center">
              [GambarLapisanPerikardium]
            </div>
          </>
        );
  
      case 'otot':
        return (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-2">Otot Jantung & Interkoneksi Sel</h3>
            <p className="text-gray-700 mb-2">
              Otot jantung terdiri dari <strong>sel-sel otot kardiak</strong> yang saling terhubung melalui <strong>diskus interkalaris</strong>.
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-2">
              <li><strong>Desmosom:</strong> memperkuat koneksi mekanik antar sel agar tidak robek saat kontraksi</li>
              <li><strong>Gap junction:</strong> memungkinkan sinyal listrik menyebar cepat, membentuk <em>sinkitium fungsional</em></li>
            </ul>
            <p className="text-gray-700 mb-2">
              Serabut otot tersusun secara spiral, menciptakan gerakan “memeras” dari apex ke atas saat kontraksi,
              sehingga darah terdorong efisien ke arteri besar.
            </p>
            <div className="w-full h-52 bg-red-100 rounded-md flex items-center justify-center">
              [GambarDiskusInterkalaris]
            </div>
          </>
        );
  
      default:
        return null;
    }
  };  

  return (
    <>
      <Helmet>
        <title>Anatomi & Fisiologi Jantung | Cardium</title>
      </Helmet>

      <h1 className="text-3xl font-bold tracking-widest uppercase ml-4 mr-4 mb-4">
        <span className="cardium-text">Anatomi & Fisiologi Jantung</span>
      </h1>

      <section className="w-full bg-gradient-to-br from-red-50 to-pink-50 p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Konten utama */}
          <div className="w-full md:w-2/3 bg-white rounded-xl p-6 shadow-md space-y-8">
          <h2 className="text-2xl font-bold text-red-600 flex items-center gap-4">
            <button
                onClick={() => window.history.back()}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Kembali"
            >
                <FaArrowLeft className="text-xl" />
            </button>
                Anatomi & Fisiologi Jantung
            </h2>

            <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
              <Heart3DModel />
            </div>

            <div className="transition-all duration-300 space-y-4 text-justify">
              {renderContent()}
            </div>

            <div className="text-center mt-10">
              <Button
                onClick={openQuizModal}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md"
              >
                Coba Quiz Interaktif
              </Button>
            </div>

            <Modal
              title="Mini Quiz: Anatomi & Fisiologi Jantung"
              open={isQuizModalVisible}
              onCancel={closeQuizModal}
              footer={null}
              centered
              destroyOnClose
            >
              <Suspense fallback={<div>Memuat quiz...</div>}>
                <HeartPhysiologyQuiz />
              </Suspense>
            </Modal>
          </div>

          {/* Navigasi */}
          <div className="w-full md:w-1/3 sticky top-4 space-y-4 h-fit">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg font-bold text-red-500 mb-3">Navigasi Cepat</h3>
              <div className="flex flex-col gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-left font-medium text-sm ${
                      activeSection === section.id
                        ? 'bg-red-100 text-red-600 font-semibold'
                        : 'hover:bg-red-50 text-gray-700'
                    }`}
                  >
                    {section.icon} {section.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="text-lg font-bold text-maintheme mb-3">Sub Topik Anatomi dan Fisiologi Jantung</h3>
              <div className="flex flex-col gap-3">
                {mainTopics.map((section) => (
                  <button
                    key={section.id}
                    //onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-left font-medium text-sm ${
                      section.id === 'anatomi'
                        ? 'bg-pink-200 text-maintheme font-semibold'
                        : 'hover:bg-red-50 text-gray-700'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
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
    </>
  );
};

export default HeartAnatomyAndPhysiology;
