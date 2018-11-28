/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form } from 'react-final-form'
import * as R from 'ramda'

import {
  Button, Collapse, CircularProgress
} from '@material-ui/core'

import {
  ArrowDropDown, ArrowDropUp
} from '@material-ui/icons'

import { fromRenderProps } from 'HOCs/fromRenderProps'
import { withTogglers } from 'HOCs/withTogglers'

import {
  renderFFMUIComponent,
  createFFFormSubComponents
} from '../../common/renderFFMUIComponent'

import {
  ParseAndFormat,
  userNameField,
  phoneField,
  cardField
} from './formConfig'

class ExampleComponent extends React.Component {
  FFFormSubComponents = createFFFormSubComponents(ParseAndFormat)

  componentDidMount() {
    const v = `update${ParseAndFormat.name}`

    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x =>
          this.props[ParseAndFormat.name].form.change(...x)
        )
      )(nextValues)

    }

    console.info(`🔮 You can access change form function via global variable: ${v}`)

    this.releaseFormVariable = () => {
      window[v] = undefined
    }
  }

  componentWillUnmount() {
    this.releaseFormVariable()
  }

  render() {
    // console.group('Final Form - ParseAndFormat')
    // console.log(this.props)
    // console.groupEnd()
    const { collapseToggler } = this.props
    const { SubmitErrorHelperText } = this.FFFormSubComponents

    const {
      handleSubmit, submitting, pristine, form,
      values, validating
    } = this.props[ParseAndFormat.name]

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 Parse and Format
          {
            collapseToggler.isOpen ?
              <ArrowDropUp /> :
              <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/10rzowm323">
            See source
          </a>

          <form onSubmit={handleSubmit}>
            {renderFFMUIComponent(userNameField)}
            {renderFFMUIComponent(phoneField)}
            {renderFFMUIComponent(cardField)}

            <div style={{ height: 50 }}>
              <SubmitErrorHelperText />
            </div>

            <div className="buttons">
              <Button
                type="submit"
                disabled={submitting || pristine || validating}
                color="primary"
                variant="contained"
                style={{ marginRight: 8 }}
              >
                {
                  submitting && (
                    <CircularProgress size={16}
                      style={{ marginRight: 8 }}
                    />
                  )
                }
                Submit
            </Button>
              <Button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine || validating}
                variant="contained"
              >
                Reset
            </Button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        </Collapse>
      </Styles>
    )
  }
}

const enhancer = compose(
  withTogglers(
    ({ defaultOpen = false }) => [
      { name: 'collapse', defaultOpen }
    ]
  ),
  fromRenderProps(
    ({ children }) => (
      <Form
        {...ParseAndFormat}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [ParseAndFormat.name]: formRenderProps
    }),
  )
)

export default enhancer(ExampleComponent)