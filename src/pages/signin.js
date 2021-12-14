import React from "react";
import { Menu, Form, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; /* 導頁 */
import "firebase/compat/auth";
import firebase from "../utils/firebase";

function Signin() {
  const history = useHistory();
  const [activeItem, setActiveItem] = React.useState("register");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function onSubmit() {
    if (activeItem === "register") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
        });
    } else if (activeItem === "signin") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
        });
    }
  }

  return (
    <Container>
      <Menu widths="2">
        <Menu.Item
          active={activeItem === "register"}
          onClick={() => setActiveItem("register")}
        >
          註冊
        </Menu.Item>
        <Menu.Item
          active={activeItem === "signin"}
          onClick={() => setActiveItem("signin")}
        >
          登入
        </Menu.Item>
      </Menu>
      <Form onSubmit={onSubmit}>
        {/* 按下按鈕執行onSubmit Function */}
        <Form.Input
          label="信箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="請輸入信箱"
        />
        <Form.Input
          label="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="請輸入密碼"
          type="password"
        />
        <Form.Button>
          {activeItem === "register" && "註冊"}
          {activeItem === "signin" && "登入"}
        </Form.Button>
      </Form>
    </Container>
  );
}
export default Signin;
