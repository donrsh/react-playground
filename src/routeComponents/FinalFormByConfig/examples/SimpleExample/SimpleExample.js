/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form } from 'react-final-form'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import {
  InputAdornment, FormLabel, Grid, Button
} from '@material-ui/core'

import { fromRenderProps } from 'HOCs/fromRenderProps'

import {
  pipeValidatorsAndGetHead,
  isRequired,
  isRequiredForMultipleSelect,
  isMoreThanNChars
} from '../../helpers/fieldValidators'

import { 
  renderFFMUIComponent,
  renderFFHelperText
} from '../../common/renderFFMUIComponent'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const formConfig = {
  name: 'SimpleExample',

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },

  initialValues: { 
    stooge: 'moe',
    employed: false,
    // favoriteColor: '#00ff00',
    toppings: []
  },

  nonAPI: 123
}

const fieldMUIProps = {
  fullWidth: true,
  InputLabelProps: { shrink: true },
  style: {
    marginBottom: 20
  },
}

const firstNameField = {
  form: formConfig.name,
  name: 'firstName',
  type: 'text',
  label: 'First Name',
  // disabled: true,
  validate: pipeValidatorsAndGetHead(
    isRequired,
  ),
  MUIProps: {
    TextField: {
      ...fieldMUIProps,
    },
  }
}

const lastNameField = {
  form: formConfig.name,
  name: 'lastName',
  type: 'text',
  label: 'Last Name',
  placeholder: 'Last Name',
  MUIProps: {
    TextField: fieldMUIProps
  }
}

const passwordField = {
  form: formConfig.name,
  name: 'pasoword',
  validate: pipeValidatorsAndGetHead(
    isRequired,
    isMoreThanNChars(8)
  ),
  minLength: 8,
  type: 'password',
  label: 'Password',
  MUIProps: {
    TextField: {
      placeholder: 'password',
      ...fieldMUIProps
    },
  }
}

const employedField = {
  form: formConfig.name,
  name: 'employed',
  type: 'checkbox',
  label: 'Employed',
  // disabled: true,
  // debug: true,
  MUIProps: {
    FormControlLabel: {
      labelPlacement: 'start'
    }
  }
}

const favoriteColorField = {
  form: formConfig.name,
  name: 'favoriteColor',
  type: 'select',
  label: 'Favorite Color',
  validate: pipeValidatorsAndGetHead(
    isRequired,
  ),
  // disabled: true,
  // debug: true,
  options: [
    { value: "#ff0000", display: "❤️ Red" },
    { value: "#00ff00", display: "💚 Green" },
    { value: "#0000ff", display: "💙 Blue" },
  ],
  getOptionProps: ({ value, display }) => ({
    key: value,
    value,
    children: display
  }),
  MUIProps: {
    TextField: {
      ...fieldMUIProps,
      select: true,
      SelectProps: {
        native: false
      },
      InputProps: {
        startAdornment: (
          <InputAdornment variant="filled" position="start">
            Color
          </InputAdornment>
        ),
      }
    }
  }
}

const toppingsField = {
  form: formConfig.name,
  name: 'toppings',
  type: 'select',
  label: 'Toppings',
  validate: pipeValidatorsAndGetHead(
    isRequiredForMultipleSelect,
  ),
  disabled: true,
  debug: true,
  options: [
    { value: "chicken", display: "🐓 Chicken" },
    { value: "ham", display: "🐷 Ham" },
    { value: "mushrooms", display: "🍄 Mushrooms" },
    { value: "cheese", display: "🧀 Cheese" },
    { value: "tuna", display: "🐟 Tuna" },
    { value: "pineapple", display: "🍍 Pineapple" }
  ],
  getOptionProps: ({ value, display }) => ({
    key: value,
    value,
    children: display
  }),
  MUIProps: {
    TextField: {
      ...fieldMUIProps,
      select: true,
      SelectProps: {
        multiple: true,
        // native: true
      },
    }
  }
}

