"use client";
import React from "react";
import Sidebar from "../sidebar/sidebar";
import { SidebarContext } from "@/src/context/layout-context";
import Navbar from "../navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <Sidebar />
        <Navbar>{children}</Navbar>
      </section>
    </SidebarContext.Provider>
  );
};
