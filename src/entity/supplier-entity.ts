import { z } from "zod";

export const SupplierSchema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().optional(),
  phone_number: z.string().optional(),
});

export interface SupplierEntity {
  id?: number;
  name: string;
  address?: string;
  phone_number?: string;
  created_at?: string;
  updated_at?: string;
}
