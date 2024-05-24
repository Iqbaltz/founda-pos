import { ProductEntity } from "../entity/product-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";

const getAllProducts = async () => {
  const res = await fetchWrapper.get("/barang");
  return res?.data as ProductEntity[];
};

const getAllProductsServer = async () => {
  const res = await fetchWrapperServer.get("/barang");
  return res?.data as ProductEntity[];
};

const getProduct = async (id: number) => {
  return await fetchWrapper.get(`/barang/${id}`);
};

const getProductServer = async (id: number) => {
  return await fetchWrapperServer.get(`/barang/${id}`);
};

const addProduct = async (payload: ProductEntity) => {
  return await fetchWrapper.post("/barang", payload);
};

const editProduct = async (id: number, payload: ProductEntity) => {
  return await fetchWrapper.post(`/barang/${id}`, payload);
};

const deleteProduct = async (id: number) => {
  return await fetchWrapper.remove(`/barang/${id}`);
};

export const productService = {
  getAllProducts,
  getAllProductsServer,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductServer,
};
