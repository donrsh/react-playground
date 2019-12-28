import * as React from 'react'
import * as RA from 'ramda-adjunct'

import { InputAdornment } from '@material-ui/core'

import {
  pipeValidatorsAndGetHead,
  isRequired,
  isRequiredForMultipleSelect,
  isMoreThanNChars,
} from '../../helpers/fieldValidators'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const MUITextFieldBaseProps = {
  fullWidth: true,
  InputLabelProps: { shrink: true },
  style: {
    marginBottom: 20,
  },
}

export const simpleExampleForm = {
  name: 'SimpleExample',

  title: 'Simple Example',

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },

  initialValues: {
    stooge: 'moe',
    employed: false,
    // favoriteColor: '#00ff00',
    toppings: [],
  },

  nonAPI: 123,
}

export const firstNameField = {
  form: simpleExampleForm.name,
  name: 'firstName',
  type: 'text',
  label: 'First Name',
  placeholder: 'First Name',
  // disabled: true,
  // debug: true,
  validate: pipeValidatorsAndGetHead(isRequired),
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
    },
  },
}

export const lastNameField = {
  form: simpleExampleForm.name,
  name: 'lastName',
  type: 'text',
  label: 'Last Name',
  placeholder: 'Last Name',
  MUIProps: {
    TextField: MUITextFieldBaseProps,
  },
}

export const passwordField = {
  form: simpleExampleForm.name,
  name: 'password',
  validate: pipeValidatorsAndGetHead(isRequired, isMoreThanNChars(8)),
  minLength: 8,
  type: 'password',
  label: 'Password',
  MUIProps: {
    TextField: {
      placeholder: 'password',
      ...MUITextFieldBaseProps,
    },
  },
}

export const employedField = {
  form: simpleExampleForm.name,
  name: 'employed',
  type: 'checkbox',
  label: 'Employed',
  // disabled: true,
  // debug: true,
  MUIProps: {
    FormControlLabel: {
      labelPlacement: 'start',
    },
  },
}

export const favoriteColorField = {
  form: simpleExampleForm.name,
  name: 'favoriteColor',
  type: 'select',
  label: 'Favorite Color',
  validate: pipeValidatorsAndGetHead(isRequired),
  // disabled: true,
  // debug: true,
  options: [
    { value: '#ff0000', display: '❤️ Red' },
    { value: '#00ff00', display: '💚 Green' },
    { value: '#0000ff', display: '💙 Blue' },
  ],
  getOptionProps: ({ value, display }) => ({
    key: value,
    value,
    children: display,
  }),
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      select: true,
      SelectProps: {
        native: false,
      },
      InputProps: {
        startAdornment: (
          <InputAdornment variant="filled" position="start">
            Color
          </InputAdornment>
        ),
      },
    },
  },
}

export const toppingsField = {
  form: simpleExampleForm.name,
  name: 'toppings',
  type: 'select',
  label: 'Toppings',
  validate: pipeValidatorsAndGetHead(isRequiredForMultipleSelect),
  // disabled: true,
  // debug: true,
  options: [
    { value: 'chicken', display: '🐓 Chicken' },
    { value: 'ham', display: '🐷 Ham' },
    { value: 'mushrooms', display: '🍄 Mushrooms' },
    { value: 'cheese', display: '🧀 Cheese' },
    { value: 'tuna', display: '🐟 Tuna' },
    { value: 'pineapple', display: '🍍 Pineapple' },
  ],
  getOptionProps: ({ value, display }) => ({
    key: value,
    value,
    children: display,
  }),
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      select: true,
      SelectProps: {
        multiple: true,
        // native: true
      },
    },
  },
}

export const saucesField = {
  form: simpleExampleForm.name,
  name: 'sauces',
  type: 'checkboxGroup',
  label: 'Sauces',
  validate: pipeValidatorsAndGetHead(
    isRequiredForMultipleSelect,
    (value, allValues, props, name) => {
      if (RA.isArray(value) && value.length > 2) {
        return {
          msg: `Neh, I don't think more than 2 sauces would be a good idea...`,
        }
      }
    },
  ),
  // debug: true,
  subFields: {
    ketchup: {
      form: simpleExampleForm.name,
      name: 'sauces',
      type: 'checkbox',
      isOption: true,
      label: 'Ketchup',
      value: 'ketchup',
      MUIProps: {},
      // disabled: true,
      // debug: true,
    },
    mustard: {
      form: simpleExampleForm.name,
      name: 'sauces',
      type: 'checkbox',
      isOption: true,
      label: 'Mustard',
      value: 'mustard',
      MUIProps: {},
    },
    mayonnaise: {
      form: simpleExampleForm.name,
      name: 'sauces',
      type: 'checkbox',
      isOption: true,
      label: 'Mayonnaise',
      value: 'mayonnaise',
      MUIProps: {},
    },
    guacamole: {
      form: simpleExampleForm.name,
      name: 'sauces',
      type: 'checkbox',
      isOption: true,
      label: 'Guacamole',
      value: 'guacamole',
      MUIProps: {},
    },
  },
}

export const stoogeField = {
  form: simpleExampleForm.name,
  name: 'stooge',
  type: 'radioGroup',
  label: 'Best Stooge',
  // debug: true,
  validate: pipeValidatorsAndGetHead((value, allValues, props, name) => {
    if (value === 'moe') {
      return {
        msg: `Moe? Are you sure?`,
      }
    }
  }),
  subFields: {
    larry: {
      form: simpleExampleForm.name,
      name: 'stooge',
      type: 'radio',
      label: 'Larry',
      value: 'larry',
      MUIProps: {},
    },
    moe: {
      form: simpleExampleForm.name,
      name: 'stooge',
      type: 'radio',
      label: 'Moe',
      value: 'moe',
      MUIProps: {},
    },
    curly: {
      form: simpleExampleForm.name,
      name: 'stooge',
      type: 'radio',
      label: 'Curly',
      value: 'curly',
      MUIProps: {},
      // disabled: true,
      // debug: true,
    },
  },
}

export const notesField = {
  form: simpleExampleForm.name,
  name: 'notes',
  type: 'text',
  label: 'Notes',
  disabled: true,
  // debug: true,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      multiline: true,
      rows: 2,
      placeholder: 'Write some things...',
    },
  },
}
