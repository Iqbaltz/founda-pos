"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CashierSchema } from "@/src/entity/cashier-entity";
import { cashierService } from "@/src/service/cashier";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import TransactionTable from "./transaction-table";

type Props = {};

export default function CashierForm({}: Props) {
  const form = useForm<z.infer<typeof CashierSchema>>({
    resolver: zodResolver(CashierSchema),
    defaultValues: {
      transaction_date: new Date().toISOString().split("T")[0],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { addTransaction } = cashierService;

  async function onSubmit(data: z.infer<typeof CashierSchema>) {
    const res = await addTransaction({
      ...data,
    });
    if (res) {
      alert("Transaksi berhasil!");
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="customer_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nama Pelanggan</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Pilih Pelanggan --" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id!)}
                      >
                        {category.name}
                      </SelectItem>
                    ))} */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transaction_date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tanggal</FormLabel>
                <FormControl>
                  <Input {...field} type="text" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <TransactionTable />
        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}
