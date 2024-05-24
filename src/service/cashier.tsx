import { CashierEntity } from "../entity/cashier-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";

const addTransaction = async (payload: CashierEntity) => {
  return await fetchWrapper.post("/transaction", payload);
};

export const cashierService = {
  addTransaction,
};
