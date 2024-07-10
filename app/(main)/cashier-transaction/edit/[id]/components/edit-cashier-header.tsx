"use client";
import PageHeader from "@/components/layout/page-header";
import React from "react";
import { Trash } from "lucide-react";
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
import { CashierTransactionEntity } from "@/src/entity/cashier-transaction-entity";
import { cashierService } from "@/src/service/cashier";
import { useRouter } from "next-nprogress-bar";

type Props = {
  transactionDetail: CashierTransactionEntity;
};

export default function EditCashierHeader({ transactionDetail }: Props) {
  const { deleteTransaction } = cashierService;
  const router = useRouter();
  return (
    <PageHeader
      title="Detail Transaksi Kasir"
      description={transactionDetail?.transaction_number}
      rightContent={
        <AlertDialog>
          <AlertDialogTrigger className="flex items-center bg-destructive px-4 py-2 rounded-lg text-sm text-white">
            <Trash className="mr-2 w-4" />
            Hapus Transaksi
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
                  const res = await deleteTransaction(transactionDetail.id);
                  if (res) {
                    alert("Produk berhasil dihapus");
                    router.push("/cashier-transaction");
                  }
                }}
              >
                Ya
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    />
  );
}
