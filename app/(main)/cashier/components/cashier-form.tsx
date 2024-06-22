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
import TransactionTable from "./transaction-table";
import { CustomerEntity } from "@/src/entity/customer-entity";
import { ProductEntity } from "@/src/entity/product-entity";
import { PaymentMethodEntity } from "@/src/entity/payment-method-entity";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  customers: CustomerEntity[];
  products: ProductEntity[];
  paymentMethods: PaymentMethodEntity[];
};

export default function CashierForm({
  customers,
  products,
  paymentMethods,
}: Props) {
  const router = useRouter();
  const session: any = useSession();
  const form = useForm<z.infer<typeof CashierSchema>>({
    resolver: zodResolver(CashierSchema),
    defaultValues: {
      transaction_date: new Date().toISOString().split("T")[0],
      customer_id: "0",
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { addTransaction, printReceipt, getCashierTransactionHtml } =
    cashierService;

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
  async function onSubmit(data: z.infer<typeof CashierSchema>) {
    const res = await addTransaction({
      ...data,
      customer_id: data.customer_id === "0" ? null : data.customer_id,
    });

    if (res) {
      await printLiveReceipt(res?.id);
      form.reset();
      alert("Transaksi berhasil!");
      router.push("/cashier-transaction");
      // await printReceipt(res?.id);
      // form.reset();
      // alert("Transaksi berhasil!");
      // router.push("/cashier-transaction");
    }
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
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Pilih Pelanggan --" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers?.map((customer) => (
                          <SelectItem
                            key={customer.id}
                            value={String(customer.id!)}
                          >
                            {customer.name}
                          </SelectItem>
                        ))}
                        <SelectItem value={"0"}>UMUM</SelectItem>
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
        <TransactionTable
          fieldArray={fieldArray}
          products={products}
          form={form}
          paymentMethods={paymentMethods}
        />
        <div className="flex justify-end">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form?.formState?.isSubmitting}
          >
            Submit Transaksi
          </Button>
        </div>
      </div>
    </>
  );
}
