import { useState } from 'react';

const FraminghamFormula = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="drilldown-card">
      <div 
        className="header"
        onClick={() => setOpen(!open)}
      >
        <h3 className="title">
          FORMULA PERHITUNGAN RISIKO PENYAKIT JANTUNG
        </h3>
        <span className={`chevron ${open ? 'rotate' : ''}`}>&#9660;</span>
      </div>

      <div className={`content ${open ? 'open' : ''}`}>
        <p className="mb-6">
          Perhitungan risiko penyakit jantung koroner (PJK) 10 tahun menggunakan formula Framingham berdasarkan faktor-faktor klinis. Rumus berbeda untuk pria dan wanita, dan menggunakan koefisien spesifik (β) untuk tiap variabel.
        </p>

        <h3 className="text-xl font-semibold mb-2">1. Rumus untuk Pria</h3>
        <p className="mb-4">
          L<sub>Pria</sub> = β × ln(Usia) + β × ln(Kolesterol Total) + β × ln(HDL) + β × ln(Tekanan Darah Sistolik) + β × Obat Hipertensi + β × Perokok + β × ln(Usia) × ln(Kolesterol Total) + β × ln(Usia) × Perokok + β × ln(Usia)² - 172.300168
        </p>
        <p className="mb-6">
          P<sub>Pria</sub> = 1 - 0.9402<sup>L<sub>Pria</sub></sup>
        </p>

        <h3 className="text-xl font-semibold mb-2">2. Rumus untuk Wanita</h3>
        <p className="mb-4">
          L<sub>Wanita</sub> = β × ln(Usia) + β × ln(Kolesterol Total) + β × ln(HDL) + β × ln(Tekanan Darah Sistolik) + β × Obat Hipertensi + β × Perokok + β × ln(Usia) × ln(Kolesterol Total) + β × ln(Usia) × Perokok - 146.5933061
        </p>
        <p className="mb-6">
          P<sub>Wanita</sub> = 1 - 0.98767<sup>L<sub>Wanita</sub></sup>
        </p>

        <h3 className="text-xl font-semibold mb-4">3. Koefisien (β) Tiap Variabel</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Variabel</th>
                <th className="border px-3 py-2 text-left">Pria (β)</th>
                <th className="border px-3 py-2 text-left">Wanita (β)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-3 py-1">ln(Usia)</td><td className="border">52.00961</td><td className="border">31.764001</td></tr>
              <tr><td className="border px-3 py-1">ln(Kolesterol Total)</td><td className="border">20.014077</td><td className="border">22.465206</td></tr>
              <tr><td className="border px-3 py-1">ln(HDL)</td><td className="border">-0.905964</td><td className="border">-1.187731</td></tr>
              <tr><td className="border px-3 py-1">ln(Tekanan Sistolik)</td><td className="border">1.305784</td><td className="border">2.552905</td></tr>
              <tr><td className="border px-3 py-1">Obat Hipertensi*</td><td className="border">0.241549</td><td className="border">0.420251</td></tr>
              <tr><td className="border px-3 py-1">Perokok*</td><td className="border">12.096316</td><td className="border">13.07543</td></tr>
              <tr><td className="border px-3 py-1">ln(Usia) × ln(Kolesterol Total)</td><td className="border">-4.605038</td><td className="border">-5.060998</td></tr>
              <tr><td className="border px-3 py-1">ln(Usia) × Perokok**</td><td className="border">-2.84367</td><td className="border">-2.996945</td></tr>
              <tr><td className="border px-3 py-1">ln(Usia)²</td><td className="border">-2.93323</td><td className="border">-</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm mb-6">
          * Ya = 1, Tidak = 0 <br></br>
          ** Jika usia `&gt;` 70 tahun (pria) gunakan ln(70); jika `&gt;` 78 tahun (wanita) gunakan ln(78)
        </p>

        <h3 className="text-xl font-semibold mb-2">4. Interpretasi Umur dan Risiko Rata-rata 10 Tahun</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-3 py-2">Usia</th>
                <th className="border px-3 py-2">Wanita (rata-rata)</th>
                <th className="border px-3 py-2">Pria (rata-rata)</th>
                <th className="border px-3 py-2">Wanita (risiko rendah)</th>
                <th className="border px-3 py-2">Pria (risiko rendah)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-3 py-1">30-34</td><td className="border">&lt;1%</td><td className="border">1%</td><td className="border">&lt;1%</td><td className="border">2%</td></tr>
              <tr><td className="border px-3 py-1">35-39</td><td className="border">&lt;1%</td><td className="border">4%</td><td className="border">1%</td><td className="border">3%</td></tr>
              <tr><td className="border px-3 py-1">40-44</td><td className="border">1%</td><td className="border">4%</td><td className="border">2%</td><td className="border">4%</td></tr>
              <tr><td className="border px-3 py-1">45-49</td><td className="border">2%</td><td className="border">8%</td><td className="border">3%</td><td className="border">4%</td></tr>
              <tr><td className="border px-3 py-1">50-54</td><td className="border">3%</td><td className="border">10%</td><td className="border">5%</td><td className="border">6%</td></tr>
              <tr><td className="border px-3 py-1">55-59</td><td className="border">7%</td><td className="border">13%</td><td className="border">7%</td><td className="border">7%</td></tr>
              <tr><td className="border px-3 py-1">60-64</td><td className="border">8%</td><td className="border">20%</td><td className="border">8%</td><td className="border">9%</td></tr>
              <tr><td className="border px-3 py-1">65-69</td><td className="border">8%</td><td className="border">22%</td><td className="border">8%</td><td className="border">11%</td></tr>
              <tr><td className="border px-3 py-1">70-74</td><td className="border">11%</td><td className="border">25%</td><td className="border">8%</td><td className="border">14%</td></tr>
              <tr><td className="border px-3 py-1">75-79</td><td colSpan={4} className="text-center">Data tidak tersedia</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm mb-8">* Risiko tidak termasuk angina pektoris.<br></br>** Risiko rendah dihitung dengan tekanan darah optimal, kolesterol LDL 100–129 mg/dL atau kolesterol total 160–199 mg/dL, HDL 45 mg/dL (pria) atau 55 mg/dL (wanita), tidak merokok, dan tanpa diabetes.</p>

        <h3 className="text-xl font-semibold mb-2">Referensi</h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Wilson PW, et al. <em>Prediction of Coronary Heart Disease Using Risk Factor Categories</em>. Circulation. 1998; 97(18):1837-1847.</li>
          <li>Sytkowski PA, et al. <em>Changes in risk factors and the decline in mortality from cardiovascular disease. Framingham Heart Study</em>. N Engl J Med. 1990; 322(23):1635-1641.</li>
          <li>Benjamin EJ, et al. <em>Independent Risk Factors for Atrial Fibrillation</em>. JAMA. 1994; 271(11):840–844.</li>
        </ul>
      </div>
    </div>
  );
};

export default FraminghamFormula;
