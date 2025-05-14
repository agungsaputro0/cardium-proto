import { FC, useEffect, useRef, useState } from "react";
import InputElement from "../atoms/InputElement";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { notification, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons'; 
import { HandleforgotPassword } from "../hooks/HandleForgotPassword";

const appName = import.meta.env.NEXT_PUBLIC_APP_NAME;

const ChangePasswordForm: FC = () => {
  const [forgotPasswordFailed, setforgotPasswordFailed] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (forgotPasswordFailed) {
      timer = setTimeout(() => {
        setforgotPasswordFailed("");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [forgotPasswordFailed]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const email = event.currentTarget.email.value;  // Ambil email dari form input

    try {
        const result = await HandleforgotPassword(email);

        // Menambahkan pengecekan apakah permintaan berhasil atau tidak
        if (result.success) {
            notification.success({
                message: "Permintaan Reset Kata Sandi Berhasil!",
                description: "Silakan cek email Anda untuk instruksi lebih lanjut.",
            });
        } else {
            setforgotPasswordFailed(result.message);  // Menampilkan pesan kesalahan dari backend
            notification.error({
                message: "Permintaan Reset Kata Sandi Gagal!",
                description: result.message || "Mohon maaf, kami tidak dapat menemukan akun dengan email tersebut.",
            });
        }
    } catch (error: any) {
        // Menangani kesalahan jaringan atau kesalahan lainnya
        setforgotPasswordFailed("Terjadi kesalahan jaringan atau server tidak tersedia.");
        notification.error({
            message: "Permintaan Reset Kata Sandi Gagal!",
            description: "Mohon maaf, kami tidak dapat menghubungi server saat ini. Coba lagi nanti.",
        });
    } finally {
        setLoading(false);
    }
};


  const loadingIndicator = <LoadingOutlined style={{ fontSize: 24, color: 'blue' }} spin />;

  return (
  <section>
  <Helmet>
    <title>{appName}</title>
  </Helmet>
  <div className="pt-24 sm:pt-24 sm:mb-20 md:pt-6 lg:pt-6 flex flex-col lg:flex-row lg:justify-between items-center min-h-screen px-4 md:px-8">
    <div className="sm:pl-0 md:pl-0 lg:pl-10 pt-2 sm:pt-2 md:pt-16 lg:pt-6 mr-0 lg:mr-24 md:mr-0 sm:mr-0 text-center lg:text-left mb-8 lg:mb-0">
        <h1 className="text-6xl font-bold text-maintheme">Cardium</h1>
        <h3 className="text-l text-[#5c595f]">Explore Your Heart, Empower Your Health</h3>
    </div>

    {/* Bagian Kanan: Panel forgotPassword */}
    <div className="flex flex-col md:flex-row bg-white/90 rounded-lg shadow-left-bottom border border-gray-400 p-6 space-y-4 w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl min-w-[300px]">
     <div className="w-full md:w-1/2 md:pr-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center pb-[30px] mt-10">Lupa Password</h1>
        <form className="content-center" onSubmit={handleSubmit}>
          <InputElement
            inputClass="mb-6"
            forwhat="kode_verifikasi"
            labelMessage="Kode Verifikasi"
            typeInput="text"
            inputName="kode_verifikasi"
            inputPlaceholder="xxxx-xxxx-xxxx-xxxx"
          />
          <InputElement
            inputClass="mb-6"
            forwhat="password"
            labelMessage="Password Baru"
            typeInput="text"
            inputName="password"
            inputPlaceholder="••••••••"
          />
          <Button
            type="submit"
            variant="bg-maintheme w-full hover:bg-boldmaintheme"
            message="Perbarui Password"
            disabled={loading}
          />
        </form>
        <p className="text-slate-500 mt-4 text-center">Kembali ke Sebelumnya ? silakan&nbsp;
          <Link to="/ForgotPassword" className="text-maintheme">
          <b>Klik Disini</b>
          </Link>
        </p>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Spin indicator={loadingIndicator} />
          </div>
        )}
        {forgotPasswordFailed && (
          <p className="text-red-500 mt-4 text-center">{forgotPasswordFailed}</p>
        )}
      </div>

      {/* Bagian Gambar */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0">
        <img
          src="/assets/img/forgotPasswordGirl.png"
          alt="forgotPassword illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
</section>

  );
};

export default ChangePasswordForm;
