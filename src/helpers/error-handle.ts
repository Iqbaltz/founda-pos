import axios from "axios";
import { signOut } from "next-auth/react";

export const handleErrorPost = async (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      await signOut({ redirect: true, callbackUrl: "/login" });
    }

    if (error?.code == "ERR_NETWORK") {
      return error;
    }
  }
  console.error(error);
  return null;
};
