"use client";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon, TrashIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { SupplierEntity } from "@/src/entity/supplier-entity";
import { supplierService } from "@/src/service/supplier";

type Props = {};

export default function SupplierList({}: Props) {
  const [suppliers, setSuppliers] = useState<SupplierEntity[]>([]);
  const { getAllSupplier, deleteSupplier } = supplierService;

  const fetchSupplier = async () => {
    const data = await getAllSupplier();
    setSuppliers(data);
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  const columns: ColumnDef<SupplierEntity>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "name",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Alamat
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "address",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nomor Telepon
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "phone_number",
    },
    {
      header: "Action",
      accessorKey: "",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`./supplier/edit/${row?.original?.id}`}>
            <EditIcon size={18} className="text-yellow-500" />
          </Link>

          <AlertDialog>
            <AlertDialogTrigger>
              <TrashIcon
                size={18}
                className="text-destructive cursor-pointer"
              />
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
                <AlertDialogAction
                  onClick={async () => {
                    const res = await deleteSupplier(row?.original?.id!);
                    if (res) {
                      alert("Supplier berhasil dihapus");
                      fetchSupplier();
                    }
                  }}
                >
                  Ya
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={suppliers} addLink="./supplier/add" />
  );
}
