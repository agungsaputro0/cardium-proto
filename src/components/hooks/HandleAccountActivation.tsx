import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_PUBLIC_API_URL;

interface ResendActivationResponse {
    message: string;
}

export const HandleActivateAccount = async (
    uid: string,
    kode_aktivasi: string
  ): Promise<string> => {
    try {
      const response = await axios.post<ResendActivationResponse>(
        `${baseURL}/activate_account/${uid}`,
        { kode_aktivasi },
        { withCredentials: true } 
      );
      return response.data.message;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Aktivasi akun gagal. Silakan coba lagi.');
    }
  };