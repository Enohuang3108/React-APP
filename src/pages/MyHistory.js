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
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentTopic = urlSearchParams.get("topic");
  const lastPostSnapshotRef = React.useRef(); /* 取得目前最下面的快照 */
  /* 取出firestore資料 */
  const [datas, setDatas] = React.useState([]);
  React.useEffect(
    () => {
      firebase
        .firestore()
        .collection("trainingData")
        //.where("topic", "==", currentTopic) /* 篩選類別 */
        .orderBy("startTime", "desc") /* 依時間降冪排列(最新在前) */
        .limit(10)
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return {
              ...docSnapshot.data(),
              id,
            }; /* 解構return docSnapshot.data(); 將資料跟id合併 */
          });
          /* 抓最新文章的第二篇 */
          lastPostSnapshotRef.current =
            collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
          setDatas(data); /* 抓最新文章的第二篇 */
        });
    } /* [currentTopic] */
  );
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
        {datas.map((data) => {
          console.log(data.startTime);
          return (
            <Item /*key={data.id}  as={Link} to={`/posts/${post.id}`} */>
              <Item.Content>
                <Item.Header>{data.startTime}</Item.Header>
                <Item.Description>{data.trainingType}</Item.Description>

                <Divider variant="inset" component="li" />
                <div>
                  &nbsp;
                  <br />
                  <br />
                </div>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
      <Waypoint
        onEnter={() => {
          if (lastPostSnapshotRef.current) {
            firebase
              .firestore()
              .collection("trainingData")
              // .where("topic", "==", currentTopic)
              .orderBy("startTime", "desc")
              .startAfter(lastPostSnapshotRef.current)
              .limit(2)
              .get()
              .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((docSnapshot) => {
                  const id = docSnapshot.id;
                  return {
                    ...docSnapshot.data(),
                    id,
                  }; /* 解構return docSnapshot.data(); 將資料跟id合併 */
                });
                lastPostSnapshotRef.current =
                  collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                setPosts([...datas, ...data]);
              });
          }
        }}
      />
    </>
  );
}

export default MyHistory;
