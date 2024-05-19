"use client";
import { fetchWrapper } from "@/src/helpers/fetch-wrapper";
import React, { useEffect, useState } from "react";

type Props = {};

export default function ListBarang({}: Props) {
  const [barangs, setBarangs] = useState<any[]>();

  const loadData = async () => {
    const res = await fetchWrapper.get("/barang");
    if (res?.data) {
      setBarangs(res.data);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log("barangs", barangs);

  return (
    <div className="flex flex-col">
      {barangs?.map((barang) => (
        <div key={barang.id} className="p-4 m-4 bg-primary-foreground">
          <h1 className="font-bold text-xl">{barang.name}</h1>
          <p className="text-sm">{barang.harga_jual_satuan}</p>
        </div>
      ))}
    </div>
  );
}
