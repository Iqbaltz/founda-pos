import { z } from "zod";

export const CashierSchema = z.object({
  transaction_date: z.string(),
  cashier_id: z.string(),
  customer_id: z.number(),
  payment_method_id: z.string(),
  payment_amount: z.number(),
  discount: z.number(),
  items: z
    .array(
      z.object({
        barang_id: z.string(),
        transaction_type: z.string(),
        qty: z.number(),
      })
    )
    .min(1, "Minimal input 1 barang"),
});

export const CashierItemSchema = z.object({
  barang_id: z.string().min(1, "Barang harus diisi"),
  transaction_type: z.string().min(1, "Tipe Harga harus diisi"),
  qty: z.number().min(1, "Jumlah harus lebih dari 0"),
});

export interface CashierItemEntity {
  barang_id: string;
  transaction_type: string;
  qty: number;
}

export interface CashierEntity {
  transaction_date: string;
  cashier_id: string;
  customer_id: number;
  payment_method_id: string;
  discount: number;
  payment_amount: number;
  items: CashierItemEntity[];
}
