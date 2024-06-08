"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon, TrashIcon } from "lucide-react";
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

type Props = {
  products: ProductEntity[];
};

export default function CashierTransactionList({ products }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  const [cashierTransactions, setCashierTransactions] =
    useState<PaginatedModel<CashierTransactionEntity>>(emptyPagination);
  const { getAllCashierTransactions } = cashierService;

  const fetchCashierTransactions = async (page: string | null) => {
    const data = await getAllCashierTransactions(String(page || 1));
    setCashierTransactions(data);
  };

  useEffect(() => {
    fetchCashierTransactions(queryPage);
  }, [queryPage]);

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
      accessorKey: "cashier.name",
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
      accessorKey: "transaction_items",
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
      accessorKey: "transaction_items",
      cell: ({ row }) => {
        const allPrice = row.original.transaction_items.reduce(
          (acc, item) =>
            acc +
            item.qty *
              (products?.find((product) => product.id === item.barang_id)?.[
                `harga_jual_${item.transaction_type as TransactionType}`
              ] || 0),
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
        <div className="flex justify-center">
          <Link href={`./cashier-transaction/edit/${row?.original?.id}`}>
            <EditIcon size={18} className="text-yellow-500" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <PaginatedDataTable
      columns={columns}
      data={cashierTransactions}
      addLink="./cashier-transaction/add"
      onPageChange={(page) => router.push(`/cashier-transaction?page=${page}`)}
    />
  );
}
