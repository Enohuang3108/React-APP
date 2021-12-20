import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./Heaher";
import Signin from "./pages/signin";
import Reports from "./pages/Reports";
import NewReport from "./pages/NewReport";
import Report from "./pages/Report";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Reports />
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
