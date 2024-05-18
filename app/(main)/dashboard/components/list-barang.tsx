"use client";
import xios from "@/src/config/axios";
import React, { useEffect, useState } from "react";

type Props = {};

export default function ListBarang({}: Props) {
  const [barangs, setBarangs] = useState<any[]>();
  //   useEffect(() => {
  //     const _ = async () => {
  //       const res = await xios.get("/barang");
  //       setBarangs(res?.data?.data);
  //     };
  //     _();
  //   }, []);

  return (
    <div className="flex bg-primary">
      {barangs?.map((barang: any) => (
        <div key={barang.id} className="p-4 m-4">
          <h1 className="font-bold text-xl">{barang.name}</h1>
          <p className="text-sm">{barang.harga_jual_satuan}</p>
        </div>
      ))}
    </div>
  );
}
