import PageHeader from "@/components/layout/page-header";
import { Building2Icon, HammerIcon } from "lucide-react";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <h1>Currently on progress... ⚒️🧑‍💻</h1>
    </div>
  );
};

export default DashboardPage;
