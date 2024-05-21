import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import axios from "axios";
import { redirect } from "next/navigation";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCategoryPage({ params }: Props) {
  const token = await getToken({
    req: {
      headers: headers(),
      // @ts-ignore
      cookies: cookies(),
    },
  });
  let categoryName = "";

  // need to make this dynamic
  try {
    const categoryRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/seng`,

      { headers: { Authorization: `Bearer ${token?.accessToken}` } }
    );

    categoryName = categoryRes.data.data.name;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        redirect("/login");
      }
    }
    console.error(error);
  }

  return (
    <div>
      <PageHeader title="Edit Kategori" />
      <EditForm categoryName={categoryName} />
    </div>
  );
}
