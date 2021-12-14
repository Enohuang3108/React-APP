import { BrowserRouter, Switch,Route } from 'react-router-dom';

import Header from './Heaher';

function App() {
    return (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/" exact>Home</Route>
            <Route path="/signin" exact>註冊登入</Route>
            
        </Switch>
    </BrowserRouter>
    
    );
}

export default App;