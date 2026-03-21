import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer

} from "recharts";

import "./charts.css";

const IncomeExpenseChart = ({expenses})=>{

  let income=0
  let expense=0

  expenses.forEach(item => {

  if(item.type.toLowerCase() === "income"){
    income += Number(item.amount)
  } else if(item.type.toLowerCase() === "expense"){
    expense += Number(item.amount)
  }

})
const remaining = income - expense;
  const data=[

    { name: "Remaining", value: remaining > 0 ? remaining : 0 },
    {name:"Expense",value:expense}

  ]

  const COLORS=["#22c55e","#ef4444"]

  return(

    <div className="chart-container">

      <h3>Expenses vs Savings</h3>

      <ResponsiveContainer width="100%" height={250}>

        <PieChart>

          <Pie

          data={data}
          dataKey="value"
          outerRadius={80}

          >

            {data.map((entry,index)=>(
              <Cell key={index} fill={COLORS[index]}/>
            ))}

          </Pie>

          <Tooltip/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  )

}

export default IncomeExpenseChart