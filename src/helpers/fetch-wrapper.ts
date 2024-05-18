import xios from "../config/axios";

const get = async (url: string) => {
  try {
    const res = await xios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    console.log("err", error);
    return null;
  }
};

const post = async (url: string, body?: any) => {
  try {
    const res = await xios.post(url, body);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const put = async (url: string, body: any) => {
  try {
    const res = await xios.put(url, body);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const remove = async (url: string) => {
  try {
    const res = await xios.delete(url);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchWrapper = {
  get,
  post,
  put,
  remove,
};
