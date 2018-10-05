/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import * as R from 'ramda'

import {
  Button, Collapse, Grid, IconButton, CircularProgress
} from '@material-ui/core'

import {
  ArrowDropDown, ArrowDropUp, Close
} from '@material-ui/icons'

import { fromRenderProps } from 'HOCs/fromRenderProps'
import { withTogglers } from 'HOCs/withTogglers'

import { 
  renderFFMUIComponent,
  renderFFMUIFormLabel,
  // renderFFMUIFormLabel,
  renderFFArrayFieldMUIHelperText,
  renderFFArrayFieldMUIFormLabel
} from '../../common/renderFFMUIComponent'

import {
  ArrayFieldsForm,
  companyField,
  customersField
} from './formConfig'

class ExampleComponent extends React.Component {
  componentDidMount () {
    const v = `update${ArrayFieldsForm.name}`
    
    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x => 
          this.props[ArrayFieldsForm.name].form.change(...x)
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
    } = this.props[ArrayFieldsForm.name]

    const {
      mutators: { push, pop }
    } = form

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 Array Fields
          { 
            collapseToggler.isOpen ?
            <ArrowDropUp /> :
            <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/kx8qv67nk5">
            See source
          </a>

          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={3}>
                {renderFFMUIFormLabel(companyField)}
              </Grid>
              <Grid item xs={9}>
                {renderFFMUIComponent(companyField)}
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={3}>
                {renderFFArrayFieldMUIFormLabel(customersField)}
                {renderFFArrayFieldMUIHelperText(customersField)}
              </Grid>
              <Grid item xs={9} style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: 20 }}>
                  <Button variant="contained"
                    onClick={() => push(customersField.name, undefined)}
                    style={{ marginRight: 8 }}
                  >
                    Add a Customer
                        </Button>
                  <Button variant="contained"
                    onClick={() => pop(customersField.name)}
                  >
                    Remove last Customer
                  </Button>
                </div>

                <div>
                  <FieldArray
                    name={customersField.name}
                    validate={customersField.validate}
                    children={({ fields, meta }) => {
                      return (
                        fields.map((name, idx) => {
                          return (
                            <div key={name}>
                              {
                                renderFFMUIComponent(
                                  R.pipe(
                                    R.evolve({
                                      name: s => `${name}.${s}`
                                    }),
                                  )(customersField.subFields.firstName)
                                )
                              }
                              {
                                renderFFMUIComponent(
                                  R.pipe(
                                    R.evolve({
                                      name: s => `${name}.${s}`
                                    })
                                  )(customersField.subFields.lastName)
                                )
                              }
                              <IconButton
                                onClick={() => fields.remove(idx)}
                                children={<Close />}
                              />
                            </div>
                          )
                        })
                      )
                    }}
                  />
                </div>

              </Grid>
            </Grid>

            <div className="buttons">
              <Button
                type="submit"
                disabled={submitting || pristine}
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
    { name: 'collapse', defaultOpen: true }
  ),
  fromRenderProps(
    ({ children }) => (
      <Form 
        {...ArrayFieldsForm}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [ArrayFieldsForm.name]: formRenderProps
    }),
  )
)

export default enhancer(ExampleComponent)