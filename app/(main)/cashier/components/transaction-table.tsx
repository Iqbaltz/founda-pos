import { CashierSchema } from "@/src/entity/cashier-entity";
import React, { useEffect, useState } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import AddItemForm from "./add-item-form";
import { ProductEntity } from "@/src/entity/product-entity";
import { TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { numberToRupiah } from "@/src/helpers/numberToRupiah";
import {
  FormControl,
  FormField,
  FormItem,
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
import { PaymentMethodEntity } from "@/src/entity/payment-method-entity";

type Props = {
  fieldArray: UseFieldArrayReturn<z.infer<typeof CashierSchema>>;
  products: ProductEntity[];
  form: UseFormReturn<z.infer<typeof CashierSchema>>;
  paymentMethods: PaymentMethodEntity[];
};

export default function TransactionTable({
  fieldArray,
  products,
  form,
  paymentMethods,
}: Props) {
  const { append, remove, fields } = fieldArray;
  const [potongan, setPotongan] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>(
    String(paymentMethods?.find((pm) => pm.name === "Tunai")?.id!)
  );
  const [bayar, setBayar] = useState<number>(0);

  const subtotal = fields.reduce((acc, item) => {
    const selectedProduct: any = products?.find(
      (product) => product.id === Number(item.barang_id)
    );
    return (
      acc + item.qty * selectedProduct?.[`harga_jual_${item.transaction_type}`]
    );
  }, 0);

  useEffect(() => {
    form.setValue("discount", potongan);
    form.setValue("payment_method_id", paymentMethod);
  }, [potongan, paymentMethod, form]);

  return (
    <>
      <AddItemForm append={append} products={products} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Tipe Harga</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields?.map((item, i) => {
            const selectedProduct: any = products?.find(
              (product) => product.id === Number(item.barang_id)
            );
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">
                  {selectedProduct?.name}
                </TableCell>
                <TableCell>
                  {numberToRupiah(
                    selectedProduct?.[`harga_jual_${item.transaction_type}`]
                  )}
                </TableCell>
                <TableCell className="capitalize">
                  {item.transaction_type}
                </TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell className="text-right">
                  {numberToRupiah(
                    Number(
                      item.qty *
                        selectedProduct?.[
                          `harga_jual_${item.transaction_type}`
                        ] || 0
                    )
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <TrashIcon
                    className="cursor-pointer text-destructive mx-auto"
                    onClick={() => {
                      remove(i);
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Subtotal
            </TableCell>
            <TableCell className="text-right">
              {numberToRupiah(subtotal)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Potongan
            </TableCell>
            <TableCell className="text-right">
              <Input
                className="text-right"
                type="text"
                value={numberToRupiah(potongan)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPotongan(Number(value));
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Total
            </TableCell>
            <TableCell className="text-right">
              {numberToRupiah(subtotal - potongan)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}></TableCell>
            <TableCell className="text-right">
              <Select
                onValueChange={(value) => setPaymentMethod(String(value))}
                value={paymentMethod}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Pilih Pelanggan --" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods?.map((pm) => (
                    <SelectItem key={pm.id} value={String(pm.id!)}>
                      {pm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
              <Input
                className="text-right"
                type="text"
                value={numberToRupiah(bayar)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setBayar(Number(value));
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Kembalian
            </TableCell>
            <TableCell className="text-right">
              <p>{numberToRupiah(bayar - (subtotal - potongan))}</p>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
