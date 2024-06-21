import { CategoryEntity } from "../entity/category-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";

const getAllCategories = async () => {
  const res = await fetchWrapper.get("/category");
  return res?.data as CategoryEntity[];
};

const getCategory = async (id: number) => {
  return await fetchWrapper.get(`/category/${id}`);
};

const getCategoryServer = async (id: number) => {
  return await fetchWrapperServer.get(`/category/${id}`);
};

const addCategory = async (payload: CategoryEntity) => {
  return await fetchWrapper.post("/category", payload);
};

const editCategory = async (id: number, payload: CategoryEntity) => {
  return await fetchWrapper.post(`/category/${id}`, payload);
};

const deleteCategory = async (id: number) => {
  return await fetchWrapper.remove(`/category/${id}`);
};
const exportExcelCategories = async () => {
  await fetchWrapper.download(`/category/export-excel`);
};

export const categoryService = {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryServer,
  exportExcelCategories,
};
