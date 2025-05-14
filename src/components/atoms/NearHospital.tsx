import { useEffect, useState } from "react";

export default function NearHospital({ location }: { location: { lat: number; lng: number } }) {
  const [isOnline, setIsOnline] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="w-full flex-1 rounded-lg border h-[50dvh] md:h-full">
      {!isOnline || !iframeLoaded ? (
        <div className="flex items-center justify-center h-full text-center p-4 text-red-500">
          Tidak ada koneksi internet atau gagal memuat peta.
        </div>
      ) : (
        <iframe
          src={`https://www.google.com/maps?q=rumah+sakit&near=${location.lat},${location.lng}&output=embed`}
          className="w-full h-full rounded-lg border"
          title="Peta Rumah Sakit"
          loading="lazy"
          onError={() => setIframeLoaded(false)}
        ></iframe>
      )}
    </div>
  );
}
