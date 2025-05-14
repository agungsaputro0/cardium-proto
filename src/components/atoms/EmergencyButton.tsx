// components/EmergencyButton.tsx
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react'; // optional: lucide icon
import useIsMobile from '../hooks/useMobile';

const EmergencyButton = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const bottomSpacing = isMobile ? 'bottom-20' : 'bottom-6'; 
  
  return (
    <button
      onClick={() => navigate('/emergency')}
      className={`fixed ${bottomSpacing} right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full shadow-lg animate-bounce`}
      aria-label="Emergency Help"
    >
      <AlertTriangle className="w-5 h-5" />
      <span className="hidden md:inline">Darurat</span>
    </button>
  );
};


export default EmergencyButton;
