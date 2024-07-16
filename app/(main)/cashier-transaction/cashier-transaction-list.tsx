"use client";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  ArrowUpDown,
  DownloadIcon,
  EditIcon,
  PrinterIcon,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/src/helpers/utils";
import { PaginatedDataTable } from "@/components/ui/paginated-data-table";
import PaginatedModel, { emptyPagination } from "@/src/helpers/pagination";
import { CashierTransactionEntity } from "@/src/entity/cashier-transaction-entity";
import { cashierService } from "@/src/service/cashier";
import { numberToRupiah } from "@/src/helpers/numberToRupiah";
import debounce from "lodash.debounce";
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

export default function CashierTransactionList() {
  const [cashierTransactions, setCashierTransactions] =
    useState<PaginatedModel<CashierTransactionEntity>>(emptyPagination);
  const {
    getAllCashierTransactions,
    printReceipt,
    exportExcelCashierTransactions,
    getCashierTransactionHtml,
    deleteTransaction,
  } = cashierService;

  const fetchCashierTransactions = debounce(
    async (page: number, limit: number, key?: string, sorts?: SortingState) => {
      const data = await getAllCashierTransactions(
        String(page || 1),
        limit,
        key,
        sorts
      );
      setCashierTransactions(data);
    },
    500
  );

  const printLiveReceipt = async (id: number) => {
    const html = await getCashierTransactionHtml(String(id));
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow?.document.write(html);

    // Add a print command
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
  };

  const columns: ColumnDef<CashierTransactionEntity>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nomor Transaksi
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "transaction_number",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal transaksi
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "transaction_date",
      cell: ({ row }) => formatDate(row.original.transaction_date),
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Kasir
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "cashier_id",
      cell: ({ row }) => row.original.cashier.name,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Pelanggan
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "customer_name",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Barang
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "total_items",
      cell: ({ row }) => {
        const allQuantity = row.original.transaction_items.reduce(
          (acc, item) => acc + item.qty,
          0
        );
        return <p className="text-right">{allQuantity}</p>;
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Potongan
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "discount",
      cell: ({ row }) => {
        return (
          <p className="text-right">
            {numberToRupiah(Number(row.original.discount))}
          </p>
        );
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Biaya
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "total_payment",
      cell: ({ row }) => {
        const allPrice = row.original.transaction_items.reduce(
          (acc, item) => acc + item.qty * item.price_per_barang,
          0
        );
        return (
          <p className="text-right">
            {numberToRupiah(allPrice - Number(row.original.discount))}
          </p>
        );
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kas Masuk
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "payment_amount",
      cell: ({ row }) => {
        return (
          <p className="text-right">
            {numberToRupiah(row.original.payment_amount)}
          </p>
        );
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
      accessorKey: "payment_status",

      cell: ({ row }) => {
        return row.original.payment_status === 1 ? (
          <span className="text-success">Lunas</span>
        ) : (
          <span className="text-warning">Belum Lunas</span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <Link href={`./cashier-transaction/edit/${row?.original?.id}`}>
            <EditIcon size={18} className="text-yellow-500" />
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash size={18} className="text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Transaksi</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah kamu yakin ingin menghapus Transaksi ini?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const res = await deleteTransaction(row?.original?.id);
                    if (res) {
                      alert("Produk berhasil dihapus");
                      fetchCashierTransactions(1, 10);
                    }
                  }}
                >
                  Ya
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DownloadIcon
            size={18}
            className="text-green-500 cursor-pointer"
            onClick={async () => {
              await printReceipt(row?.original?.id);
            }}
          />
          <PrinterIcon
            size={18}
            className="text-blue-500 cursor-pointer"
            onClick={async () => {
              await printLiveReceipt(row?.original?.id);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <PaginatedDataTable
      columns={columns}
      data={cashierTransactions}
      exportService={exportExcelCashierTransactions}
      onChange={(page, limit, searchKey, sorts) =>
        fetchCashierTransactions(page, limit, searchKey, sorts)
      }
    />
  );
}
