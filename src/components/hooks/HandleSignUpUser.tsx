import axios from "axios";

const baseURL = import.meta.env.VITE_APP_PUBLIC_API_URL;

export interface UserData {
  full_name: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
  address?: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: any; 
}

export const handleSignUpUser = async (userData: UserData): Promise<SignUpResponse> => { 
    try {
      const response = await axios.post(`${baseURL}/user_registration`, userData);
      return {
        success: response.data.status === "success",
        message: response.data.message,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          success: false,
          message: error.response.data.message || "Terjadi kesalahan pada server.",
        };
      }
      return {
        success: false,
        message: "Terjadi kesalahan koneksi atau kesalahan yang tidak diketahui.",
      };
    }
  };
  
