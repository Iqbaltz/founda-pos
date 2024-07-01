"use client";
import { format } from "date-fns";
import React from "react";

interface Item {
  no: number;
  name: string;
  qty: number;
  price: number;
  amount: number;
}

export interface InvoiceProps {
  store_name: string;
  store_address: string;
  store_phone_number: string;
  no_nota: string;
  pelanggan: string;
  kasir: string;
  alamat: string;
  no_telp: string;
  items: Item[];
  subtotal: number;
  diskon: number;
  total: number;
  tunai: number;
  kembalian: number;
  created_at?: string | null;
}

const Invoice: React.FC<InvoiceProps> = ({
  store_name,
  store_address,
  store_phone_number,
  no_nota,
  pelanggan,
  kasir,
  alamat,
  no_telp,
  items,
  subtotal,
  diskon,
  total,
  tunai,
  kembalian,
  created_at = format(new Date(), "dd/MM/yyyy HH:mm:ss"),
}) => {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        width: "100%",
        maxWidth: "28rem",
        margin: "0 auto",
        padding: "0.5rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "bold",
            marginBottom: "0",
          }}
        >
          {store_name}
        </h2>
        <p style={{ fontSize: "0.875rem" }}>
          {store_address}
          <br />
          Telepon: {store_phone_number}
        </p>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <table
          style={{ width: "100%", fontSize: "0.75rem", marginBottom: "0.5rem" }}
        >
          <tbody>
            <tr>
              <td>No. Nota: {no_nota}</td>
              <td style={{ textAlign: "right" }}>{created_at}</td>
            </tr>
            <tr>
              <td>Pelanggan: {pelanggan}</td>
              <td style={{ textAlign: "right" }}>Kasir: {kasir}</td>
            </tr>
            <tr>
              <td colSpan={2}>Alamat: {alamat}</td>
            </tr>
            <tr>
              <td colSpan={2}>No. HP: {no_telp}</td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            fontSize: "0.75rem",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px dashed gray",
                  padding: "0.25rem",
                  textAlign: "left",
                }}
              >
                No.
              </th>
              <th
                style={{
                  borderBottom: "1px dashed gray",
                  padding: "0.25rem",
                  textAlign: "left",
                  minWidth: "88px",
                }}
              >
                Nama Barang
              </th>
              <th
                style={{
                  borderBottom: "1px dashed gray",
                  padding: "0.25rem",
                  textAlign: "left",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  borderBottom: "1px dashed gray",
                  padding: "0.25rem",
                  textAlign: "left",
                  minWidth: "80px",
                }}
              >
                Harga
              </th>
              <th
                style={{
                  borderBottom: "1px dashed gray",
                  padding: "0.25rem",
                  textAlign: "left",
                }}
              >
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    borderBottom: "1px dashed gray",
                    padding: "0.25rem",
                  }}
                >
                  {item.no}
                </td>
                <td
                  style={{
                    borderBottom: "1px dashed gray",
                    padding: "0.25rem",
                  }}
                >
                  {item.name}
                </td>
                <td
                  style={{
                    borderBottom: "1px dashed gray",
                    padding: "0.25rem",
                  }}
                >
                  {item.qty}
                </td>
                <td
                  style={{
                    borderBottom: "1px dashed gray",
                    padding: "0.25rem",
                  }}
                >
                  {item.price.toLocaleString()}
                </td>
                <td
                  style={{
                    borderBottom: "1px dashed gray",
                    padding: "0.25rem",
                  }}
                >
                  {item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}></td>
              <td style={{ padding: "0.25rem" }}>Subtotal</td>
              <td style={{ padding: "0.25rem" }}>
                {subtotal.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td style={{ padding: "0.25rem" }}>Diskon (%)</td>
              <td style={{ padding: "0.25rem" }}>{diskon.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td style={{ padding: "0.25rem" }}>Total Tagihan</td>
              <td style={{ padding: "0.25rem" }}>{total.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td style={{ padding: "0.25rem" }}>Total Bayar</td>
              <td style={{ padding: "0.25rem" }}>{tunai.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td style={{ padding: "0.25rem" }}>Kembalian</td>
              <td style={{ padding: "0.25rem" }}>
                {kembalian.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "0.5rem",
          fontSize: "0.75rem",
        }}
      >
        <p>***Terimakasih Atas Kunjungan Anda***</p>
      </div>
    </div>
  );
};

export default Invoice;
