import React from "react";
import CategoryList from "./category-list";
import PageHeader from "@/components/layout/page-header";

export default async function MasterCategoryPage() {
  return (
    <div>
      <PageHeader title="Category" />
      <CategoryList />
    </div>
  );
}
