import React from 'react';
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/a-propos" exact component={About} >
                    <About />
                </Route>
                <Route path="/" exact  component={Home}>
                    <Home />
                </Route>
                <Route component={NotFound}>
                    <NotFound />
                </Route>

            </Switch>
        </Router>               
    );
};

export default App;