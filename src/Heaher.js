import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";
import firebase from "./utils/firebase";

function Header() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currenUser) => {
      setUser(currenUser); /* firebase User State */
    });
  }, []); /* 選染完後執行監聽 */
  return (
    <Menu>
      <Menu.Item as={Link} to="/">
        React APP
      </Menu.Item>
      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? (
          <>
            <Menu.Item as={Link} to="/new-report">
              新增報告
            </Menu.Item>
            <Menu.Item as={Link} to="/userInfo">
              個人資訊
            </Menu.Item>
            <Menu.Item onClick={() => firebase.auth().signOut()}>
              登出
            </Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/signin">
            註冊/登入
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}
export default Header;
