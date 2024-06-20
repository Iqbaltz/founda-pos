import axios, { AxiosInstance } from "axios";
import https from "https";
import { getSession, signOut } from "next-auth/react";
import { handleErrorPost } from "./error-handle";

const xios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Accept: "application/json",
  },
});

// Add a request interceptor
xios.interceptors.request.use(
  async (config) => {
    const session: any = await getSession();
    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const auth = async (url: string, body: any) => {
  const res = await axios.post(url, body, {
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    headers: {
      Accept: "application/json",
    },
  });
  return res.data;
};

const get = async (url: string, params?: Record<string, any>) => {
  try {
    const res = await xios.get(url, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await signOut({ redirect: true, callbackUrl: "/login" });
      }
    }
    console.error(error);
    return null;
  }
};

const post = async (url: string, body?: any) => {
  try {
    const res = await xios.post(url, body);
    return res.data;
  } catch (error) {
    handleErrorPost(error);
  }
};

const put = async (url: string, body: any) => {
  try {
    const res = await xios.put(url, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await signOut({ redirect: true, callbackUrl: "/login" });
      }
    }
    console.error(error);
    return null;
  }
};

const remove = async (url: string) => {
  try {
    const res = await xios.delete(url);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await signOut({ redirect: true, callbackUrl: "/login" });
      }
    }
    console.error(error);
    return null;
  }
};

const download = async (url: string, filename: string) => {
  try {
    const res = await xios.get(url, { responseType: "blob" });
    const blob = new Blob([res.data], { type: res.data.type });
    const urlRes = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlRes;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await signOut({ redirect: true, callbackUrl: "/login" });
      }
    }
    console.error(error);
  }
};

export const fetchWrapper = {
  get,
  post,
  put,
  remove,
  auth,
  download,
};
