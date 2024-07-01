import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import { storeInformationService } from "@/src/service/store-information";

export default async function EditSettingPage() {
  const { getStoreInformationServer } = storeInformationService;
  const setting = await getStoreInformationServer();

  return (
    <div>
      <PageHeader title="Edit Setting" />
      <EditForm
        storeName={setting?.name}
        storeAddress={setting?.address}
        storePhoneNumber={setting?.phone_number}
      />
    </div>
  );
}
