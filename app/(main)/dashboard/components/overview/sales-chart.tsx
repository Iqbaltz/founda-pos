"use client";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";

const data = [
  {
    name: new Date(
      new Date().setDate(new Date().getDate() - 5)
    ).toLocaleDateString(),
    Total: 2400,
  },
  {
    name: new Date(
      new Date().setDate(new Date().getDate() - 4)
    ).toLocaleDateString(),
    Total: 1398,
  },
  {
    name: new Date(
      new Date().setDate(new Date().getDate() - 4)
    ).toLocaleDateString(),
    Total: 5800,
  },
  {
    name: new Date(
      new Date().setDate(new Date().getDate() - 3)
    ).toLocaleDateString(),
    Total: 3908,
  },
  {
    name: new Date(
      new Date().setDate(new Date().getDate() - 2)
    ).toLocaleDateString(),
    Total: 4800,
  },
  {
    name: "Yesterday",
    Total: 3800,
  },
  {
    name: "Today",
    Total: 6300,
  },
];
const SalesChart = () => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip wrapperClassName="bg-primary-foreground" />
          <Legend />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
