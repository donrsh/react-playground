import * as React from 'react'
import { withProps, compose, mapProps } from "recompose"
import * as R from "ramda"
import shortid from "shortid"

export const withTogglers = (...togglerConfigsOrThunk) => {
  const tmpTogglerConfigsPropName = shortid.generate()

  const HOCs = [
    withProps(props => ({
      [tmpTogglerConfigsPropName]: 
        typeof togglerConfigsOrThunk[0] === 'function' ? 
        togglerConfigsOrThunk[0](props) : 
        togglerConfigsOrThunk
    })),

    (component) => class extends React.Component {
      get togglerConfigs () {
        return this.props[tmpTogglerConfigsPropName]
      }

      constructor (...args) {
        super(...args)
        let togglerStates = {}

        R.applyTo(this.togglerConfigs)(
          R.forEach(togglerConfig => {
            let toggleName = typeof togglerConfig === "string" ?
              togglerConfig :
              togglerConfig.name

            if (togglerStates[toggleName]) {
              throw new Error(`It seems there are duplicated \`toggleName\`: ${toggleName}. Check the configs of withTogglers.`)
            }
            togglerStates[toggleName] = {}

            let defaultOpen = true
            if (typeof togglerConfig === "object") {
              defaultOpen = togglerConfig.defaultOpen
            }
            togglerStates[toggleName].open = defaultOpen

            let defaultSubState = undefined
            if (typeof togglerConfig === "object") {
              defaultSubState = togglerConfig.defaultSubState
            }
            togglerStates[toggleName].subState = defaultSubState
          })
        )

        this.state = { togglerStates }
      }

      getTogglerProps = (togglerName) => ({
        isOpen: R.path([togglerName, 'open'], this.state.togglerStates),
        subState: R.path([togglerName, 'subState'], this.state.togglerStates),
        
        open: (subState) => this.setState(R.evolve({
          togglerStates: { [togglerName]: {
            open: R.T,
            subState: R.always(subState)
          }}
        })),

        close: (subState) => this.setState(R.evolve({
          togglerStates: {
            [togglerName]: {
              open: R.F,
              subState: R.always(subState)
            }
          }
        })),
        
        toggle: (subState) => this.setState(R.evolve({
          togglerStates: {
            [togglerName]: {
              open: R.not,
              subState: R.always(subState)
            }
          }
        })),

        setSubState: (subState) => this.setState(R.evolve({
          togglerStates: {
            [togglerName]: {
              subState: R.always(subState)
            }
          }
        })),
      })

      get togglersProps() {
        return R.pipe(
          Object.keys,
          R.map(togglerName => ([
            `${togglerName}Toggler`,
            this.getTogglerProps(togglerName)
          ])),
          R.fromPairs
        )(this.state.togglerStates)
      }

      render () {
        return React.createElement(component, 
          { ...this.props, ...this.togglersProps }
        )
      }
    },
    
    mapProps(R.omit([tmpTogglerConfigsPropName]))
  ]

  return compose(...HOCs)
}
