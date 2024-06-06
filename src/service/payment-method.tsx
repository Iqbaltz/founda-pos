import { PaymentMethodEntity } from "../entity/payment-method-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";

const getAllPaymentMethods = async () => {
  const res = await fetchWrapper.get("/payment-method");
  return res?.data as PaymentMethodEntity[];
};

const getAllPaymentMethodsServer = async () => {
  const res = await fetchWrapperServer.get("/payment-method");
  return res?.data as PaymentMethodEntity[];
};

const getPaymentMethod = async (id: number) => {
  return await fetchWrapper.get(`/payment-method/${id}`);
};

const getPaymentMethodServer = async (id: number) => {
  const res = await fetchWrapperServer.get(`/payment-method/${id}`);
  return res?.data as PaymentMethodEntity;
};

const addPaymentMethod = async (payload: PaymentMethodEntity) => {
  return await fetchWrapper.post("/payment-method", payload);
};

const editPaymentMethod = async (id: number, payload: PaymentMethodEntity) => {
  return await fetchWrapper.post(`/payment-method/${id}`, payload);
};

const deletePaymentMethod = async (id: number) => {
  return await fetchWrapper.remove(`/payment-method/${id}`);
};

export const paymentMethodService = {
  getAllPaymentMethods,
  getAllPaymentMethodsServer,
  getPaymentMethod,
  addPaymentMethod,
  editPaymentMethod,
  deletePaymentMethod,
  getPaymentMethodServer,
};
