"use client";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, DownloadIcon, EditIcon } from "lucide-react";
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

export default function CashierTransactionList() {
  const [cashierTransactions, setCashierTransactions] =
    useState<PaginatedModel<CashierTransactionEntity>>(emptyPagination);
  const {
    getAllCashierTransactions,
    printReceipt,
    exportExcelCashierTransactions,
  } = cashierService;

  const fetchCashierTransactions = debounce(
    async (page: number, limit: number, key: string, sorts: SortingState) => {
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

  const columns: ColumnDef<CashierTransactionEntity>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nomor Transaksi
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <DownloadIcon
            size={18}
            className="cursor-pointer text-green-500"
            onClick={async () => {
              await printReceipt(row?.original?.id);
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
