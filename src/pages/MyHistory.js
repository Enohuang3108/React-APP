import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Item, Header, Divider } from "semantic-ui-react";
import React from "react";
import firebase from "../utils/firebase";
import { useLocation } from "react-router-dom";
import { Waypoint } from "react-waypoint";
const data = [
  {
    name: "123",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 4000,
  },
];
// const [datas, setDatas] = React.useState([]);

function MyHistory() {
  const [DBdatas, setDBdatas] = React.useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("trainingData")
      .orderBy("startTime", "desc")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          return docSnapshot.data();
        });
        setDBdatas(data);
      });
  }, []);
  return (
    <>
      <Header>訓練歷程</Header>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
      <Divider variant="middle" />
      <Header size="medium">歷史訓練數據</Header>

      <Item.Group>
        <Header size="small">
          {DBdatas.map((trainingData) => {
            return (
              <Item>
                <Item.Content>
                  <Header>
                    {trainingData.startTime.toDate().toLocaleString()}
                  </Header>
                  <Item.Description style={{ color: "#808080" }}>
                    &emsp; 使用機器：{trainingData.snNumber}
                  </Item.Description>
                  <Item.Description style={{ color: "#808080" }}>
                    &emsp; 訓練類型：{trainingData.trainingType}
                  </Item.Description>
                  <Item.Description style={{ color: "#808080" }}>
                    &emsp; 使用時間：{trainingData.takesTimes}
                  </Item.Description>
                  <br />

                  <Divider variant="inset" component="li" />
                </Item.Content>
              </Item>
            );
          })}
        </Header>
      </Item.Group>
    </>
  );
}

export default MyHistory;
