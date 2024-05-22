import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import { categoryService } from "@/src/service/category";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCategoryPage({ params }: Props) {
  const { getCategoryServer } = categoryService;
  const categoryName = await getCategoryServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Kategori" />
      <EditForm categoryName={categoryName?.data?.name} />
    </div>
  );
}
