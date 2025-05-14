import React from 'react';

const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/assets/img/cardium.png" 
        alt="Logo Cardium"
        width={70}
        height={70}
      />
      <div style={{ color: '#5c595f', marginLeft: '15px' }}>
        <h3><b><span className="text-maintheme">Cardium</span></b></h3>
        <h5>Explore Your Heart, Empower Your Health</h5>
      </div>
    </div>
  );
};

export default Logo;
