import { customerService } from "@/src/service/customer";
import CashierForm from "./components/cashier-form";
import PageHeader from "@/components/layout/page-header";
import { productService } from "@/src/service/product";
import { paymentMethodService } from "@/src/service/payment-method";

export default async function CashierPage() {
  const { getAllCustomerServer } = customerService;
  const { getAllProductsServer } = productService;
  const { getAllPaymentMethodsServer } = paymentMethodService;

  const customers = await getAllCustomerServer();
  const products = await getAllProductsServer();
  const paymentMethods = await getAllPaymentMethodsServer();

  return (
    <div>
      <PageHeader title="Kasir" />
      <CashierForm
        customers={customers}
        products={products}
        paymentMethods={paymentMethods}
      />
    </div>
  );
}
