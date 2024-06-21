import { SupplierEntity } from "../entity/supplier-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";

const getAllSupplier = async () => {
  const res = await fetchWrapper.get("/supplier");
  return res?.data as SupplierEntity[];
};

const getAllSupplierServer = async () => {
  const res = await fetchWrapperServer.get("/supplier");
  return res?.data as SupplierEntity[];
};

const getSupplier = async (id: number) => {
  return await fetchWrapper.get(`/supplier/${id}`);
};

const getSupplierServer = async (id: number) => {
  return await fetchWrapperServer.get(`/supplier/${id}`);
};

const addSupplier = async (payload: SupplierEntity) => {
  return await fetchWrapper.post("/supplier", payload);
};

const editSupplier = async (id: number, payload: SupplierEntity) => {
  return await fetchWrapper.post(`/supplier/${id}`, payload);
};

const deleteSupplier = async (id: number) => {
  return await fetchWrapper.remove(`/supplier/${id}`);
};
const exportExcelSuppliers = async () => {
  await fetchWrapper.download(`/supplier/export-excel`);
};

export const supplierService = {
  getAllSupplier,
  getAllSupplierServer,
  getSupplier,
  addSupplier,
  editSupplier,
  deleteSupplier,
  getSupplierServer,
  exportExcelSuppliers,
};
