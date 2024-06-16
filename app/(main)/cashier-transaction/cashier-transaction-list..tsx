"use client";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, DownloadIcon, EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/src/helpers/utils";
import { PaginatedDataTable } from "@/components/ui/paginated-data-table";
import PaginatedModel, { emptyPagination } from "@/src/helpers/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { CashierTransactionEntity } from "@/src/entity/cashier-transaction-entity";
import { cashierService } from "@/src/service/cashier";
import { ProductEntity } from "@/src/entity/product-entity";
import { TransactionType } from "@/src/helpers/constants";
import { numberToRupiah } from "@/src/helpers/numberToRupiah";
import { saveAs } from "file-saver";
import debounce from "lodash.debounce";

type Props = {
  products: ProductEntity[];
};

export default function CashierTransactionList({ products }: Props) {
  const searchParams = useSearchParams();
  const [cashierTransactions, setCashierTransactions] =
    useState<PaginatedModel<CashierTransactionEntity>>(emptyPagination);
  const { getAllCashierTransactions, printReceipt } = cashierService;

  const fetchCashierTransactions = debounce(
    async (page: number, key: string, sorts: SortingState) => {
      const data = await getAllCashierTransactions(
        String(page || 1),
        key,
        sorts
      );
      setCashierTransactions(data);
    },
    500
  );

  const columns: ColumnDef<CashierTransactionEntity>[] = [
    {
      header: "Index",
      cell: (info) => info.row.index + 1,
    },
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
              await printReceipt(
                row?.original?.id,
                row?.original?.transaction_number
              );
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
      onChange={(page, searchKey, sorts) =>
        fetchCashierTransactions(page, searchKey, sorts)
      }
    />
  );
}
