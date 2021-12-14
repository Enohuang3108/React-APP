import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Heaher';
import Signin from './pages/signin';
function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact>Home</Route>
                <Route path="/signin" exact><Signin /></Route>

            </Switch>
        </BrowserRouter>

    );
}

export default App;