import { withState, withHandlers, withProps, compose, mapProps } from "recompose"
import * as R from "ramda"
import shortid from "shortid"

export const withTogglers = (...togglerConfigs) => {
  const HOCs = R.pipe(
    R.map(togglerConfig => {
      let toggleName =
        typeof togglerConfig === "string" ? togglerConfig : togglerConfig.name

      let defaultOpen = true
      if (typeof togglerConfig === "object") {
        defaultOpen = togglerConfig.defaultOpen
      }

      let defaultSubState = undefined
      if (typeof togglerConfig === "object") {
        defaultSubState = togglerConfig.defaultSubState
      }

      const tmpPropNames = R.times(shortid.generate, 5)
      const [
        tmpTogglerPropName,
        tmpTogglerSetterPropName,
        tmpOpenTogglerPropName,
        tmpCloseTogglerPropName,
        tmpToggleTogglerPropName
      ] = tmpPropNames

      const togglePropName = `${toggleName}Toggler`

      return [
        withState(
          tmpTogglerPropName,
          tmpTogglerSetterPropName,
          { open: defaultOpen, subState: defaultSubState }
        ),

        withHandlers({
          [tmpOpenTogglerPropName]: ({
            [tmpTogglerSetterPropName]: setToggler
          }) => (subState) => {
            setToggler({
              open: true,
              subState
            })
          },

          [tmpCloseTogglerPropName]: ({
            [tmpTogglerSetterPropName]: setToggler
          }) => (subState) => {
            setToggler({
              open: false,
              subState
            })
          },

          [tmpToggleTogglerPropName]: ({
            [tmpTogglerSetterPropName]: setToggler
          }) => (subState) => {
            setToggler(R.evolve({
              open: R.not,
              subState: R.always(subState)
            }))
          }
        }),

        withProps(props => {
          return R.pipe(
            R.assoc(
              togglePropName,
              {
                isOpen: props[tmpTogglerPropName].open,
                subState: props[tmpTogglerPropName].subState,
                open: props[tmpOpenTogglerPropName],
                close: props[tmpCloseTogglerPropName],
                toggle: props[tmpToggleTogglerPropName],
                set: props[tmpTogglerSetterPropName]
              }
            )
          )(props)
        }),

        mapProps(R.omit(tmpPropNames))
      ]
    }),
    R.flatten
  )(togglerConfigs)

  return compose(...HOCs)
}
