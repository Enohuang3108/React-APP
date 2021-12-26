import { PieChart, Pie, Tooltip, Scatter } from "recharts";
import { Header } from "semantic-ui-react";
/* const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
]; */
const data02 = [
  {
    name: "ROM訓練時長(min)：",
    value: 2400,
  },
  {
    name: "ISOKINETIC訓練時長(min)：",
    value: 4567,
  },
  {
    name: "ISOTONIC訓練時長(min)：",
    value: 1398,
  },
  {
    name: "ISOMETRIC訓練時長(min)：",
    value: 9800,
  },
];

const renderLineChart = (
  <>
    <Header>統計數據</Header>

    <PieChart width={1000} height={375}>
      {/* <Pie
        data={data01}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
      /> */}
      <Pie
        data={data02}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={120}
        fill="#82ca9d"
        label
      />

      <Tooltip />
    </PieChart>
  </>
);

function MyData() {
  return renderLineChart;
}

export default MyData;
