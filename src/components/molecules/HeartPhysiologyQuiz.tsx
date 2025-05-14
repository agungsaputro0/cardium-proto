import React, { useState } from 'react';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const HeartPhysiologyQuiz: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-red-600 mb-3">
        🧠 Quiz: Anatomi & Struktur Jantung
      </h3>
      <p className="text-gray-800 mb-4">
        <strong>1.</strong> Di manakah letak <span className="text-red-500 font-semibold">katup mitral</span>?
      </p>

      <div className="grid gap-3 mb-6">
        {[
          { label: 'Antara atrium kanan dan ventrikel kanan', value: 'salah1' },
          { label: 'Antara atrium kiri dan ventrikel kiri', value: 'benar' },
          { label: 'Di dalam arteri pulmonalis', value: 'salah2' },
        ].map((option) => (
          <label
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`cursor-pointer px-4 py-3 rounded-md border flex items-center justify-between transition-all
              ${
                selected === option.value
                  ? 'bg-red-100 border-red-400 text-red-700'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
              }`}
          >
            <span>{option.label}</span>
            {selected === option.value && (
              <FaCheckCircle className="text-red-500 ml-2" />
            )}
          </label>
        ))}
      </div>

      <button
        disabled={!selected}
        className={`flex items-center gap-2 px-5 py-2 rounded-md text-white transition-all
          ${
            selected
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
      >
        Selanjutnya
        <FaArrowRight />
      </button>
    </div>
  );
};

export default HeartPhysiologyQuiz;
