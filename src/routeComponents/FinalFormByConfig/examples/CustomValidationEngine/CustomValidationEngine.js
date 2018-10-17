/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form } from 'react-final-form'
import * as R from 'ramda'

import {
  Button, Collapse,
} from '@material-ui/core'

import {
  ArrowDropDown, ArrowDropUp
} from '@material-ui/icons'

import { fromRenderProps } from 'HOCs/fromRenderProps'
import { withTogglers } from 'HOCs/withTogglers'

import { 
  renderFFMUIComponent,
} from '../../common/renderFFMUIComponent'

import OnBlurValidation from './OnBlurValidation'

import {
  CustomValidationEngine,
  firstNameField,
  lastNameField,
  emailField
} from './formConfig'

const isBeatle = value =>
  ~['john', 'paul', 'george', 'ringo'].indexOf(value.toLowerCase())

class ExampleComponent extends React.Component {
  componentDidMount () {
    const v = `update${CustomValidationEngine.name}`
    
    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x => 
          this.props[CustomValidationEngine.name].form.change(...x)
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
    // console.group('Final Form - ExampleComponent')
    // console.log(this.props)
    // console.groupEnd()
    const { collapseToggler } = this.props

    const {
      handleSubmit, submitting, pristine, form,
      values
    } = this.props[CustomValidationEngine.name]

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 Custom Validation Engine
          { 
            collapseToggler.isOpen ?
            <ArrowDropUp /> :
            <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/kxxw4l0p9o">
            See source
          </a>
          <p>
            This example includes a special <code>OnBlurValidation</code> component
            that manages its own set of validation rules, completely apart from 🏁
            Final Form's validation engine. This allows the rules to be run only on
            blur, and maintains "validating" state for asynchronous validations. The
            function then injects the <code>hasErrors</code> state into a render
            function to render the rest of the form, thus allowing submission to be
            halted if errors are present.
          </p>
          <p>
            Any first name value of <code>John</code>, <code>Paul</code>,{' '}
            <code>George</code>, or <code>Ringo</code> will fail asynchronous
            validation.
          </p>

          <OnBlurValidation
            rules={{
              firstName: (value, setError) => {
                if (!value) {
                  // return synchronously
                  setError('Required')
                } else {
                  // return asynchronously
                  setTimeout(() => {
                    if (isBeatle(value)) {
                      setError('No Beatles')
                    } else {
                      setError(undefined)
                    }
                  }, 3000)
                }
              },
              lastName: (value, setError) =>
                setError(value ? undefined : 'Required')
            }}
            render={({ hasErrors, validating: fieldValidating }) => (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  if (!hasErrors && !fieldValidating) handleSubmit()
                }}
              >
                {renderFFMUIComponent(firstNameField)}
                {renderFFMUIComponent(lastNameField)}
                {renderFFMUIComponent(emailField)}

                <div className="buttons">
                  <Button
                    type="submit"
                    disabled={submitting || pristine || hasErrors || fieldValidating}
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 8 }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine || hasErrors || fieldValidating}
                    variant="contained"
                  >
                    Reset
                  </Button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          />
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
        {...CustomValidationEngine}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [CustomValidationEngine.name]: formRenderProps
    }),
  )
)

export default enhancer(ExampleComponent)