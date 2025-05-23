import { useAuth } from "../hooks/AuthContext";

const useNavigation = () => {
  const { userType } = useAuth();

  return userType === "user"
    ? [
        { name: "Beranda", to: "/Home", current: false },
        { name: "Transaksi", to: "/History", current: false },
        { name: "Artikel", to: "/Article", current: false },
        { name: "Toko Online", to: "/FesMarketplace", current: false },
      ]
    : [
        { name: "Beranda", to: "/Portal", current: false },
        { name: "Transaksi", to: "/MyHistory", current: false },
        { name: "Artikel", to: "/ArticleList", current: false },
        { name: "Toko Online", to: "/Market", current: false },
      ];
};

export default useNavigation;
