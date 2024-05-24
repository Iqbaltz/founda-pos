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
import { useForm } from "react-hook-form";
import { CategoryEntity, CategorySchema } from "@/src/entity/category-entity";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryService } from "@/src/service/category";
import { useParams, useRouter } from "next/navigation";
import { ProductSchema } from "@/src/entity/product-entity";
import { productService } from "@/src/service/product";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  name: string;
  category_id: number | null;
  hitung_stok: boolean;
  harga_modal: number;
  harga_jual_satuan: number;
  harga_jual_grosir: number;
  harga_jual_reseller: number;
  stok: number;
};

export default function EditForm({
  name,
  category_id,
  hitung_stok,
  harga_modal,
  harga_jual_satuan,
  harga_jual_grosir,
  harga_jual_reseller,
  stok,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const { getAllCategories } = categoryService;
  const id = params.id as string;

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name,
      category_id,
      hitung_stok: Boolean(hitung_stok),
      harga_modal,
      harga_jual_satuan,
      harga_jual_grosir,
      harga_jual_reseller,
      stok,
    },
  });

  const { editProduct } = productService;

  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    const res = await editProduct(Number(id), {
      ...data,
    });
    if (res) {
      alert("Barang berhasil diubah");
      form.reset();
      router.push("/product");
    }
  }
  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value!)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Pilih Kategori --" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id!)}
                      >
                        {category.name}
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
          name="harga_modal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Modal</FormLabel>
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
          name="harga_jual_satuan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Jual Satuan</FormLabel>
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
          name="harga_jual_grosir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Jual Grosir</FormLabel>
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
          name="harga_jual_reseller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Jual Reseller</FormLabel>
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
          name="hitung_stok"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(Boolean(value))}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Hitung Stok</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("hitung_stok") ? (
          <FormField
            control={form.control}
            name="stok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stok</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value || 0))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <></>
        )}
        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}
