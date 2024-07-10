import { cashierService } from "@/src/service/cashier";
import React from "react";
import EditCashierForm from "./components/edit-cashier-form";
import { productService } from "@/src/service/product";
import { paymentMethodService } from "@/src/service/payment-method";
import EditCashierHeader from "./components/edit-cashier-header";

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
      <EditCashierHeader transactionDetail={transactionDetail} />
      <EditCashierForm
        transactionDetail={transactionDetail}
        products={products}
        paymentMethods={paymentMethods}
      />
    </div>
  );
}