const saucesField = {
  form: formConfig.name,
  name: 'sauces',
  type: 'selectBycheckbox',
  label: 'Sauces',
  validate: pipeValidatorsAndGetHead(
    isRequiredForMultipleSelect,
    (value, allValues, props, name) => {
      if (RA.isArray(value) && value.length > 2) {
        return {
          msg: `Neh, I don't think more than 2 sauces would be a good idea...`
        }
      }
    }
  ),
  // debug: true,
  subFields: {
    ketchup: {
      form: formConfig.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Ketchup',
      value: 'ketchup',
      MUIProps: {},
      // disabled: true,
      // debug: true,
    },
    mustard: {
      form: formConfig.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Mustard',
      value: 'mustard',
      MUIProps: {}
    },
    mayonnaise: {
      form: formConfig.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Mayonnaise',
      value: 'mayonnaise',
      MUIProps: {}
    },
    guacamole: {
      form: formConfig.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Guacamole',
      value: 'guacamole',
      MUIProps: {}
    }
  }
}

const stoogeField = {
  form: formConfig.name,
  name: 'stooge',
  type: 'selectByRadio',
  label: 'Best Stooge',
  // debug: true,
  validate: pipeValidatorsAndGetHead(
    (value, allValues, props, name) => {
      if (value === 'moe') {
        return {
          msg: `Moe? Are you sure?`
        }
      }
    }
  ),
  subFields: {
    larry: {
      form: formConfig.name,
      name: 'stooge',
      type: 'radio',
      label: 'Larry',
      value: 'larry',
      MUIProps: {}
    },
    moe: {
      form: formConfig.name,
      name: 'stooge',
      type: 'radio',
      label: 'Moe',
      value: 'moe',
      MUIProps: {},
    },
    curly: {
      form: formConfig.name,
      name: 'stooge',
      type: 'radio',
      label: 'Curly',
      value: 'curly',
      MUIProps: {},
      // disabled: true,
      // debug: true,
    },
  }
}

const notesField = {
  form: formConfig.name,
  name: 'notes',
  type: 'text',
  label: 'Notes',
  disabled: true,
  debug: true,
  MUIProps: {
    TextField: {
      ...fieldMUIProps,
      multiline: true,
      rows: 2,
      placeholder: 'Write some things...',
    },
  }
}

const SimpleExample = (props) => {
  console.group('Final Form - SimpleExample')
  console.log(props)
  console.groupEnd()

  const { 
    handleSubmit, submitting, pristine, form,
    values
  } = props[formConfig.name]
  
  return (
    <Styles>
      <h1>🏁 React Final Form - Simple Example</h1>
      <a href="https://codesandbox.io/s/ww40y2m595">
        See source
      </a>

      <form onSubmit={handleSubmit}>
        {renderFFMUIComponent(firstNameField)}
        {renderFFMUIComponent(lastNameField)}
        {renderFFMUIComponent(passwordField)}
        {renderFFMUIComponent(employedField)}
        {renderFFMUIComponent(favoriteColorField)}
        {renderFFMUIComponent(toppingsField)}

        {/* sauces field */}
        <Grid container style={{ marginBottom: 20 }}>
          <Grid item xs={3}>
            <FormLabel
              style={{ position: 'relative', top: 16 }}
            >
              {saucesField.label}
            </FormLabel>
          </Grid>

          <Grid item xs={9}>
            {
              R.pipe(
                R.values,
                R.map(field => (
                  <div style={{ display: 'flex' }}
                    key={field.value}
                  >
                    {renderFFMUIComponent(field)}
                  </div>
                ))
              )(saucesField.subFields)
            }
            {renderFFHelperText(saucesField)}
          </Grid>
        </Grid>
  
        {/* stooge field */}
        <Grid container style={{ marginBottom: 20 }}>
          <Grid item xs={3}>
            <FormLabel
              style={{ position: 'relative', top: 16 }}
            >
              {stoogeField.label}
            </FormLabel>
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
            {renderFFHelperText(stoogeField)}
          </Grid>
        </Grid>
            
        
        {renderFFMUIComponent(notesField)}

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
    </Styles>
  )
}

const enhancer = compose(
  fromRenderProps(
    ({ children }) => (
      <Form 
        {...formConfig}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [formConfig.name]: formRenderProps
    }),
  )
)

export default enhancer(SimpleExample)