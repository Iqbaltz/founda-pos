import { CashierSchema } from "@/src/entity/cashier-entity";
import React, { useEffect, useState } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";
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
  form: UseFormReturn<z.infer<typeof CashierSchema>>;
  products: ProductEntity[];
  paymentMethods: PaymentMethodEntity[];
};

export default function EditTransactionTable({
  fieldArray,
  products,
  form,
  paymentMethods,
}: Props) {
  const { fields } = fieldArray;
  const [paymentMethod, setPaymentMethod] = useState<string>(
    form.getValues("payment_method_id")
  );
  const potongan = form.getValues("discount");
  const bayar = Number(form.getValues("payment_amount"));

  const [sisaBayar, setSisaBayar] = useState<number>(0);

  const subtotal = fields.reduce((acc, item) => {
    const selectedProduct: any = products?.find(
      (product) => product.id === Number(item.barang_id)
    );
    return (
      acc + item.qty * selectedProduct?.[`harga_jual_${item.transaction_type}`]
    );
  }, 0);
  const kembalian = bayar - (subtotal - potongan);

  useEffect(() => {
    form.setValue("payment_amount", bayar + sisaBayar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sisaBayar]);

  return (
    <>
      {form.formState.errors.items?.message && (
        <p className="text-destructive">
          {form.formState.errors.items.message}
        </p>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Tipe Harga</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields?.length ? (
            fields?.map((item, i) => {
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
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Belum ada data
              </TableCell>
            </TableRow>
          )}
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
                disabled
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
              <Select value={paymentMethod} disabled>
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
                disabled
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Kembalian
            </TableCell>
            <TableCell className="text-right">
              <p>{numberToRupiah(kembalian + sisaBayar)}</p>
            </TableCell>
          </TableRow>
          <TableRow className="bg-accent">
            <TableCell colSpan={5} className="text-right">
              Masukkan Sisa Pembayaran
            </TableCell>
            <TableCell className="text-right">
              <Input
                className="text-right"
                type="text"
                value={numberToRupiah(sisaBayar)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setSisaBayar(Number(value));
                }}
                disabled={kembalian >= 0}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
