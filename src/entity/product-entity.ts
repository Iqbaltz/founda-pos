import { z } from "zod";
import { CategoryEntity } from "./category-entity";

export const ProductSchema = z.object({
  name: z.string().min(1, "Nama produk harus diisi"),
  category_id: z.number({
    invalid_type_error: "Kategori harus diisi",
    required_error: "Kategori harus diisi",
  }),
  hitung_stok: z.boolean(),
  harga_modal: z.number().min(0),
  harga_jual_satuan: z
    .number({
      invalid_type_error: "Harga jual satuan harus diisi",
      required_error: "Harga jual satuan harus diisi",
    })
    .min(1, "Harga jual satuan harus diisi"),
  harga_jual_grosir: z.number().min(0),
  harga_jual_reseller: z.number().min(0),
  stok: z.number().min(0),
});

export interface ProductEntity {
  id?: number;
  name: string;
  category_id: number | null;
  hitung_stok: boolean;
  harga_modal: number;
  harga_jual_satuan: number;
  harga_jual_grosir: number;
  harga_jual_reseller: number;
  stok: number;
  created_at?: Date;
  updated_at?: Date;
  category?: CategoryEntity;
}
