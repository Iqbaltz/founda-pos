import PageHeader from "@/components/layout/page-header";
import React from "react";
import SalesOverview from "./components/overview/sales-overview";

const DashboardPage = () => {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <SalesOverview />
    </div>
  );
};

export default DashboardPage;
