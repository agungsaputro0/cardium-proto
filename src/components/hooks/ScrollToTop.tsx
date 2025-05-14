import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll ke posisi atas halaman
  }, [location]);

  return null; // Tidak perlu render apa pun
};

export default ScrollToTop;
