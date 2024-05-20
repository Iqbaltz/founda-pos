"use client";
import { DataTable } from "@/components/ui/data-table";
import { Category } from "@/src/entity/category-entity";
import { categoryService } from "@/src/service/category";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {};

export const columns: ColumnDef<Category>[] = [
  {
    header: "No",
    accessorKey: "",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Action",
    accessorKey: "",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Link href={`./category/edit/${row?.original?.id}`}>
          <EditIcon size={18} className="text-yellow-500" />
        </Link>

        <AlertDialog>
          <AlertDialogTrigger>
            <TrashIcon size={18} className="text-destructive cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus item</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah kamu yakin ingin menghapus item ini?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction>Ya</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];

export default function CategoryList({}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAllCategories } = categoryService;

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return <DataTable columns={columns} data={categories} addLink="./login" />;
}
