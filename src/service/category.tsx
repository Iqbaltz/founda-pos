import { Category } from "../entity/category-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";

const getAllCategories = async () => {
  return (await fetchWrapper.get("/category")) as Category[];
};

const getCategory = async (id: number) => {
  return await fetchWrapper.get(`/category/${id}`);
};

const addCategory = async (payload: Category) => {
  return await fetchWrapper.post("/category", payload);
};

const editCategory = async (id: number, payload: Category) => {
  return await fetchWrapper.post(`/category/${id}`, payload);
};

const deleteCategory = async (id: number) => {
  return await fetchWrapper.remove(`/category/${id}`);
};

export const categoryService = {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
