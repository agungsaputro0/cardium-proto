import { FaHome, FaBook, FaHeartbeat, FaInfoCircle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileBottomNav = () => {

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md sm:hidden z-50">
      <div className="flex justify-around py-2">
        <Link to="/Welcome" className="flex-1 flex flex-col items-center text-maintheme hover:text-gray-800 text-center">
          <FaHome size={22} />
          <span className="text-xs">Beranda</span>
        </Link>
        <Link to="/ensyclocardium"  className="flex-1 flex flex-col items-center text-maintheme hover:text-gray-800 text-center">
          <FaBook size={22} />
          <span className="text-xs">Edukasi</span>
        </Link>
        <Link to="/HeartCalculator"  className="flex-1 flex flex-col items-center text-maintheme hover:text-gray-800 text-center">
          <FaHeartbeat size={22} />
          <span className="text-xs">Kalkulator</span>
        </Link>
        <Link to="/AboutUs" className="flex-1 flex flex-col items-center text-maintheme hover:text-gray-800 text-center">
          <FaInfoCircle size={22} />
          <span className="text-xs">Tentang</span>
        </Link>
        <Link to="/Login" className="flex-1 flex flex-col items-center text-maintheme hover:text-gray-800 text-center">
          <FaUser size={22} />
          <span className="text-xs">Akun</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;
