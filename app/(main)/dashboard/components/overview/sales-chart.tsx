"use client";
import { formatCurrency } from "@/src/helpers/utils";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SalesTrendData = {
  date: string;
  sales: number;
};

type Props = {
  data: SalesTrendData[];
};

const SalesChart = ({ data }: Props) => {
  // Format date for display (e.g., "Mar 15")
  const formattedData = data.map((item) => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
  }));

  function formatNumber(num: number) {
    // Absolute value to handle negative numbers
    const absNum = Math.abs(num);

    // Billions
    if (absNum >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }

    // Millions
    if (absNum >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }

    // Thousands
    if (absNum >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }

    // Return original number as string if less than 1000
    return num.toString();
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="displayDate" />
          <YAxis tickFormatter={(value) => formatNumber(value)} />
          <Tooltip
            wrapperClassName="!bg-secondary"
            formatter={(value) => formatCurrency(Number(value))}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
