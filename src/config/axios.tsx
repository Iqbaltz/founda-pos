import axios, { AxiosInstance } from "axios";
import https from "https";
import Cookies from "js-cookie";

const xios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: `Bearer ${Cookies.get("auth")}`,
    Accept: "application/json",
  },
});
export default xios;
