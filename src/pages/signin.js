import React from "react";
import { Menu, Form, Container, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; /* 導頁 */
import "firebase/compat/auth";
import firebase from "../utils/firebase";

function Signin() {
  const history = useHistory();
  const [activeItem, setActiveItem] = React.useState("register");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMassage, seterrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  function onSubmit() {
    setIsLoading(true);
    if (activeItem === "register") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
          setIsLoading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              seterrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              seterrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              seterrorMessage("密碼強度不足");
              break;
            default:
          }
          setIsLoading(false);
        });
    } else if (activeItem === "signin") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
          setIsLoading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              seterrorMessage("信箱不存在");
              break;
            case "auth/invalid-email":
              seterrorMessage("信箱格式不正確");
              break;
            case "auth/wrong-password":
              seterrorMessage("密碼錯誤");
              break;
            default:
          }
          setIsLoading(false);
        });
    }
  }

  return (
    <Container>
      <Menu widths="2">
        <Menu.Item
          active={activeItem === "register"}
          onClick={() => {
            seterrorMessage("");
            setActiveItem("register");
          }}
        >
          註冊
        </Menu.Item>
        <Menu.Item
          active={activeItem === "signin"}
          onClick={() => {
            seterrorMessage("");
            setActiveItem("signin");
          }}
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
        {errorMassage && <Message negative>{errorMassage}</Message>}
        <Form.Button loading={isLoading}>
          {activeItem === "register" && "註冊"}
          {activeItem === "signin" && "登入"}
        </Form.Button>
      </Form>
    </Container>
  );
}
export default Signin;
