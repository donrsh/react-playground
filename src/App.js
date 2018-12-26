import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import * as R from 'ramda'
import './App.css';

import 'normalize.css'

import { Tabs, Tab } from '@material-ui/core'

import DownShiftExamples from './routeComponents/DownShiftExamples'
import DnDExamples from './routeComponents/DnDExamples'
import FinalFormByConfig from './routeComponents/FinalFormByConfig'
import HookExamples from './routeComponents/HookExamples'
import MUIReactTables from './routeComponents/MUIReactTables'

const paths = {
  downshiftExamples: {
    name: 'downshiftExamples',
    displayText: 'downshift examples',
    path: '/downshift-examples'
  },
  DnDExamples: {
    name: 'DnDExamples',
    displayText: 'DnD examples',
    path: '/dnd-examples'
  },
  FinalFormByConfigs: {
    name: 'FinalFormByConfigs',
    displayText: 'Final Form By Configs',
    path: '/final-form-by-configs'
  },
  HookExamples: {
    name: 'hookExamples',
    displayText: 'react hook examples',
    path: '/react-hook-examples'
  },
  MUIReactTable: {
    name: 'MUIReactTables',
    displayText: 'React tables in Material UI',
    path: '/react-tables-in-material-ui'
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

          <Route path={paths.DnDExamples.path}
            component={DnDExamples}
          />

          <Route path={paths.FinalFormByConfigs.path}
            component={FinalFormByConfig}
          />

          <Route path={paths.HookExamples.path}
            component={HookExamples}
          />

          <Route path={paths.MUIReactTable.path}
            component={MUIReactTables}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
