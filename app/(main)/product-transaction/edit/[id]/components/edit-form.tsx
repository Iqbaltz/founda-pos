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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { ProductEntity } from "@/src/entity/product-entity";
import {
  ProductTransactionEntity,
  ProductTransactionSchema,
} from "@/src/entity/product-transaction-entity";
import { supplierService } from "@/src/service/supplier";
import { productTransactionService } from "@/src/service/product-transaction";
import { SupplierEntity } from "@/src/entity/supplier-entity";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { changeDateTimeToNow } from "@/src/helpers/utils";

type Props = {
  transaction_date: Date;
  supplier_id: number;
  barang_id: number;
  harga_beli: number;
  jumlah: number;
  suppliers: SupplierEntity[];
  products: ProductEntity[];
};

export default function EditForm({
  transaction_date,
  supplier_id,
  barang_id,
  harga_beli,
  jumlah,
  suppliers,
  products,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const form = useForm<z.infer<typeof ProductTransactionSchema>>({
    resolver: zodResolver(ProductTransactionSchema),
    defaultValues: {
      transaction_date,
      supplier_id,
      barang_id,
      harga_beli,
      jumlah,
    },
  });

  const { editProductTransaction } = productTransactionService;

  async function onSubmit(data: z.infer<typeof ProductTransactionSchema>) {
    const res = await editProductTransaction(Number(id), {
      ...data,
      transaction_date: changeDateTimeToNow(data.transaction_date),
    });
    if (res) {
      alert("Transaksi berhasil diubah");
      form.reset();
      router.push("/product-transaction");
    }
  }
  const selectProduct = (
    field: ControllerRenderProps<ProductTransactionEntity, "barang_id">,
    value: string
  ) => {
    const product = products.find((product) => String(product.id) === value);
    form.setValue("harga_beli", product ? product.harga_modal : 0);
    return field.onChange(Number(value));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="transaction_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal transaksi</FormLabel>
              <br />
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date("2100-01-01") ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplier_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value!)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Pilih Supplier --" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem
                        key={supplier.id}
                        value={String(supplier.id!)}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="barang_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barang</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => selectProduct(field, value)}
                  defaultValue={String(field.value!)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Pilih Barang --" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={String(product.id!)}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="harga_beli"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Beli</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jumlah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
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
