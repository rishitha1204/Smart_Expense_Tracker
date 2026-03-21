import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const MonthlyBarChart = ({ expenses }) => {

  const monthlyData = {};

  expenses
    .filter((item) => item.type.toLowerCase() === "expense")   // ✅ Only Expense
    .forEach((item) => {

      const month = new Date(item.date).toLocaleString("default", {
        month: "short"
      });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          total: 0
        };
      }

      monthlyData[month].total += Number(item.amount);

    });

  const chartData = Object.values(monthlyData);

  return (

    <div className="chart-container">

      <h3>Monthly Expenses</h3>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="total" fill="#6366f1" animationDuration={1500} animationEasing="ease-out"/>
        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default MonthlyBarChart;