import React from 'react';
import '../../card.css';

interface FlipCardProps {
  title: string;
  price: string;
  theme: 'ski' | 'city' | 'beach' | 'camping';
  videoUrl: string;
  imageUrl: string;
  redirectUrl: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  title,
  price,
  theme,
  videoUrl,
  imageUrl,
  redirectUrl
}) => {
  return (
    <div className="card">
      <div className="flip-card">
        <div className="flip-card__container">
          <div className="card-front">
            <div className={`card-front__tp card-front__tp--${theme}`}>
              <img
                src={imageUrl}
                alt={`${title} cover`}
                style={{ width: '100%', height: '6rem', objectFit: 'cover', borderRadius: '0.5rem' }}
              />
              <h2 className="card-front__heading">{title}</h2>
              <p className="card-front__text-price">{price}</p>
            </div>
            <div className="card-front__bt">
              <p className={`card-front__text-view card-front__text-view--${theme}`}>
                View me
              </p>
            </div>
          </div>

          <div className="card-back">
            <video className="video__container" autoPlay muted loop>
              <source className="video__media" src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="inside-page">
        <div className="inside-page__container">
          <h3 className={`inside-page__heading inside-page__heading--${theme}`}>
            For {title.toLowerCase()} lovers
          </h3>
          <p className="inside-page__text">
            Love {title.toLowerCase()}? Why not take up exciting {title.toLowerCase()}-in sessions and hit the slope?
          </p>
          <a
            href={redirectUrl}
            className={`inside-page__btn inside-page__btn--${theme}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View deals
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
