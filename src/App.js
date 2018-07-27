import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import * as R from 'ramda'
import './App.css';

import 'normalize.css'

import { Tabs, Tab } from '@material-ui/core'

import DownShiftExamples from './routeComponents/DownShiftExamples'

const paths = {
  downshiftExamples: {
    name: 'downshiftExamples',
    displayText: 'downshift examples',
    path: '/downshift-examples'
  }
}

class App extends Component {
  Sub = {
    Tabs: ({
      match, history
    }) => {
      const { pathname } = history.location

      return (
        <div>
          <Tabs
            value={
              R.ifElse(
                R.equals('/'),
                R.always(null),
                x => {
                  return R.find(R.where({
                    path: R.contains(x)
                  }))(Object.values(paths))
                }
              )(pathname)
            }
            onChange={(e, value) => {
              history.push(value.path)
            }}
          >
            {
              Object.values(paths).map(x => (
                <Tab
                  key={x.name}
                  label={x.displayText}
                  value={x}
                />
              ))
            }
          </Tabs>
        </div>
      )
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route 
            path='/'
            component={this.Sub.Tabs}
          />

          <Route path={paths.downshiftExamples.path}
            component={DownShiftExamples}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
