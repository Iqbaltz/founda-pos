import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string(),
});

export interface Category {
  id?: number;
  slug?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}
