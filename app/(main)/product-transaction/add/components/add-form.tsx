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
import { useRouter } from "next/navigation";
import { ProductEntity } from "@/src/entity/product-entity";
import { productService } from "@/src/service/product";
import { SupplierEntity } from "@/src/entity/supplier-entity";
import { supplierService } from "@/src/service/supplier";
import {
  ProductTransactionEntity,
  ProductTransactionSchema,
} from "@/src/entity/product-transaction-entity";
import { productTransactionService } from "@/src/service/product-transaction";
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
import Autocomplete from "@/components/ui/autocomplete";

type Props = {};

export default function AddForm({}: Props) {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<SupplierEntity[]>([]);
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const { getAllSupplier } = supplierService;
  const { getAllProducts } = productService;
  const form = useForm<z.infer<typeof ProductTransactionSchema>>({
    resolver: zodResolver(ProductTransactionSchema),
    defaultValues: {
      transaction_date: new Date(),
      supplier_id: 0,
      barang_id: 0,
      harga_beli: 0,
      jumlah: 0,
    },
  });

  const { addProductTransaction } = productTransactionService;

  async function onSubmit(data: z.infer<typeof ProductTransactionSchema>) {
    const res = await addProductTransaction({
      ...data,
      transaction_date: changeDateTimeToNow(data.transaction_date),
    });
    if (res) {
      alert("Transaksi Barang berhasil ditambahkan");
      form.reset();
      router.push("../product-transaction");
    }
  }
  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };
  const fetchSuppliers = async () => {
    const data = await getAllSupplier();
    setSuppliers(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const handleChangeProduct =
    (field: ControllerRenderProps<any>) => (value: any) => {
      field.onChange(Number(value?.value));
      form.setValue(
        "harga_beli",
        products?.find((product) => product.id === Number(value?.value))
          ?.harga_modal || 0
      );
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
                <Autocomplete
                  isClearable
                  options={
                    products?.map((product) => ({
                      value: String(product.id),
                      label: product.name,
                    })) || []
                  }
                  onChange={handleChangeProduct(
                    field as ControllerRenderProps<any>
                  )}
                  value={{
                    label: products?.find(
                      (product) => product.id === Number(field.value)
                    )?.name,
                    value: field.value,
                  }}
                  onBlur={field?.onBlur}
                />
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
