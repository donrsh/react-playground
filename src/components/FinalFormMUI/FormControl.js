import * as React from 'react'

import { FormControl } from '@material-ui/core'

export default class extends React.Component {
  static displayName = 'C(FinalFormMUI/FormControl)'

  get error () {
    const { type } = this.props.fieldConfig

    const renderProps = type === 'array' ? 
      this.props.fieldArrayRenderProps :
      this.props.fieldRenderProps  

    const { error, touched, submitError, dirtySinceLastSubmit } = renderProps.meta
    return Boolean(error && touched) || (
      Boolean(submitError) && !dirtySinceLastSubmit
    )
  }

  render() {
    const {
      children
    } = this.props

    return (
      <FormControl
        error={this.error}
        children={children}
      />
    )
  }
}