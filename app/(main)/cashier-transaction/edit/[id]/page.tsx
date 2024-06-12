import PageHeader from "@/components/layout/page-header";
import { cashierService } from "@/src/service/cashier";
import React from "react";
import EditCashierForm from "./components/edit-cashier-form";
import { productService } from "@/src/service/product";
import { paymentMethodService } from "@/src/service/payment-method";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCashierTransactionPage({ params }: Props) {
  const { getCashierTransactionServer } = cashierService;
  const { getAllProductsServer } = productService;
  const { getAllPaymentMethodsServer } = paymentMethodService;

  const transactionDetail = await getCashierTransactionServer(params?.id);
  const products = await getAllProductsServer();
  const paymentMethods = await getAllPaymentMethodsServer();

  return (
    <div>
      <PageHeader title={transactionDetail?.transaction_number} />
      <EditCashierForm
        transactionDetail={transactionDetail}
        products={products}
        paymentMethods={paymentMethods}
      />
    </div>
  );
}
