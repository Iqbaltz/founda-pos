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
import { CashierItemSchema, CashierSchema } from "@/src/entity/cashier-entity";
import { ProductEntity } from "@/src/entity/product-entity";
import { numberToRupiah } from "@/src/helpers/numberToRupiah";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { UseFieldArrayAppend, useForm } from "react-hook-form";
import { z } from "zod";
import ReactSelect from "react-select";
import Autocomplete from "@/components/ui/autocomplete";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
type Props = {
  append: UseFieldArrayAppend<z.infer<typeof CashierSchema>>;
  products: ProductEntity[];
};

const price_types = [
  { value: "satuan", label: "Satuan" },
  { value: "grosir", label: "Grosir" },
  { value: "reseller", label: "Reseller" },
];

export default function AddItemForm({ append, products }: Props) {
  const [selectedPrice, setSelectedPrice] = useState<Number>();
  const form = useForm<z.infer<typeof CashierItemSchema>>({
    resolver: zodResolver(CashierItemSchema),
    defaultValues: {
      barang_id: "",
      transaction_type: "",
    },
  });

  function onSubmit(data: z.infer<typeof CashierItemSchema>) {
    append(data);
    form.reset({ qty: undefined });
    setSelectedPrice(undefined);
  }

  useEffect(() => {
    const selectedProduct: any = products?.find(
      (product) => product.id === Number(form.getValues().barang_id)
    );
    if (!selectedProduct) return;

    setSelectedPrice(
      selectedProduct[`harga_jual_${form.watch().transaction_type ?? "satuan"}`]
    );

    // set harga_modal
    form.setValue("harga_modal", selectedProduct[`harga_modal`]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch().barang_id, form.watch().transaction_type]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex md:gap-1 mb-2 gap-2 flex-col md:flex-row">
            <FormField
              control={form.control}
              name="barang_id"
              render={({ field }) => (
                <FormItem className="w-full md:w-[150%]">
                  <FormControl>
                    <Autocomplete
                      isClearable
                      options={
                        products?.map((product) => ({
                          value: String(product.id),
                          label: product.name,
                        })) || []
                      }
                      onChange={(value: any) => {
                        field.onChange(String(value?.value));
                      }}
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
            <Input
              className="opacity-70"
              placeholder="Harga"
              value={numberToRupiah(Number(selectedPrice || 0))}
              readOnly
            />
            <FormField
              control={form.control}
              name="transaction_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(String(value))}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Pilih Tipe Harga --" />
                      </SelectTrigger>
                      <SelectContent>
                        {price_types.map((type) => (
                          <SelectItem key={type.value} value={type.value!}>
                            {type.label}
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
              name="qty"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Input
              className="opacity-70"
              placeholder="Total"
              readOnly
              value={numberToRupiah(
                Number(selectedPrice || 0) * Number(form.watch().qty || 0)
              )}
            />
            <div className="w-[40%]"></div>
          </div>
          <Button>
            <PlusIcon />
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  );
}
