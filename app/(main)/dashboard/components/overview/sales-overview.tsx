"use client";
import React from "react";
import SalesChart from "./sales-chart";
import { Card, CardContent } from "@/components/ui/card";
import {
  BoxesIcon,
  LucideCreditCard,
  LucideShoppingCart,
  LucideUsers,
} from "lucide-react";

type Props = {};

const SalesOverview = (props: Props) => {
  return (
    <div className="gap-4 grid grid-cols-1 lg:grid-cols-4 p-4">
      {/* Summary Cards */}
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <h2 className="font-bold text-2xl">$12,345</h2>
          </div>
          <LucideShoppingCart size={32} className="text-blue-500" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Transactions</p>
            <h2 className="font-bold text-2xl">234</h2>
          </div>
          <LucideCreditCard size={32} className="text-green-500" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Customers</p>
            <h2 className="font-bold text-2xl">1,523</h2>
          </div>
          <LucideUsers size={32} className="text-yellow-500" />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <h2 className="font-bold text-2xl">117</h2>
          </div>
          <BoxesIcon size={32} className="text-orange-500" />
        </CardContent>
      </Card>
      {/* Sales Chart */}
      <Card className="col-span-3 p-4">
        <h3 className="mb-2 font-bold text-lg">Sales Trends (This Week)</h3>
        <SalesChart />
      </Card>
      {/* Top Selling Items */}
      <Card className="col-span-1 p-4">
        <h3 className="mb-2 font-bold text-lg">Top Selling Items</h3>
        <ul>
          <li className="flex justify-between items-center p-2 border-gray-200 border-b">
            <span className="line-clamp-1">Product 1</span>
            <span>100</span>
          </li>
          <li className="flex justify-between items-center p-2 border-gray-200 border-b">
            <span className="line-clamp-1">Product 2</span>
            <span>71</span>
          </li>
          <li className="flex justify-between items-center p-2 border-gray-200 border-b">
            <span className="line-clamp-1">Product 3</span>
            <span>45</span>
          </li>
          <li className="flex justify-between items-center p-2 border-gray-200 border-b">
            <span className="line-clamp-1">Product 4</span>
            <span>34</span>
          </li>
          <li className="flex justify-between items-center p-2 border-gray-200 border-b">
            <span className="line-clamp-1">Product 5</span>
            <span>22</span>
          </li>
          {/* More items */}
        </ul>
      </Card>
      {/* Recent Transactions */}
      <Card className="col-span-4 p-4">
        <h3 className="mb-2 font-bold text-lg">Recent Transactions</h3>
        <table className="border border-gray-200 w-full border-collapse">
          <thead>
            <tr className="bg-primary">
              <th className="p-2 border">Invoice</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Method</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">#1234</td>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">$50.00</td>
              <td className="p-2 border">Credit Card</td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SalesOverview;
