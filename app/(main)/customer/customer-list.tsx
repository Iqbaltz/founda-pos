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
import { customerService } from "@/src/service/customer";
import { CustomerEntity } from "@/src/entity/customer-entity";

type Props = {};

export default function CustomerList({}: Props) {
  const [customers, setCustomers] = useState<CustomerEntity[]>([]);
  const { getAllCustomer, deleteCustomer, exportExcelCustomers } =
    customerService;

  const fetchCustomer = async () => {
    const data = await getAllCustomer();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const columns: ColumnDef<CustomerEntity>[] = [
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
          <Link href={`./customer/edit/${row?.original?.id}`}>
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
                    const res = await deleteCustomer(row?.original?.id!);
                    if (res) {
                      alert("Customer berhasil dihapus");
                      fetchCustomer();
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
    <DataTable
      columns={columns}
      data={customers}
      addLink="./customer/add"
      exportService={exportExcelCustomers}
    />
  );
}
