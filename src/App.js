import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import Header from "./Heaher";
import Signin from "./pages/signin";
import Reports from "./pages/Reports";
import NewReport from "./pages/NewReport";
import Report from "./pages/Report";
import Topics from "./components/Topics";
import MyMenu from "./pages/MyMenu";
import MyInfo from "./pages/MyInfo";
MyMenu;
function App() {
  return (
    <BrowserRouter>
      <Header />
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
                      <Reports />
                    </Route>
                    <Route path="/posts/:postId" exact>
                      <Report />
                    </Route>
                  </Switch>
                </Grid.Column>
                <Grid.Column width={3}>訓練目標</Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Route>

        <Route path="/my">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <MyMenu />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Switch>
                    <Route path="/my/info" exact>
                      <MyInfo />
                    </Route>
                    <Route path="/my/data" exact>
                      /my/data
                    </Route>
                    <Route path="/my/history" exact>
                      /my/history
                    </Route>
                  </Switch>
                </Grid.Column>
                <Grid.Column width={3}>訓練目標</Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Route>

        <Route path="/signin" exact>
          <Signin />
        </Route>
        <Route path="/new-report" exact>
          <NewReport />
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
