import React from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { List } from "semantic-ui-react";

function MyMenu() {
  const location = useLocation();
  const menuItems = [
    {
      name: "個人資料",
      path: "/my/info",
    },
    {
      name: "統計數據",
      path: "/my/data",
    },
    {
      name: "訓練歷程",
      path: "/my/history",
    },
  ];

  // const trainings = [
  //   {
  //     name: "ISOKINETIC",
  //     path: "/my/history?training=ISOKINETIC",
  //   },
  //   {
  //     name: "ISOTONIC",
  //     path: "/my/history?training=ISOTONIC",
  //   },
  //   {
  //     name: "ISOMETRIC",
  //     path: "/my/history?training=ISOMETRIC",
  //   },
  // ];

  return (
    <>
      <List animated selection>
        {menuItems.map((menuItem) => {
          return (
            <List.Item
              as={Link}
              to={menuItem.path}
              key={menuItem.name}
              active={menuItem.path === location.pathname}
            >
              {menuItem.name}
            </List.Item>
          );
        })}
      </List>
    </>
  );
}

export default MyMenu;
