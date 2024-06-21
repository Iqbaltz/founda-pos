"use client";
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
import { DataTable } from "@/components/ui/data-table";
import { PaymentMethodEntity } from "@/src/entity/payment-method-entity";
import { paymentMethodService } from "@/src/service/payment-method";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

export default function PaymentMethodList({}: Props) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodEntity[]>(
    []
  );
  const { getAllPaymentMethods, exportExcelPaymentMethods } =
    paymentMethodService;

  const fetchPaymentMethods = async () => {
    const data = await getAllPaymentMethods();
    setPaymentMethods(data);
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const columns: ColumnDef<PaymentMethodEntity>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "id",
    },
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
      header: "Action",
      accessorKey: "",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`./payment-method/edit/${row?.original?.id}`}>
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
                    const res = await paymentMethodService.deletePaymentMethod(
                      row?.original?.id!
                    );
                    if (res) {
                      alert("Metode Pembayaran berhasil dihapus");
                      fetchPaymentMethods();
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
      data={paymentMethods}
      addLink="./payment-method/add"
      exportService={exportExcelPaymentMethods}
    />
  );
}
