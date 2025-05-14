import { useState } from 'react';

const BMICalculationCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="drilldown-card">
      <div 
        className="header"
        onClick={() => setOpen(!open)}
      >
        <h3 className="title">
          FORMULA PERHITUNGAN INDEKS MASSA TUBUH (BMI)
        </h3>
        <span className={`chevron ${open ? 'rotate' : ''}`}>&#9660;</span>
      </div>

      <div className={`content ${open ? 'open' : ''}`}>
        <p className="mb-6">
          Indeks Massa Tubuh (Body Mass Index/BMI) adalah ukuran yang digunakan untuk mengklasifikasikan status berat badan seseorang berdasarkan tinggi dan berat badan. Meski sederhana, BMI memberikan indikasi awal terhadap risiko kesehatan, termasuk penyakit jantung, hipertensi, dan diabetes tipe 2.
        </p>

        <h3 className="text-xl font-semibold mb-2">1. Rumus Perhitungan BMI</h3>
        <p className="mb-4">
          <strong>BMI = Berat Badan (kg) / (Tinggi Badan (m))²</strong>
        </p>
        <p className="mb-6">
          Contoh: Jika berat badan 70 kg dan tinggi badan 1,75 m, maka:
          <br />
          BMI = 70 / (1,75 × 1,75) = 70 / 3,06 = <strong>22,86</strong>
        </p>

        <h3 className="text-xl font-semibold mb-2">2. Kategori BMI Menurut WHO (Dewasa)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-3 py-2">Kategori</th>
                <th className="border px-3 py-2">BMI (kg/m²)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-3 py-1">Kurus (Underweight)</td><td className="border"> &lt; 18,5 </td></tr>
              <tr><td className="border px-3 py-1">Normal</td><td className="border"> 18,5 – 24,9 </td></tr>
              <tr><td className="border px-3 py-1">Berat Badan Lebih (Overweight)</td><td className="border"> 25,0 – 29,9 </td></tr>
              <tr><td className="border px-3 py-1">Obesitas Kelas I</td><td className="border"> 30,0 – 34,9 </td></tr>
              <tr><td className="border px-3 py-1">Obesitas Kelas II</td><td className="border"> 35,0 – 39,9 </td></tr>
              <tr><td className="border px-3 py-1">Obesitas Kelas III (Morbid)</td><td className="border"> ≥ 40,0 </td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-2">3. Risiko Kesehatan Terkait BMI</h3>
        <p className="mb-4">
          BMI yang lebih tinggi atau lebih rendah dari normal dikaitkan dengan peningkatan risiko penyakit. Berikut korelasi umum antara BMI dan risiko kesehatan:
        </p>
        <ul className="list-disc list-inside mb-6 text-sm space-y-1">
          <li><strong>BMI &lt; 18,5:</strong> Risiko malnutrisi, anemia, osteoporosis, dan gangguan imun.</li>
          <li><strong>18,5 – 24,9:</strong> Risiko kesehatan minimal (kategori sehat).</li>
          <li><strong>25 – 29,9:</strong> Peningkatan risiko penyakit jantung, tekanan darah tinggi, dan diabetes tipe 2.</li>
          <li><strong>&ge; 30:</strong> Risiko signifikan untuk penyakit jantung koroner, stroke, sleep apnea, dan kanker tertentu.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">4. Keterbatasan BMI</h3>
        <p className="mb-6 text-sm">
          Meskipun BMI adalah indikator praktis, ia tidak mempertimbangkan komposisi tubuh (otot vs lemak), usia, jenis kelamin, dan etnis. Misalnya, atlet dapat memiliki BMI tinggi karena massa otot, bukan lemak. Oleh karena itu, BMI sebaiknya dikombinasikan dengan ukuran lain seperti lingkar pinggang, persentase lemak tubuh, dan pemeriksaan klinis.
        </p>

        <h3 className="text-xl font-semibold mb-2">5. Interpretasi Tambahan untuk Asia (WHO Asia-Pacific)</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-3 py-2">Kategori</th>
                <th className="border px-3 py-2">BMI (kg/m²)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-3 py-1">Normal (risiko rendah)</td><td className="border"> 18,5 – 22,9 </td></tr>
              <tr><td className="border px-3 py-1">Overweight (berisiko)</td><td className="border"> 23 – 24,9 </td></tr>
              <tr><td className="border px-3 py-1">Obesitas I</td><td className="border"> 25 – 29,9 </td></tr>
              <tr><td className="border px-3 py-1">Obesitas II</td><td className="border"> ≥ 30 </td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm mb-8">
          *Kriteria Asia lebih ketat karena risiko penyakit metabolik meningkat pada BMI lebih rendah dibanding populasi Barat.
        </p>

        <h3 className="text-xl font-semibold mb-2">Referensi</h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>WHO Expert Consultation. <em>Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies</em>. The Lancet. 2004; 363(9403):157-163.</li>
          <li>National Heart, Lung, and Blood Institute. <em>Classification of Overweight and Obesity by BMI, Waist Circumference, and Associated Disease Risks</em>. NIH Publication No. 98-4083.</li>
          <li>World Health Organization. <em>Obesity: Preventing and Managing the Global Epidemic</em>. WHO Technical Report Series, No. 894, 2000.</li>
        </ul>
      </div>
    </div>
  );
};

export default BMICalculationCard;
