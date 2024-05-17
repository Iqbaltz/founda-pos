import { useSidebarContext } from "@/src/context/layout-context";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

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

        <div className="flex-1 overflow-y-auto mt-4">
          <ul>
            <li className="px-4 py-2 text-foreground hover:bg-accent">
              Dashboard
            </li>
            <li className="px-4 py-2 text-foreground hover:bg-accent">Users</li>
            <li className="px-4 py-2 text-foreground hover:bg-accent">
              Settings
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
