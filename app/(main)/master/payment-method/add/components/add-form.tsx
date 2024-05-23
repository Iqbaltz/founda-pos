"use client";
import React from "react";
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
import { useRouter } from "next-nprogress-bar";
import { PaymentMethdoSchema } from "@/src/entity/payment-method-entity";
import { paymentMethodService } from "@/src/service/payment-method";

type Props = {};

export default function AddForm({}: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof PaymentMethdoSchema>>({
    resolver: zodResolver(PaymentMethdoSchema),
    defaultValues: {
      name: "",
    },
  });

  const { addPaymentMethod } = paymentMethodService;

  async function onSubmit(data: z.infer<typeof PaymentMethdoSchema>) {
    const res = await addPaymentMethod({
      ...data,
    });
    if (res) {
      alert("Metode Pembayaran berhasil ditambahkan");
      form.reset();
      router.push("../payment-method");
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
              <FormLabel>Nama Metode Pembayaran</FormLabel>
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
