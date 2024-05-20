import axios, { AxiosInstance } from "axios";
import https from "https";
import { getSession, signOut } from "next-auth/react";

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

const get = async (url: string) => {
  try {
    const res = await xios.get(url);
    return res.data?.data;
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await signOut({ redirect: true, callbackUrl: "/login" });
      }
    }
    console.error(error);
    return null;
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

export const fetchWrapper = {
  get,
  post,
  put,
  remove,
  auth,
};
