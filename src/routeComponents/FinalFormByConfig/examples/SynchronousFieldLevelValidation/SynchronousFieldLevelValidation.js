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

import {
  SynchronousFieldLevelValidation,
  firstNameField,
  lastNameField,
  ageField
} from './formConfig'

class SynchronousRecordLevelValidation extends React.Component {
  componentDidMount () {
    const v = `update${SynchronousFieldLevelValidation.name}`
    
    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x => 
          this.props[SynchronousFieldLevelValidation.name].form.change(...x)
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
    // console.group('Final Form - SynchronousRecordLevelValidation')
    // console.log(this.props)
    // console.groupEnd()
    const { collapseToggler } = this.props

    const {
      handleSubmit, submitting, pristine, form,
      values
    } = this.props[SynchronousFieldLevelValidation.name]

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 Synchronous Field-Level Validation
          { 
            collapseToggler.isOpen ?
            <ArrowDropUp /> :
            <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/2k054qp40">
            See source
          </a>

          <form onSubmit={handleSubmit}>
            {renderFFMUIComponent(firstNameField)}
            {renderFFMUIComponent(lastNameField)}
            {renderFFMUIComponent(ageField)}

            <div className="buttons">
              <Button
                type="submit"
                disabled={submitting || pristine}
                color="primary"
                variant="contained"
                style={{ marginRight: 8 }}
              >
                Submit
            </Button>
              <Button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
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
    { name: 'collapse', defaultOpen: false }
  ),
  fromRenderProps(
    ({ children }) => (
      <Form 
        {...SynchronousFieldLevelValidation}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [SynchronousFieldLevelValidation.name]: formRenderProps
    }),
  )
)

export default enhancer(SynchronousRecordLevelValidation)