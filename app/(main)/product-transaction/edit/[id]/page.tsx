import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import { productTransactionService } from "@/src/service/product-transaction";
import { productService } from "@/src/service/product";
import { supplierService } from "@/src/service/supplier";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditProductPage({ params }: Props) {
  const { getProductTransactionServer } = productTransactionService;
  const { getAllProductsServer } = productService;
  const { getAllSupplierServer } = supplierService;
  const [transaction, products, suppliers] = await Promise.all([
    getProductTransactionServer(Number(params.id)),
    getAllProductsServer(),
    getAllSupplierServer(),
  ]);

  return (
    <div>
      <PageHeader title="Edit Transaksi Barang Masuk" />
      <EditForm
        transaction_date={transaction.data.transaction_date}
        supplier_id={transaction.data.supplier_id}
        barang_id={transaction.data.barang_id}
        harga_beli={transaction.data.harga_beli}
        jumlah={transaction.data.jumlah}
        products={products}
        suppliers={suppliers}
      />
    </div>
  );
}
