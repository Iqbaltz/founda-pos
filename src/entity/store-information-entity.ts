import { z } from "zod";

export const StoreInformationSchema = z.object({
  name: z.string().min(1, "Required").max(255),
  address: z.string().min(1, "Required").max(255),
  phone_number: z.string().min(1, "Required").max(20),
});

export interface StoreInformationEntity {
  name: string;
  address: string;
  phone_number: string;
}
