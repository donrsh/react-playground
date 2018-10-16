/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import * as R from 'ramda'

import {
  Grid, Collapse,
} from '@material-ui/core'

import {
  ArrowDropDown, ArrowDropUp
} from '@material-ui/icons'

import { withTogglers } from 'HOCs/withTogglers'

import Wizard from './Wizard'

import { 
  renderFFMUIComponent,
  renderFFMUIHelperText,
  renderFFMUIFormLabel
} from '../../common/renderFFMUIComponent'

import {
  WizardForm,
  firstNameField,
  lastNameField,
  emailField,
  employedField,
  favoriteColorField,
  toppingsField,
  stoogeField,
  notesField
} from './formConfig'

class ExampleComponent extends React.Component {
  renderFieldInGrid = (fieldConfig) => (
    <Grid container>
      <Grid item xs={3}>
        {renderFFMUIFormLabel(fieldConfig)}
      </Grid>
      <Grid item xs={9}>
        {renderFFMUIComponent(fieldConfig)}
      </Grid>
    </Grid>
  )

  componentDidMount () {
    const v = `update${WizardForm.name}`
    
    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x => 
          this.props[WizardForm.name].form.change(...x)
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
    // console.group('Final Form - WizardForm')
    // console.log(this.props)
    // console.groupEnd()
    const { renderFieldInGrid } = this
    const { collapseToggler } = this.props

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 React Final Form - Wizard Form
          { 
            collapseToggler.isOpen ?
            <ArrowDropUp /> :
            <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/km2n35kq3v">
            See source
          </a>
          <p>
            Notice the mixture of field-level and record-level (or <em>page-level</em>{' '}
            in this case) validation.
          </p>


          <Wizard
            initialValues={{ 
              toppings: [],
              employed: true, stooge: 'larry' 
            }}
            onSubmit={WizardForm.onSubmit}
          >
            <Wizard.Page
              // page = 0
            >
              {renderFieldInGrid(firstNameField)}
              {renderFieldInGrid(lastNameField)}
            </Wizard.Page>

            <Wizard.Page
              // page = 1
              validate={values => {
                const errors = {}
                if (!values.email) {
                  errors.email = 'Required'
                }
                if (!values.favoriteColor) {
                  errors.favoriteColor = 'Required'
                }
                return errors
              }}
            >
              {renderFieldInGrid(emailField)}
              {renderFieldInGrid(favoriteColorField)}
            </Wizard.Page>
            
            <Wizard.Page
              // page = 2
              validate={values => {
                const errors = {}
                if (!values.toppings) {
                  errors.toppings = 'Required'
                } else if (values.toppings.length < 2) {
                  errors.toppings = 'Choose more'
                }
                return errors
              }}
            >
              {renderFFMUIComponent(employedField)}
              {renderFFMUIComponent(toppingsField)}
            </Wizard.Page>
            
            <Wizard.Page
              // page = 3
              validate={values => {
                const errors = {}
                if (!values.notes) {
                  errors.notes = 'Required'
                }
                return errors
              }}
            >
              <Grid container style={{ marginBottom: 20 }}>
                <Grid item xs={3}>
                  {renderFFMUIFormLabel(stoogeField, {
                    style: { position: 'relative', top: 16 }
                  })}
                </Grid>

                <Grid item xs={9}>
                  <Grid container>
                    {
                      R.pipe(
                        R.values,
                        R.map(field => (
                          <div style={{ display: 'inline-flex' }}
                            key={field.value}
                          >
                            {renderFFMUIComponent(field)}
                          </div>
                        ))
                      )(stoogeField.subFields)
                    }
                  </Grid>
                  {renderFFMUIHelperText(stoogeField)}
                </Grid>
              </Grid>

              {renderFieldInGrid(notesField)}
            </Wizard.Page>
          </Wizard>
        </Collapse>
      </Styles>
    )
  }
}

const enhancer = compose(
  withTogglers(
    { name: 'collapse', defaultOpen: true }
  )
)

export default enhancer(ExampleComponent)