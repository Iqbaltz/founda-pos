"use client";
import React, { useEffect, useState } from "react";
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
import { StoreInformationSchema } from "@/src/entity/store-information-entity";
import { storeInformationService } from "@/src/service/store-information";
import { Switch } from "@/components/ui/switch";

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
  const [isAutoDownload, setIsAutoDownload] = useState(false);

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

  const handleOnSwitchAutoDownload = (e: boolean) => {
    setIsAutoDownload(e);
    localStorage.setItem("autoDownload", JSON.stringify(!isAutoDownload));
  };

  useEffect(() => {
    const autoDownload = JSON.parse(
      localStorage.getItem("autoDownload") || "false"
    );
    setIsAutoDownload(autoDownload);
  }, []);

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
        <div className="flex items-center gap-2 py-2 text-sm">
          <p>Auto Download Receipt</p>
          <Switch
            onCheckedChange={handleOnSwitchAutoDownload}
            checked={isAutoDownload}
          />
        </div>
        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}
