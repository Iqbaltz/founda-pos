import { z } from "zod";
import { SupplierEntity } from "./supplier-entity";
import { ProductEntity } from "./product-entity";

export const ProductTransactionSchema = z.object({
  transaction_date: z.date(),
  supplier_id: z.number(),
  barang_id: z.number(),
  harga_beli: z.number().min(0),
  jumlah: z.number().min(1),
});

export interface ProductTransactionEntity {
  id?: number;
  transaction_date: Date;
  supplier_id: number;
  barang_id: number;
  harga_beli: number;
  jumlah: number;
  created_at?: Date;
  updated_at?: Date;
  supplier?: SupplierEntity;
  barang?: ProductEntity;
}
