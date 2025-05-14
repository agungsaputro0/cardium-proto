import axios from 'axios';
import { message } from 'antd';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';

const baseURL = import.meta.env.VITE_APP_PUBLIC_API_URL;

interface LoginResponse {
  message: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  kategori: string;
  // Tambahkan field lain jika diperlukan
}

interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
}

export const handleLogin = async (
  email: string,
  password: string
): Promise<LoginResult & { id?: string }> => {
  try {
    const response = await axios.post<LoginResponse & { id?: string }>(
      `${baseURL}/login`,
      { email, password },
      { withCredentials: true }
    );

    if (response.data.message === 'Login successful') {
      const userResponse = await axios.get<User>(`${baseURL}/get_current_user`, {
        withCredentials: true,
      });

      if (userResponse.data && userResponse.data.email) {
        return {
          success: true,
          message: 'Login berhasil',
          user: userResponse.data,
        };
      } else {
        return {
          success: false,
          message: 'Gagal mendapatkan informasi pengguna.',
        };
      }
    }

    // Kalau ada id (akun tidak aktif), tetap return dalam struktur standar
    return {
      success: false,
      message: response.data.message,
      id: response.data.id, 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.message || 'Terjadi kesalahan dari server.',
      };
    }

    return {
      success: false,
      message: 'Terjadi kesalahan koneksi atau kesalahan tidak diketahui.',
    };
  }
};


export const useHandleLogout = () => {
    const dispatch = useDispatch();
  
    const handleLogout = async (): Promise<void> => {
      try {
        const response = await axios.delete(`${baseURL}/logout`, {
          withCredentials: true,
        });
  
        if (response.status === 200) {
          message.success(response.data.message || 'Logout berhasil');
          dispatch(logout());
  
          setTimeout(() => {
            window.location.href = '/Login';
          }, 1000);
        } else {
          message.error(response.data.message || 'Gagal logout');
        }
      } catch (error: any) {
        console.error('Logout exception:', error);
        message.error(
          error?.response?.data?.message || 'Terjadi kesalahan saat logout'
        );
      }
    };
  
    return handleLogout;
  };
  
  // export const handleLoginAfterActivation = async (id: string) => {
  //   try {
  //     const response = await axios.post<LoginResponse>(
  //       `${baseURL}/login_after_activation`,
  //       { id }, // hanya kirim id
  //       { withCredentials: true }
  //     );
  
  //     if (response.data.message === 'Login successful') {
  //       const userResponse = await axios.get<User>(`${baseURL}/get_current_user`, {
  //         withCredentials: true,
  //       });
  
  //       return {
  //         success: true,
  //         message: 'Login berhasil',
  //         user: userResponse.data,
  //       };
  //     }
  
  //     return {
  //       success: false,
  //       message: response.data.message || 'Login gagal',
  //     };
  //   } catch (error: any) {
  //     return {
  //       success: false,
  //       message: 'Terjadi kesalahan koneksi atau server.',
  //     };
  //   }
  // };
  
  export const handleLoginAfterActivation = async (id: string) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${baseURL}/login_after_activation`,
        { id }, // hanya kirim id
        { withCredentials: true }
      );
  
      if (response.data.message === 'Login successful') {
        // Mengambil data user setelah login
        const userResponse = await axios.get<User>(`${baseURL}/get_current_user`, {
          withCredentials: true,
        });
  
        const user = userResponse.data;
  
        // Pastikan data user memiliki kategori dan email
        if (user && user.kategori && user.email) {
          return {
            success: true,
            message: 'Login berhasil',
            user: user,
          };
        } else {
          return {
            success: false,
            message: 'Data pengguna tidak lengkap.',
          };
        }
      }
  
      return {
        success: false,
        message: response.data.message || 'Login gagal',
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Terjadi kesalahan koneksi atau server.',
      };
    }
  };
  