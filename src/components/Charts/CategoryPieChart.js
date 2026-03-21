import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

const CategoryPieChart = ({ expenses }) => {

  const categoryData = {};

  expenses
    .filter((item) => item.type.toLowerCase() === "expense")   // ✅ Only Expense
    .forEach((item) => {

      if (!categoryData[item.category]) {
        categoryData[item.category] = 0;
      }

      categoryData[item.category] += Number(item.amount);

    });

  const chartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key]
  }));

  return (

    <div className="chart-container">

      <h3>Category Spending</h3>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
            isAnimationActive={true}
            animationDuration={1500}
            activeOuterRadius={110}
          >

            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default CategoryPieChart;