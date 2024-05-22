import PageHeader from "@/components/layout/page-header";
import React from "react";
import PaymentMethodList from "./payment-method-list";

type Props = {};

export default function MasterPaymentMethodPage({}: Props) {
  return (
    <div>
      <PageHeader title="Metode Pembayaran" />
      <PaymentMethodList />
    </div>
  );
}
