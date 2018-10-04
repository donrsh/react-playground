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
  // renderFFMUIHelperText
} from '../../common/renderFFMUIComponent'

import {
  SubmissionErrors,
  userNameField,
  passwordField,
} from './formConfig'

class ExampleComponent extends React.Component {
  FFFormSubComponents = createFFFormSubComponents(SubmissionErrors)

  componentDidMount () {
    const v = `update${SubmissionErrors.name}`
    
    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x => 
          this.props[SubmissionErrors.name].form.change(...x)
        )
      )(nextValues)
      
    }

    console.info(`🔮 You can access change form function via global variable: ${v}`)

    this.releaseFormVariable = () => {
      window[v] = undefined  
    }
  }

  componentWillUnmount () {
    this.releaseFormVariable()
  }
  
  render() {
    // console.group('Final Form - SubmissionErrors')
    // console.log(this.props)
    // console.groupEnd()
    const { collapseToggler } = this.props
    const { SubmitErrorHelperText } = this.FFFormSubComponents

    const {
      handleSubmit, submitting, pristine, form,
      values, validating
    } = this.props[SubmissionErrors.name]

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 Submission Errors
          { 
            collapseToggler.isOpen ?
            <ArrowDropUp /> :
            <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/9y9om95lyp">
            See source
          </a>

          <div style={{ textAlign: 'center' }}>
            Only successful credentials are <code>erikras</code> and{" "}
            <code>finalformrocks</code>.
          </div>

          <form onSubmit={handleSubmit}>
            {renderFFMUIComponent(userNameField)}
            {renderFFMUIComponent(passwordField)}

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
    { name: 'collapse', defaultOpen: true }
  ),
  fromRenderProps(
    ({ children }) => (
      <Form 
        {...SubmissionErrors}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [SubmissionErrors.name]: formRenderProps
    }),
  )
)

export default enhancer(ExampleComponent)