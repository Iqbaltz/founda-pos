"use client";
import React, { useEffect, useState } from "react";
import SalesChart from "./sales-chart";
import { Card, CardContent } from "@/components/ui/card";
import {
  BoxesIcon,
  LucideCreditCard,
  LucideShoppingCart,
  LucideUsers,
} from "lucide-react";
import { dashboardService } from "@/src/service/dashboard";
import { DashboardEntity } from "@/src/entity/dashboard-entity";
import { formatCurrency } from "@/src/helpers/utils";

export default function SalesOverview() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<DashboardEntity | null>(
    null
  );

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await dashboardService.getDashboardStats();
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading dashboard data...</div>;
  }

  if (!dashboardData) {
    return <div className="p-4 text-center">No dashboard data available</div>;
  }

  return (
    <div className="gap-4 grid grid-cols-1 lg:grid-cols-4 p-4">
      {/* Summary Cards */}
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <h2 className="font-bold text-2xl">
              {formatCurrency(Number(dashboardData.total_sales))}
            </h2>
          </div>
          <LucideShoppingCart size={32} className="text-blue-500" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Transactions</p>
            <h2 className="font-bold text-2xl">
              {dashboardData.total_transactions}
            </h2>
          </div>
          <LucideCreditCard size={32} className="text-green-500" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Customers</p>
            <h2 className="font-bold text-2xl">
              {dashboardData.total_customers}
            </h2>
          </div>
          <LucideUsers size={32} className="text-yellow-500" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <h2 className="font-bold text-2xl">
              {dashboardData.total_products}
            </h2>
          </div>
          <BoxesIcon size={32} className="text-orange-500" />
        </CardContent>
      </Card>
      {/* Sales Chart */}
      <Card className="col-span-3 p-4">
        <h3 className="mb-2 font-bold text-lg">Sales Trends (This Week)</h3>
        <SalesChart data={dashboardData.sales_trend_weekly} />
      </Card>
      {/* Top Selling Items */}
      <Card className="col-span-1 p-4">
        <h3 className="mb-2 font-bold text-lg">Top Selling Items</h3>
        <ul>
          <li className="flex justify-between items-center p-2 border-gray-200 border-b">
            <span className="line-clamp-1">PRODUCT NAME</span>
            <span>SOLD</span>
          </li>
          {dashboardData.top_selling_items?.slice(0, 5).map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-gray-200 border-b"
            >
              <span className="line-clamp-1">
                {index + 1}. {item.product_name}
              </span>
              <span>{item.sold}</span>
            </li>
          ))}
        </ul>
      </Card>
      {/* Recent Transactions */}
      <Card className="col-span-4 p-4">
        <h3 className="mb-2 font-bold text-lg">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="border border-gray-200 w-full border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-2 border text-left">Invoice</th>
                <th className="p-2 border text-left">Customer</th>
                <th className="p-2 border text-left">Date</th>
                <th className="p-2 border text-left">Amount</th>
                <th className="p-2 border text-left">Status</th>
                <th className="p-2 border text-left">Cashier</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recent_transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="p-2 border">
                    {transaction.transaction_number}
                  </td>
                  <td className="p-2 border">{transaction.customer_name}</td>
                  <td className="p-2 border">
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {formatCurrency(transaction.payment_amount)}
                  </td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.payment_status}
                    </span>
                  </td>
                  <td className="p-2 border">{transaction.cashier_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
