"use client";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
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
import { formatCurrency, formatDate } from "@/src/helpers/utils";
import { ProductTransactionEntity } from "@/src/entity/product-transaction-entity";
import { productTransactionService } from "@/src/service/product-transaction";
import { PaginatedDataTable } from "@/components/ui/paginated-data-table";
import PaginatedModel, { emptyPagination } from "@/src/helpers/pagination";
import debounce from "lodash.debounce";

type Props = {};

export default function ProductTransactionList({}: Props) {
  const [productTransactions, setProductTransactions] =
    useState<PaginatedModel<ProductTransactionEntity>>(emptyPagination);
  const { getAllProductTransactions, deleteProductTransaction } =
    productTransactionService;

  const fetchProductTransactions = debounce(
    async (page: number, key: string, sorts: SortingState) => {
      const data = await getAllProductTransactions(
        String(page || 1),
        key,
        sorts
      );
      setProductTransactions(data);
    },
    500
  );

  const columns: ColumnDef<ProductTransactionEntity>[] = [
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
            Nama Barang
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "barang_id",
      cell: ({ row }) => row.original?.barang?.name,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Supplier
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "supplier_id",
      cell: ({ row }) => row.original?.supplier?.name,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            harga Beli
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "harga_beli",
      cell: ({ row }) => formatCurrency(row.original.harga_beli),
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jumlah
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "jumlah",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "total",
      cell: ({ row }) =>
        formatCurrency(row.original.harga_beli * row.original.jumlah),
    },
    {
      header: "Action",
      accessorKey: "",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`./product-transaction/edit/${row?.original?.id}`}>
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
                    const res = await deleteProductTransaction(
                      row?.original?.id!
                    );
                    if (res) {
                      alert("Transaksi berhasil dihapus");
                      fetchProductTransactions(1, "", []);
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
    <PaginatedDataTable
      columns={columns}
      data={productTransactions}
      addLink="./product-transaction/add"
      onChange={(page, searchKey, sorts) =>
        fetchProductTransactions(page, searchKey, sorts)
      }
    />
  );
}
