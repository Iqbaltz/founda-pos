import { customerService } from "@/src/service/customer";
import CashierForm from "./components/cashier-form";
import PageHeader from "@/components/layout/page-header";
import { productService } from "@/src/service/product";
import { paymentMethodService } from "@/src/service/payment-method";
import { storeInformationService } from "@/src/service/store-information";

export const dynamic = "force-dynamic";

export default async function CashierPage() {
  const { getAllCustomerServer } = customerService;
  const { getAllProductsServer } = productService;
  const { getAllPaymentMethodsServer } = paymentMethodService;
  const { getStoreInformationServer } = storeInformationService;

  const customers = await getAllCustomerServer();
  const products = await getAllProductsServer();
  const paymentMethods = await getAllPaymentMethodsServer();
  const storeInformation = await getStoreInformationServer();

  return (
    <div>
      <PageHeader title="Kasir" />
      <CashierForm
        customers={customers}
        products={products}
        paymentMethods={paymentMethods}
        storeInformation={storeInformation}
      />
    </div>
  );
}
