"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CashierSchema } from "@/src/entity/cashier-entity";
import { cashierService } from "@/src/service/cashier";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import EditTransactionTable from "./edit-transaction-table";
import { CustomerEntity } from "@/src/entity/customer-entity";
import { ProductEntity } from "@/src/entity/product-entity";
import { PaymentMethodEntity } from "@/src/entity/payment-method-entity";
import { useSession } from "next-auth/react";
import { CanvasHTMLAttributes, useEffect } from "react";
import { CashierTransactionEntity } from "@/src/entity/cashier-transaction-entity";

type Props = {
  transactionDetail: CashierTransactionEntity;
  products: ProductEntity[];
  paymentMethods: PaymentMethodEntity[];
};

export default function EditCashierForm({
  transactionDetail,
  products,
  paymentMethods,
}: Props) {
  const session: any = useSession();
  const form = useForm<z.infer<typeof CashierSchema>>({
    resolver: zodResolver(CashierSchema),
    defaultValues: {
      transaction_date: new Date().toISOString().split("T")[0],
      customer_id: transactionDetail?.customer_id,
      discount: Number(transactionDetail?.discount),
      payment_amount: transactionDetail?.payment_amount,
      payment_method_id: String(transactionDetail?.payment_method_id),
      items: transactionDetail?.transaction_items?.map((item) => ({
        barang_id: String(item.barang_id),
        qty: item.qty,
        transaction_type: item.transaction_type,
      })),
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { editTransaction } = cashierService;

  async function onSubmit(data: z.infer<typeof CashierSchema>) {
    console.log("data", data);
    // const res = await editTransaction({
    //   ...data,
    // });
    // if (res) {
    //   alert("Transaksi berhasil!");
    //   form.reset();
    // }
  }

  useEffect(
    () => {
      form.setValue("cashier_id", session?.data?.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session?.data?.id]
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Pelanggan</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                      disabled
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Pilih Pelanggan --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          key={transactionDetail?.customer_id}
                          value={String(transactionDetail?.customer_id!)}
                        >
                          {transactionDetail?.customer?.name}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transaction_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="space-y-4 my-4">
        <EditTransactionTable
          fieldArray={fieldArray}
          form={form}
          products={products}
          paymentMethods={paymentMethods}
        />
        <div className="flex justify-end" onClick={form.handleSubmit(onSubmit)}>
          <Button>Bayar Sisa</Button>
        </div>
      </div>
    </>
  );
}
