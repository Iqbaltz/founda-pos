import { useSidebarContext } from "@/src/context/layout-context";
import React from "react";
import CollapsableItem from "./collapsable-item";
import Link from "next/link";

type Props = {};

const sidebarItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Daftar Barang",
    link: "/products",
  },
  {
    name: "Daftar Supplier",
    link: "/suppliers",
  },
  {
    name: "Daftar Pelanggan",
    link: "/customers",
  },
  {
    name: "Master",
    sub: [
      {
        name: "Kategori",
        link: "/master/category",
      },
      {
        name: "Metode Pembayaran",
        link: "/master/payment-method",
      },
    ],
  },
  {
    name: "Pengaturan",
    link: "/settings",
  },
];

export default function Sidebar({}: Props) {
  const { collapsed, setCollapsed } = useSidebarContext();
  return (
    <aside className="sticky top-0 z-50 h-screen flex">
      {collapsed ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:invisible"
          onClick={() => setCollapsed()}
        ></div>
      ) : null}
      <div
        className={`fixed flex flex-col -translate-x-full h-full bg-primary-foreground transition z-10 ${
          collapsed
            ? "md:fixed md:-translate-x-full -translate-x-0"
            : "md:static md:-translate-x-0 -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="font-bold">Pursida Cashier</h1>
        </div>

        <div className="flex flex-col overflow-y-auto mt-4">
          {sidebarItems.map((item, index) => {
            if (item.sub) {
              return (
                <CollapsableItem key={index} name={item.name} sub={item.sub} />
              );
            } else {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className="px-4 py-3 text-foreground hover:bg-accent cursor-pointer"
                >
                  {item.name}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </aside>
  );
}
