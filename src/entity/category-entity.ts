import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Required"),
});

export interface CategoryEntity {
  id?: number;
  slug?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}
