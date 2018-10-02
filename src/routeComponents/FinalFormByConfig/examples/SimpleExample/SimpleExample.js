/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form /* , Field */ } from 'react-final-form'
import * as R from 'ramda'

import {
  InputAdornment, FormLabel, Grid, Button
} from '@material-ui/core'

import { fromRenderProps } from 'HOCs/fromRenderProps'

import { renderFFMUIComponent } from '../../common/renderFFMUIComponent'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const formConfig = {
  name: 'simpleExample',

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },

  initialValues: { 
    stooge: 'larry', employed: false,
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
  placeholder: 'First Name',
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

const employedField = {
  form: formConfig.name,
  name: 'employed',
  type: 'checkbox',
  label: 'Employed',
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
  /* 
  options: [
    {
      label: 'Ketchup',
      value: 'ketchup',
      MUIProps: {}
    },
    {
      label: 'Mustard',
      value: 'mustard',
      MUIProps: {}
    },
    {
      label: 'Mayonnaise',
      value: 'mayonnaise',
      MUIProps: {}
    },
    {
      label: 'Guacamole',
      value: 'guacamole',
      MUIProps: {}
    }
  ],
  */
  subFields: {
    ketchup: {
      form: formConfig.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Ketchup',
      value: 'ketchup',
      MUIProps: {}
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
  /* 
  options: [
    {
      label: 'Ketchup',
      value: 'ketchup',
      MUIProps: {}
    },
    {
      label: 'Mustard',
      value: 'mustard',
      MUIProps: {}
    },
    {
      label: 'Mayonnaise',
      value: 'mayonnaise',
      MUIProps: {}
    },
    {
      label: 'Guacamole',
      value: 'guacamole',
      MUIProps: {}
    }
  ],
  */
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
      MUIProps: {}
    },
    curly: {
      form: formConfig.name,
      name: 'stooge',
      type: 'radio',
      label: 'Curly',
      value: 'curly',
      MUIProps: {}
    },
  }
}

const notesField = {
  form: formConfig.name,
  name: 'notes',
  type: 'text',
  label: 'Notes',
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
  } = props.simpleExample
  
  return (
    <Styles>
      <h1>🏁 React Final Form - Simple Example</h1>
      <a href="https://codesandbox.io/s/ww40y2m595">
        See source
      </a>

      <form onSubmit={handleSubmit}>
        {renderFFMUIComponent(firstNameField)}
        {renderFFMUIComponent(lastNameField)}
        {renderFFMUIComponent(employedField)}
        {renderFFMUIComponent(favoriteColorField)}
        {renderFFMUIComponent(toppingsField)}

        {/* sauces field */}
        <Grid container>
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
          </Grid>
        </Grid>
  
        {/* stooge field */}
        <Grid container>
          <Grid item xs={3}>
            <FormLabel
              style={{ position: 'relative', top: 16 }}
            >
              {stoogeField.label}
            </FormLabel>
          </Grid>

          <Grid item xs={9}
            style={{ 
              display: 'flex',
              justifyContent: 'flex-start' 
            }}
          >
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