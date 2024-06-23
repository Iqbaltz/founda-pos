import { SortingState } from "@tanstack/react-table";
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

const getAllCashierTransactions = async (
  page: string,
  limit: number,
  searchKey: string,
  sorts: SortingState
) => {
  const res = await fetchWrapper.get(`/cashier-transaction`, {
    page,
    results: limit,
    search: searchKey,
    orders: sorts,
  });
  res.data["summary"] = res.summary;
  return res?.data as PaginatedModel<CashierTransactionEntity>;
};

const getCashierTransactionServer = async (id: string) => {
  const res = await fetchWrapperServer.get(`/cashier-transaction/${id}`);
  return res.data as CashierTransactionEntity;
};

const printReceipt = async (id: number) => {
  await fetchWrapper.download(`/cashier-transaction/print-receipt/${id}`);
};
const getCashierTransactionHtml = async (id: string) => {
  const res = await fetchWrapper.get(`/cashier-transaction/get-html/${id}`);
  return res;
};
const exportExcelCashierTransactions = async () => {
  await fetchWrapper.download(`/cashier-transaction/export-excel`);
};

export const cashierService = {
  addTransaction,
  editTransaction,
  getAllCashierTransactions,
  getCashierTransactionServer,
  printReceipt,
  exportExcelCashierTransactions,
  getCashierTransactionHtml,
};
