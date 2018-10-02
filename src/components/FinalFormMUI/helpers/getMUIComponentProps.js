import * as R from 'ramda'

export const getMUIComponentProps = R.curry(
  (componentName, props) =>
    R.pathOr({}, ['MUIProps', componentName], props)
)

