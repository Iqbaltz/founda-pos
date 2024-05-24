"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { StoreInformationSchema } from "@/src/entity/store-information-entity";
import { storeInformationService } from "@/src/service/store-information";

type Props = {
  storeName: string;
  storeAddress: string;
  storePhoneNumber: string;
};

export default function EditForm({
  storeName,
  storeAddress,
  storePhoneNumber,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof StoreInformationSchema>>({
    resolver: zodResolver(StoreInformationSchema),
    defaultValues: {
      name: storeName,
      address: storeAddress,
      phone_number: storePhoneNumber,
    },
  });

  const { editStoreInformation } = storeInformationService;

  async function onSubmit(data: z.infer<typeof StoreInformationSchema>) {
    const res = await editStoreInformation({
      ...data,
    });
    if (res) {
      alert("Data Toko berhasil diubah");
      form.reset();
      location.href = "/setting";
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Toko</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Toko</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}
