import { Category } from "../entity/category-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";

const getAllCategories = async () => {
  return (await fetchWrapper.get("/category")) as Category[];
};

const getCategory = async (slug: string) => {
  return await fetchWrapper.get(`/category/${slug}`);
};

const addCategory = async (payload: Category) => {
  return await fetchWrapper.post("/category", payload);
};

const editCategory = async (slug: string, payload: Category) => {
  return await fetchWrapper.put(`/category/${slug}`, payload);
};

const deleteCategory = async (slug: string) => {
  return await fetchWrapper.remove(`/category/${slug}`);
};

export const categoryService = {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
