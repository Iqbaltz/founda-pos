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
import { CategorySchema } from "@/src/entity/category-entity";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryService } from "@/src/service/category";
import { useRouter } from "next-nprogress-bar";

type Props = {};

export default function AddForm({}: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { addCategory } = categoryService;

  async function onSubmit(data: z.infer<typeof CategorySchema>) {
    const res = await addCategory({
      ...data,
    });
    if (res) {
      alert("Kategori berhasil ditambahkan");
      form.reset();
      router.push("/master/category");
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
              <FormLabel>Nama Kategori</FormLabel>
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
