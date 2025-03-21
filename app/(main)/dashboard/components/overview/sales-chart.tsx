"use client";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
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
    name: "7 Hari Lalu",
    Total: 2400,
  },
  {
    name: "6 Hari Lalu",
    Total: 1398,
  },
  {
    name: "5 Hari Lalu",
    Total: 5800,
  },
  {
    name: "4 Hari Lalu",
    Total: 3908,
  },
  {
    name: "3 Hari Lalu",
    Total: 4800,
  },
  {
    name: "2 Hari Lalu",
    Total: 3800,
  },
  {
    name: "1 Hari Lalu",
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
