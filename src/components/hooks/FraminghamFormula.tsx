type Gender = 'male' | 'female';

interface RiskInput {
  gender: Gender;
  age: number;
  totalChol: number;
  hdl: number;
  sbp: number; // systolic blood pressure
  onHypertensionMed: boolean;
  smoker: boolean;
}

export function calculateFraminghamRisk(input: RiskInput): {
  riskPercentage: number;
  category: string;
  recommendation: string;
} {
  const {
    gender,
    age,
    totalChol,
    hdl,
    sbp,
    onHypertensionMed,
    smoker,
  } = input;

  const lnAge = Math.log(age > (gender === 'male' ? 70 : 78) ? (gender === 'male' ? 70 : 78) : age);
  const lnChol = Math.log(totalChol);
  const lnHDL = Math.log(hdl);
  const lnSBP = Math.log(sbp);

  const lnAge2 = lnAge ** 2;
  const smokerVal = smoker ? 1 : 0;
  const medVal = onHypertensionMed ? 1 : 0;

  let L = 0;
  let base = 1;

  if (gender === 'male') {
    // koefisien pria
    L =
      52.00961 * lnAge +
      20.014077 * lnChol +
      -0.905964 * lnHDL +
      1.305784 * lnSBP +
      0.241549 * medVal +
      12.096316 * smokerVal +
      -4.605038 * lnAge * lnChol +
      -2.84367 * lnAge * smokerVal +
      -2.93323 * lnAge2 -
      172.300168;

    base = 0.9402;
  } else {
    // koefisien wanita
    L =
      31.764001 * lnAge +
      22.465206 * lnChol +
      -1.187731 * lnHDL +
      2.552905 * lnSBP +
      0.420251 * medVal +
      13.07543 * smokerVal +
      -5.060998 * lnAge * lnChol +
      -2.996945 * lnAge * smokerVal -
      146.5933061;

    base = 0.98767;
  }

  const risk = 1 - Math.pow(base, Math.exp(L));
  const riskPercentage = +(risk * 100).toFixed(1);

  let category = '';
  let recommendation = '';

  if (riskPercentage < 10) {
    category = 'Rendah';
    recommendation = `Risiko rendah. Pertahankan gaya hidup sehat seperti olahraga teratur, diet seimbang, dan tidak merokok.`;
  } else if (riskPercentage < 20) {
    category = 'Sedang';
    recommendation = `Risiko sedang. Mulai pertimbangkan perubahan gaya hidup dan diskusikan lebih lanjut dengan tenaga medis.`;
  } else {
    category = 'Tinggi';
    recommendation = `Risiko tinggi. Dianjurkan melakukan pemeriksaan klinis lanjutan, kontrol tekanan darah, dan intervensi medis.`;
  }

  return {
    riskPercentage,
    category,
    recommendation,
  };
}
