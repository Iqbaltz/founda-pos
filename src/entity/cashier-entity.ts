import { z } from "zod";

export const CashierSchema = z.object({
  transaction_date: z.string(),
  cashier_id: z.string(),
  customer_id: z.string(),
  payment_method_id: z.string(),
  potongan: z.number(),
  items: z.array(
    z.object({
      barang_id: z.string(),
      transaction_type: z.string(),
      qty: z.number(),
    })
  ),
});

export interface CashierEntity {
  transaction_date: string;
  cashier_id: string;
  customer_id: string;
  payment_method_id: string;
  potongan: number;
  items: {
    barang_id: string;
    transaction_type: string;
    qty: number;
  }[];
}
