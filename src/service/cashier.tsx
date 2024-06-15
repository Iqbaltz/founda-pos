import { CashierEntity } from "../entity/cashier-entity";
import { CashierTransactionEntity } from "../entity/cashier-transaction-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";
import PaginatedModel from "../helpers/pagination";

const addTransaction = async (payload: CashierEntity) => {
  const res = await fetchWrapper.post("/cashier-transaction", payload);
  return res?.data as CashierTransactionEntity;
};

const editTransaction = async (id: string, payload: CashierEntity) => {
  return await fetchWrapper.post(`/cashier-transaction/${id}`, payload);
};

const getAllCashierTransactions = async (page: string) => {
  const res = await fetchWrapper.get(`/cashier-transaction?page=${page}`);
  res.data["summary"] = res.summary;
  return res?.data as PaginatedModel<CashierTransactionEntity>;
};

const getCashierTransactionServer = async (id: string) => {
  const res = await fetchWrapperServer.get(`/cashier-transaction/${id}`);
  return res.data as CashierTransactionEntity;
};

const printReceipt = async (id: number, filename?: string) => {
  await fetchWrapper.download(
    `/cashier-transaction/print-receipt/${id}`,
    `${filename ? filename : "Receipt"}.pdf`
  );
};

export const cashierService = {
  addTransaction,
  editTransaction,
  getAllCashierTransactions,
  getCashierTransactionServer,
  printReceipt,
};
