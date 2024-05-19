import ListBarang from "./components/list-barang";

export default async function Home() {
  return (
    <div className="w-full bg-secondary flex flex-col justify-center items-center p-8">
      <h1 className="font-bold text-2xl">Pursida Cashier Dashboard</h1>
      <ListBarang />
    </div>
  );
}
