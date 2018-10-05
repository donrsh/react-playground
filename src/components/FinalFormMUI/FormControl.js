import * as React from 'react'
import { ARRAY_ERROR } from 'final-form'

import * as R from 'ramda'

import { FormControl } from '@material-ui/core'

export default class extends React.Component {
  static displayName = 'C(FinalFormMUI/FormControl)'

  get error () {
    const { type } = this.props.fieldConfig

    if (type !== 'array') {
      const { error, touched, submitError } = this.props.fieldRenderProps.meta
      return Boolean(error && touched) || Boolean(submitError)
    }

    if (type === 'array') {
      const { name } = this.props.fieldConfig
      const { formSpyRenderProps } = this.props

      if (Boolean(
        R.path(
          ['dirtyFields', name],
          formSpyRenderProps
        )
      )) {
        return Boolean(
          R.path(
            ['errors', name, ARRAY_ERROR],
            formSpyRenderProps
          ) ||
          R.path(
            ['submitErrors', name, ARRAY_ERROR],
            formSpyRenderProps
          )
        )
      }

      return false
    }
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