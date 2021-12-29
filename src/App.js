import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import firebase from "./utils/firebase";
import Header from "./Heaher";
import Signin from "./pages/signin";
import Reports from "./pages/Reports";
import NewReport from "./pages/NewReport";
import Report from "./pages/Report";
import Topics from "./components/Topics";
import MyMenu from "./pages/MyMenu";
import MyInfo from "./pages/MyInfo";
import MyData from "./pages/MyData";
import MyHistory from "./pages/MyHistory";
import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AddData from "./pages/AddData";

function App() {
  //  監聽使用者
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {};
  }, []);
  //  監聽使用者
  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route path="/posts">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Topics />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Switch>
                    <Route path="/posts" exact>
                      {user ? <Reports /> : <Redirect to="/signin" />}
                    </Route>
                    <Route path="/posts/:postId" exact>
                      {user ? <Report /> : <Redirect to="/signin" />}
                    </Route>
                  </Switch>
                </Grid.Column>
                <Grid.Column width={3}>訓練目標</Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Route>

        <Route path="/my">
          {user ? (
            <Container>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <MyMenu />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Switch>
                      <Route path="/my/info" exact>
                        <MyInfo user={user} />
                      </Route>
                      <Route path="/my/data" exact>
                        <MyData />
                      </Route>
                      <Route path="/my/history" exact>
                        <MyHistory />
                      </Route>
                    </Switch>
                  </Grid.Column>
                  {/* <Grid.Column width={3}>訓練目標</Grid.Column> */}
                </Grid.Row>
              </Grid>
            </Container>
          ) : (
            <Redirect to="/my/history" />
          )}
          {/* 若非登入導到首頁 */}
        </Route>

        <Route path="/signin" exact>
          {user ? <Redirect to="/posts" /> : <Signin />}
        </Route>
        <Route path="/new-DBdata" exact>
          {user ? <AddData /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/posts/:postId" exact>
          {" "}
          {/* : 意思動態ip */}
          <Report />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
