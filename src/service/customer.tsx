import { CustomerEntity } from "../entity/customer-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";

const getAllCustomer = async () => {
  const res = await fetchWrapper.get("/customer");
  return res?.data as CustomerEntity[];
};

const getAllCustomerServer = async () => {
  const res = await fetchWrapperServer.get("/customer");
  return res?.data as CustomerEntity[];
};

const getCustomer = async (id: number) => {
  return await fetchWrapper.get(`/customer/${id}`);
};

const getCustomerServer = async (id: number) => {
  return await fetchWrapperServer.get(`/customer/${id}`);
};

const addCustomer = async (payload: CustomerEntity) => {
  return await fetchWrapper.post("/customer", payload);
};

const editCustomer = async (id: number, payload: CustomerEntity) => {
  return await fetchWrapper.post(`/customer/${id}`, payload);
};

const deleteCustomer = async (id: number) => {
  return await fetchWrapper.remove(`/customer/${id}`);
};

export const customerService = {
  getAllCustomer,
  getAllCustomerServer,
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerServer,
};
