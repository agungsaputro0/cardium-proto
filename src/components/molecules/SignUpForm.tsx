// SignUpForm.tsx

import { FC, useState, useEffect, useRef } from "react";
import InputElement from "../atoms/InputElement";
import Button from "../atoms/Button";
import { Helmet } from "react-helmet";
import { notification, Spin } from "antd";
import { handleSignUpUser } from "../hooks/HandleSignUpUser";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useIsMobile from '../hooks/useMobile';
import { LoadingOutlined } from '@ant-design/icons'; 

const appName = import.meta.env.VITE_APP_NAME;

const SignUpForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    birth_date: "",
    gender: "",
    address: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const textCenter = isMobile ? 'text-center' : ''; 
  const loadingIndicator = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />;

  useEffect(() => {
    const input = dateInputRef.current;
    if (!input) return;
  
    const handleClick = () => {
      // Trik: paksa blur agar bisa showPicker lagi
      input.blur();
      setTimeout(() => {
        input.focus();
        input.showPicker?.(); // Chrome dan Edge support ini
      }, 0);
    };
  
    input.addEventListener("click", handleClick);
  
    return () => {
      input.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      setIsEmailValid(isValidEmail);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!isEmailValid) {
      notification.error({
        message: "Email Tidak Valid!",
        description: "Pastikan Anda memasukkan email yang valid.",
      });
      return;
    }

    const { full_name, email, password, birth_date, gender, address } = formData;

    // Basic validation before submitting
    if (!full_name || !email || !password || !birth_date || !gender) {
      setErrorMsg("Semua field wajib diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await handleSignUpUser({
        full_name,
        email,
        password,
        birth_date,
        gender,
        address,
      });

      if (response.success) {
        notification.success({
          message: "Registrasi Berhasil!",
          description: response.message,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        notification.error({
          message: "Registrasi Gagal!",
          description: response.message || "Terjadi kesalahan saat mendaftar.",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Registrasi Gagal!",
        description: "Terjadi kesalahan koneksi atau server.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 3000); // 3 detik
  
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <section>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      <div className="pt-16 flex justify-center mt-20 sm:mt-10 mb-20">
        <div className="lg:max-w-6xl sm:max-w-3xl md:max-w-5xl bg-white/90 border border-gray-400 rounded-lg shadow-lg p-6 space-y-4 w-full min-w-[300px] ml-[10px] mr-[10px]">
          <h1 className={` ${textCenter} text-4xl font-bold text-gray-800 text-left mb-10`}>Sign Up</h1>
          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
          <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputElement
                inputClass=""
                forwhat="full_name"
                labelMessage="Nama Lengkap"
                typeInput="text"
                inputName="full_name"
                inputPlaceholder="Nama lengkap kamu"
                value={formData.full_name}
                onChange={handleChange}
              />
              <InputElement
                inputClass=""
                forwhat="email"
                labelMessage="Email"
                typeInput="email"
                inputName="email"
                inputPlaceholder="contoh@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputElement
                inputClass=""
                forwhat="password"
                labelMessage="Password"
                typeInput="password"
                inputName="password"
                inputPlaceholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <InputElement
                inputClass=""
                forwhat="birth_date"
                labelMessage="Tanggal Lahir"
                typeInput="date"
                inputName="birth_date"
                inputPlaceholder=""
                value={formData.birth_date}
                onChange={handleChange}
                ref={dateInputRef}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Jenis Kelamin</label>
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Laki-laki"
                    className="accent-maintheme w-5 h-5"
                    checked={formData.gender === "Laki-laki"}
                    onChange={handleChange}
                  />
                  <span className="text-base">Laki-laki</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Perempuan"
                    className="accent-maintheme w-5 h-5"
                    checked={formData.gender === "Perempuan"}
                    onChange={handleChange}
                  />
                  <span className="text-base">Perempuan</span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="bg-maintheme w-full hover:bg-boldmaintheme mt-4"
              message="Daftar"
              disabled={loading}
            >
              {loading ? <Spin indicator={loadingIndicator} /> : null} 
            </Button>
          </form>
          <p className="text-slate-500 mt-4 text-center">
            Sudah memiliki akun? silakan{" "}
            <Link to="/Login" className="text-maintheme">
              <b>Login</b>
            </Link>
          </p>
          {errorMsg && <div className="text-red-500 font-bold mt-4 text-center">{errorMsg}</div>}
          </div>
          <div className="w-full md:w-1/2">
            <img
            src="/assets/img/signUpBoy.png"
            alt="Sign Up illustration"
            className="w-full h-full object-cover rounded-lg"
          />
          </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
