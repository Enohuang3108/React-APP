import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./Heaher";
import Signin from "./pages/signin";
import Reports from "./pages/Reports";
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
