import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import { categoryService } from "@/src/service/category";
import { productService } from "@/src/service/product";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditProductPage({ params }: Props) {
  const { getProductServer } = productService;
  const product = await getProductServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Barang" />
      <EditForm
        name={product?.data?.name}
        category_id={product?.data?.category_id}
        hitung_stok={product?.data?.hitung_stok}
        harga_modal={product?.data?.harga_modal}
        harga_jual_satuan={product?.data?.harga_jual_satuan}
        harga_jual_grosir={product?.data?.harga_jual_grosir}
        harga_jual_reseller={product?.data?.harga_jual_reseller}
        stok={product?.data?.stok}
      />
    </div>
  );
}
