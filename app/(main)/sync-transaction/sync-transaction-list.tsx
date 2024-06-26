"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { CashierEntity } from "@/src/entity/cashier-entity";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React from "react";

type Props = {};

export default function SyncTransactionList({}: Props) {
  const cashierTransaction =
    typeof window !== "undefined"
      ? window.localStorage.getItem("cashierTransaction")
      : null;
  const cashierTransactionParsed = JSON.parse(
    cashierTransaction || "[]"
  ) as CashierEntity[];

  const columns: ColumnDef<CashierEntity>[] = [
    {
      header: "No.",
      accessorKey: "",
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },

    {
      header: () => {
        return <div className="min-w-[116px]">Tanggal Transaksi</div>;
      },
      accessorKey: "transaction_date",
      cell: ({ row }) => {
        return (
          <div>
            {format(new Date(row.original.transaction_date), "dd MMM yyyy")}
          </div>
        );
      },
    },
    {
      header: () => <div className="min-w-[56px]">ID Kasir</div>,
      accessorKey: "cashier_id",
    },
    {
      header: () => <div className="min-w-[116px]">ID Customer</div>,
      accessorKey: "customer_id",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.customer_id == null
              ? "UMUM"
              : row.original.customer_id}
          </div>
        );
      },
    },
    {
      header: "Barang",
      accessorKey: "items",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.items.map((item: any) => {
              return (
                <span key={item.barang_id}>
                  ~{item.transaction_type}-{item.barang_id}-{item.qty}{" "}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      header: "Diskon",
      accessorKey: "discount",
    },
    // {
    //   header: "Total",
    //   accessorKey: "total",
    // },

    {
      header: () => <div className="min-w-[88px]">Total Dibayar</div>,
      accessorKey: "payment_amount",
    },
    {
      header: () => <div className="min-w-[144px]">Metode Pembayaran</div>,
      accessorKey: "payment_method_id",
    },
    // {
    //   header: "Status",
    //   accessorKey: "status",
    // },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => {
                console.log(row.original);
              }}
            >
              Sync
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                console.log(row.original);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={cashierTransactionParsed} />
    </div>
  );
}
