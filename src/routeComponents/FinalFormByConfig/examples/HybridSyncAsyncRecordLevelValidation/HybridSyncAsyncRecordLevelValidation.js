/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form } from 'react-final-form'
import * as R from 'ramda'

import {
  Button, Collapse
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
  HybridSyncAsyncRecordLevelValidation,
  userNameField,
  passwordField,
  confirmField
} from './formConfig'

class ExampleComponent extends React.Component {
  FFFormSubComponents = createFFFormSubComponents(HybridSyncAsyncRecordLevelValidation)

  componentDidMount () {
    const v = `update${HybridSyncAsyncRecordLevelValidation.name}`
    
    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x => 
          this.props[HybridSyncAsyncRecordLevelValidation.name].form.change(...x)
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
    const { ValidateIndicator } = this.FFFormSubComponents
    const { collapseToggler } = this.props

    const {
      handleSubmit, submitting, pristine, form,
      values, validating
    } = this.props[HybridSyncAsyncRecordLevelValidation.name]

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 Hybrid Synchronous/Asynchronous Record-Level Validation
          { 
            collapseToggler.isOpen ?
            <ArrowDropUp /> :
            <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/kl9n295n5">
            See source
          </a>

          <div style={{ textAlign: 'center' }}>
            Usernames John, Paul, George or Ringo will fail async validation.
          </div>

          <form onSubmit={handleSubmit}>
            {renderFFMUIComponent(userNameField)}
            {renderFFMUIComponent(passwordField)}
            {renderFFMUIComponent(confirmField)}

            <div className="validating">
              <ValidateIndicator />
            </div>

            <div className="buttons">
              <Button
                type="submit"
                disabled={submitting || pristine || validating}
                color="primary"
                variant="contained"
                style={{ marginRight: 8 }}
              >
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
        {...HybridSyncAsyncRecordLevelValidation}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [HybridSyncAsyncRecordLevelValidation.name]: formRenderProps
    }),
  )
)

export default enhancer(ExampleComponent)