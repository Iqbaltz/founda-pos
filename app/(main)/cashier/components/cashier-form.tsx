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
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format, sub } from "date-fns";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Invoice from "@/components/invoice";
import { StoreInformationEntity } from "@/src/entity/store-information-entity";

type Props = {
  customers: CustomerEntity[];
  products: ProductEntity[];
  paymentMethods: PaymentMethodEntity[];
  storeInformation: StoreInformationEntity | null;
};

export default function CashierForm({
  customers,
  products,
  paymentMethods,
  storeInformation,
}: Props) {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });
  const router = useRouter();
  const session: any = useSession();
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const form = useForm<z.infer<typeof CashierSchema>>({
    resolver: zodResolver(CashierSchema),
    defaultValues: {
      transaction_date: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
      customer_id: "0",
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { addTransaction, getCashierTransactionHtml } = cashierService;

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

    if (res?.status === "offline") {
      form.reset(
        {
          ...data,
          items: [],
        },
        { keepValues: false }
      );
      handlePrint();
    } else if (res?.id) {
      await printLiveReceipt(res?.id);
      form.reset();
      alert("Transaksi berhasil!");
      router.push("/cashier-transaction");
    }
  }

  useEffect(
    () => {
      form.setValue("cashier_id", session?.data?.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session?.data?.id]
  );

  useEffect(() => {
    setCreatedAt(format(new Date(), "yyyy-MM-dd hh:mm:ss"));
  }, []);

  const customerData = {
    name:
      form.watch("customer_id") === "0"
        ? "UMUM"
        : customers?.find(
            (customer) => customer.id === Number(form.watch("customer_id"))
          )?.name || "UMUM",
    address:
      customers?.find(
        (customer) => customer.id === Number(form.watch("customer_id"))
      )?.address || "-",
    phone_number:
      customers?.find(
        (customer) => customer.id === Number(form.watch("customer_id"))
      )?.phone_number || "-",
  };

  const invoiceItems =
    fieldArray.fields.map((item, index) => {
      const selectedProduct: any = products?.find(
        (product) => product.id === Number(item.barang_id)
      );
      return {
        no: index + 1,
        name: selectedProduct?.name,
        qty: item.qty,
        price: selectedProduct?.[`harga_jual_${item.transaction_type}`],
        amount:
          item.qty * selectedProduct?.[`harga_jual_${item.transaction_type}`],
      };
    }) || [];

  const cashierInfo = {
    subtotal: invoiceItems.reduce((acc, item) => acc + item.amount, 0),
    discount: form.watch("discount") || 0,
    total:
      invoiceItems.reduce((acc, item) => acc + item.amount, 0) -
      form.watch("discount"),
    cash: form.watch("payment_amount") || 0,
    change:
      form.watch("payment_amount") -
      (invoiceItems.reduce((acc, item) => acc + item.amount, 0) -
        form.watch("discount")),
  };

  const invoiceData = {
    store_name: storeInformation?.name || "",
    store_address: storeInformation?.address || "",
    store_phone_number: storeInformation?.phone_number || "",
    no_nota: "~",
    kasir: session?.data?.user?.name,
    pelanggan: customerData.name,
    alamat: customerData.address,
    no_telp: customerData.phone_number,
    items: invoiceItems,
    subtotal: cashierInfo.subtotal,
    diskon: cashierInfo.discount,
    total: cashierInfo.total,
    tunai: cashierInfo.cash,
    kembalian: cashierInfo.change,
    created_at: createdAt,
  };

  return (
    <div>
      <Button onClick={handlePrint}>Print</Button>
      <div ref={componentRef} className="hidden print:block">
        <Invoice {...invoiceData} />
      </div>
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
    </div>
  );
}
