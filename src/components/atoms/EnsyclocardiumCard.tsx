import React from 'react';
import '../../card.css';
import { useNavigate } from 'react-router-dom';

interface EnsyclocardiumCardProps {
  title: string;
  description: string;
  imageUrl: string;
  redirectUrl: string;
  theme?: string;
  theme2?: string;
}

const EnsyclocardiumCard: React.FC<EnsyclocardiumCardProps> = ({
  title,
  description,
  imageUrl,
  redirectUrl,
  theme = '#c40d43',
  theme2 = '#c40d43'
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectUrl); // tanpa reload halaman
  };


  return (
    <div
      style={{ backgroundColor: theme2 }}
      className="card  mx-auto overflow-hidden rounded-lg shadow-lg max-h-[300px]" // Tambahkan max-h di sini juga
    >
      <div className="flip-card">
        <div className="flip-card__container">
          {/* FRONT SIDE */}
          <div className="card-front">
            <div className={`card-front__tp bg-[${theme}] text-white`}>
              <img
                src={imageUrl}
                alt={title}
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
              <h2 className="card-front__heading text-xl font-semibold mt-2 text-center text-maintheme">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 overflow-hidden flex flex-col h-full"> {/* Gunakan flex dan h-full */}
        <div className="bg-[url('/assets/img/bg-cardium.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-lg p-4 flex-grow overflow-y-auto"> {/* flex-grow untuk mengambil ruang */}
          <div className="inside-page__container">
            <h3 className={`inside-page__heading text-${theme}-600 font-semibold`}>
              {title}
            </h3>
            <p className="inside-page__text text-sm">
              {description}
            </p>
            <a
              onClick={handleRedirect}
              className={`inside-page__btn bg-[${theme}] hover:bg-[${theme2}] text-black block text-center`}
              target="_blank"
              rel="noopener noreferrer"
            >
            Jelajahi
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnsyclocardiumCard;