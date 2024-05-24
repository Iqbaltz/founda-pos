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
import { CategorySchema } from "@/src/entity/category-entity";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryService } from "@/src/service/category";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";

type Props = {
  categoryName: string;
};

export default function EditForm({ categoryName }: Props) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: categoryName,
    },
  });

  const { editCategory } = categoryService;

  async function onSubmit(data: z.infer<typeof CategorySchema>) {
    const res = await editCategory(Number(id), {
      ...data,
    });
    if (res) {
      alert("Kategori berhasil diubah");
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
