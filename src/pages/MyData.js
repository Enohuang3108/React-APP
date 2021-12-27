import { PieChart, Pie, Tooltip, Scatter } from "recharts";
import { Divider, Header } from "semantic-ui-react";
import React from "react";

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
const panel = {
  width: "200px",
  height: "80px",
  boxShadow: "2px 2px 12px -1px rgba(0,0,0,0.3)",
  padding: "5px",
  boxSizing: "border-box",
  position: "absolute",
  backgroundColor: "#595959",
  top: "50%",
  transform: "translateX(0%) translateY(-50%)",
  borderRadius: "10px",
};
const dataStyleL = {
  color: "white",
  fontWeight: "bolder",
  fontSize: 20,
  lineHeight: 2,
  letterSpacing: 3,
  textAlign: "center",
};
const dataStyleM = {
  color: "white",
  fontWeight: "-moz-initial",
  lineHeight: 1.5,
  fontSize: 15,
  letterSpacing: 3,
  textAlign: "center",
};

function MyData() {
  const [currentDate, getCurrentDate] = React.useState(new Date());
  // let currentDate = new Date();

  return (
    <>
      <Header>訓練類型分布</Header>
      <PieChart width={700} height={300}>
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
          innerRadius={60}
          outerRadius={100}
          fill="#82ca9d"
          label
        />

        <Tooltip />
      </PieChart>
      <Divider variant="middle" />
      <Header size="medium">數據</Header>
      <div>
        &nbsp;
        <br />
        <br />
      </div>
      <div class="ui grid">
        <div class="four wide column">
          <div style={panel}>
            <div style={dataStyleL}>開始使用日期</div>
            <div style={dataStyleM}>{currentDate.toLocaleDateString()}</div>
          </div>
        </div>
        <div class="four wide column">
          <div>
            <div style={panel}>
              <div style={dataStyleL}>使用天數</div>
              <div style={dataStyleM}>{currentDate.toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        <div class="four wide column">
          <div style={panel}>
            <div style={dataStyleL}>使用天數</div>
            <div style={dataStyleM}>{currentDate.toLocaleDateString()}</div>
          </div>
        </div>
        <div class="four wide column">
          <div style={panel}>
            <div style={dataStyleL}>總使用時間</div>
            <div style={dataStyleM}>{currentDate.toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyData;
