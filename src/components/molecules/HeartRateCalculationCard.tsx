import { useState } from "react";

const HeartRateCalculationCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="drilldown-card">
      <div className="header" onClick={() => setOpen(!open)}>
        <h3 className="title">FORMULA PERHITUNGAN DENYUT JANTUNG MAKSIMUM (HRmax)</h3>
        <span className={`chevron ${open ? "rotate" : ""}`}>&#9660;</span>
      </div>

      <div className={`content ${open ? "open" : ""}`}>
        <p className="mb-6">
          Denyut Jantung Maksimum (<strong>HRmax</strong>) adalah jumlah denyut jantung tertinggi yang dapat dicapai seseorang selama aktivitas fisik maksimal. HRmax digunakan untuk menentukan zona latihan jantung (heart rate zones) yang efektif dan aman dalam latihan kardiovaskular.
        </p>

        <h3 className="text-xl font-semibold mb-2">1. Rumus Perhitungan HRmax</h3>
        <p className="mb-4">
          Berikut beberapa rumus ilmiah yang sering digunakan untuk memperkirakan HRmax berdasarkan usia:
        </p>

        <ul className="list-disc list-inside mb-6 text-sm space-y-4">
  <li>
    <strong>NES Formula (Norwegian Exercise Study)</strong> <br />
    <code>HRmax = 211 − 0.64 × usia</code><br />
    <span className="text-gray-600">
      Formula ini dikembangkan dari studi observasional di Norwegia dengan populasi dewasa aktif secara fisik.
      Koefisien <code>0.64</code> mencerminkan penurunan HRmax secara fisiologis yang lebih moderat per tahun dibandingkan rumus tradisional.
      Akurat untuk populasi Eropa yang aktif, dan lebih cocok bagi mereka dengan kebugaran sedang hingga tinggi.
    </span><br />
    <em>Rekomendasi: cocok untuk populasi umum usia dewasa aktif (baik pria maupun wanita).</em>
  </li>

  <li>
    <strong>Tanaka et al. (2001, JACC)</strong><br />
    <code>HRmax = 208 − 0.7 × usia</code><br />
    <span className="text-gray-600">
      Rumus ini lahir dari meta-analisis 351 studi yang mencakup lebih dari 18.000 individu. Diperkenalkan sebagai pengganti rumus klasik <code>220 - usia</code> karena terbukti lebih akurat secara statistik.
      Koefisien <code>0.7</code> mencerminkan estimasi penurunan linear HRmax tiap tahun seiring bertambahnya usia.
    </span><br />
    <em>Rekomendasi: ideal untuk populasi umum, baik pemula maupun atlet rekreasi.</em>
  </li>

  <li>
    <strong>Gulati et al. (2010, Circulation)</strong> <em>(khusus wanita)</em><br />
    <code>HRmax = 206 − 0.88 × usia</code><br />
    <span className="text-gray-600">
      Dikembangkan dari studi terhadap lebih dari 5.400 wanita sehat di Amerika Serikat yang menjalani treadmill test.
      Koefisien <code>0.88</code> menunjukkan bahwa penurunan HRmax pada wanita cenderung lebih curam dibanding pria.
      Ini menjadikan rumus ini lebih akurat dalam memberikan estimasi spesifik gender.
    </span><br />
    <em>Rekomendasi: sebaiknya digunakan oleh wanita dewasa dan lansia yang aktif secara kardiovaskular.</em>
  </li>
</ul>

        <h3 className="text-xl font-semibold mb-2">2. Contoh Perhitungan</h3>
        <p className="mb-6">
          Misalkan usia Anda adalah <strong>30 tahun</strong>, maka estimasi HRmax Anda adalah:
          <br />
          • NES: 211 − 0.64 × 30 = <strong>192.8 bpm</strong> <br />
          • Tanaka: 208 − 0.7 × 30 = <strong>187 bpm</strong> <br />
          • Gulati (wanita): 206 − 0.88 × 30 = <strong>179.6 bpm</strong>
        </p>

        <h3 className="text-xl font-semibold mb-2">3. Zona Latihan Berdasarkan HRmax</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-3 py-2">Zona</th>
                <th className="border px-3 py-2">Persentase HRmax</th>
                <th className="border px-3 py-2">Tujuan Latihan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-1">Zona 1</td>
                <td className="border px-3 py-1">50–60%</td>
                <td className="border px-3 py-1">Pemulihan dan pemanasan ringan</td>
              </tr>
              <tr>
                <td className="border px-3 py-1">Zona 2</td>
                <td className="border px-3 py-1">60–70%</td>
                <td className="border px-3 py-1">Pembakaran lemak & daya tahan dasar</td>
              </tr>
              <tr>
                <td className="border px-3 py-1">Zona 3</td>
                <td className="border px-3 py-1">70–80%</td>
                <td className="border px-3 py-1">Latihan aerobik</td>
              </tr>
              <tr>
                <td className="border px-3 py-1">Zona 4</td>
                <td className="border px-3 py-1">80–90%</td>
                <td className="border px-3 py-1">Peningkatan performa dan ambang anaerob</td>
              </tr>
              <tr>
                <td className="border px-3 py-1">Zona 5</td>
                <td className="border px-3 py-1">90–100%</td>
                <td className="border px-3 py-1">Latihan intensitas maksimal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-2">4. Keterbatasan Estimasi HRmax</h3>
        <p className="mb-6 text-sm">
          Rumus-rumus HRmax memberikan estimasi, bukan angka pasti. HRmax dapat dipengaruhi oleh:
        </p>
        <ul className="list-disc list-inside mb-6 text-sm space-y-1">
          <li>Genetika</li>
          <li>Kondisi kesehatan</li>
          <li>Kebugaran fisik dan jenis kelamin</li>
          <li>Obat-obatan (misalnya beta-blocker)</li>
        </ul>
        <p className="mb-6 text-sm">
          Untuk akurasi tinggi, tes treadmill atau uji jantung secara langsung di bawah pengawasan medis sangat dianjurkan.
        </p>

        <h3 className="text-xl font-semibold mb-2">Referensi</h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Tanaka H, Monahan KD, Seals DR. <em>Age-predicted maximal heart rate revisited</em>. JACC. 2001;37(1):153–156.</li>
          <li>Gulati M, et al. <em>Heart rate response to exercise stress testing in asymptomatic women</em>. Circulation. 2010;122(2):130–137.</li>
          <li>Støylen A, et al. <em>Maximal heart rate prediction in healthy adults – the NES formula</em>. NTNU Research, 2022.</li>
        </ul>
      </div>
    </div>
  );
};

export default HeartRateCalculationCard;
