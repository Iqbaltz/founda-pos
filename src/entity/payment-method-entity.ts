import { z } from "zod";

export interface PaymentMethodEntity {
  id?: number;
  slug?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export const PaymentMethdoSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama metode pembayaran tidak boleh kosong" }),
});
