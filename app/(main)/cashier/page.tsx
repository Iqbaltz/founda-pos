import CashierForm from "./components/cashier-form";

export default async function CashierPage() {
  return (
    <div className="w-full bg-secondary flex flex-col justify-center items-center p-8">
      <h1 className="font-bold text-2xl mb-4">Pursida Cashier Page</h1>
      <CashierForm />
    </div>
  );
}
