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
import { CashierEntity } from "@/src/entity/cashier-entity";
import { cashierService } from "@/src/service/cashier";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function SyncTransactionList({}: Props) {
  const { addTransaction, getCashierTransactionHtml } = cashierService;
  const router = useRouter();
  const cashierTransaction =
    typeof window !== "undefined"
      ? window.localStorage.getItem("cashierTransaction")
      : null;
  const cashierTransactionParsed = JSON.parse(
    cashierTransaction || "[]"
  ) as CashierEntity[];

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

  const handleSyncTransaction = async (transaction: CashierEntity) => {
    const res = await addTransaction(transaction);

    if (res?.id) {
      await printLiveReceipt(res?.id);
      alert("Transaksi berhasil!");
      router.push("/cashier-transaction");

      const cashierTransaction = JSON.parse(
        localStorage.getItem("cashierTransaction") || "[]"
      );
      const newCashierTransaction = cashierTransaction.filter(
        (item: CashierEntity) =>
          item.transaction_date !== transaction.transaction_date
      );
      localStorage.setItem(
        "cashierTransaction",
        JSON.stringify(newCashierTransaction)
      );
    }
  };

  const handleDeleteTransaction = async (transaction_date: string) => {
    const cashierTransaction = JSON.parse(
      localStorage.getItem("cashierTransaction") || "[]"
    );
    const newCashierTransaction = cashierTransaction.filter(
      (item: CashierEntity) => item.transaction_date !== transaction_date
    );
    localStorage.setItem(
      "cashierTransaction",
      JSON.stringify(newCashierTransaction)
    );

    router.refresh();
  };

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
            {format(
              new Date(row.original.transaction_date),
              "dd MMM yyyy, hh:mm"
            )}
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
            {row.original.items.map((item: any, idx: number) => {
              return (
                <span key={idx}>
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
                handleSyncTransaction(row.original);
              }}
            >
              Sync
            </Button>

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
                    onClick={() => {
                      handleDeleteTransaction(row.original.transaction_date);
                    }}
                  >
                    Ya
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
