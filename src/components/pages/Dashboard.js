import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Paper, Box, Grid } from "@mui/material";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  ArcElement,
} from "chart.js";
import { getSaleData } from "../auth/core/api";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  ArcElement
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSaleData()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const generateChartData = () => {
    if (!data || !data.salesData || data.salesData.length === 0) return null;

    const productNames = data?.salesData?.map((item) => item.product);
    const monthLabels =
      data.salesData[1]?.sales.map((sale) => sale.month) || [];

    const monthWiseData = monthLabels?.map((month, index) => ({
      label: month,
      data: data.salesData.map((item) => item.sales[index]?.amount || 0),
    }));

    const totalSalesData = {
      labels: productNames,
      datasets: [
        {
          label: "Total Sales",
          data: data?.salesData?.map((item) =>
            item?.sales?.reduce((total, sale) => total + sale.amount, 0)
          ),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };

    const monthlySalesData = {
      labels: productNames,
      datasets: monthWiseData.map((data, index) => ({
        ...data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ][index % 6],
      })),
    };

    // Doughnut chart data
    const doughnutData = {
        labels: monthLabels,
        datasets: [
          {
            label: "Monthly Sales",
            data: monthWiseData.map((monthData) =>
              monthData.data.reduce((total, amount) => total + amount, 0)
            ),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ].slice(0, monthLabels.length), // Slice the colors array to match the number of months
          },
        ],
      };
      

    return {
      totalSalesData,
      monthlySalesData,
      doughnutData,
    };
  };

  const chartData = generateChartData();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <h3>Month-wise Sales</h3>
            <Box sx={{ width: "100%", height: "400px" }}>
              <Bar
                data={chartData.monthlySalesData}
                options={{ responsive: true }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <h3>Monthly Sales (Doughnut Chart)</h3>
            <Box sx={{ width: "100%", height: "400px" }}>
              <Doughnut
                data={chartData.doughnutData}
                options={{ responsive: true }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <h3>Total Sales</h3>
            <Box sx={{ width: "100%", height: "400px" }}>
              <Bar
                data={chartData.totalSalesData}
                options={{ responsive: true }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
