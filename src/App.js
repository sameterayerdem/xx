import React, { Component } from 'react';

import AreaAndVolume from "./AreaAndVolume";
import { HashRouter, Switch, Route } from "react-router-dom";
import ChartPage from './ChartPage';

class App extends Component {
    render() {
        return (
          <div className="App">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={ChartPage}/>
              </Switch>
          </HashRouter>
          </div>
        );
      }
}

export default App;
