import setFieldData from 'final-form-set-field-data'

import { createFormLogger } from '../../helpers/finalFormLogger'

import {
  // pipeValidatorsAndGetHead,
  isRequired,
  // isNumber,
  // isGreaterThanOrEqualTo
} from '../../helpers/fieldValidators'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const MUITextFieldBaseProps = {
  fullWidth: true,
  InputLabelProps: { shrink: true },
  style: {
    marginBottom: 20
  },
}

 const form = {
  name: 'CustomValidationEngine',

  debug: createFormLogger('CustomValidationEngine'),

  mutators: { 
    setFieldData,

    /* 
    setFieldError: ([name, error], state, tools) => {
      console.log(name, error)
      const field = state.fields[name]
      console.log(field)
      if (field) {
        field.error = error
      }
    }
    */
  },

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },
}

export const CustomValidationEngine = form

export const firstNameField = {
  form: form.name,
  name: 'firstName',
  type: 'text',
  placeholder: 'First Name',
  label: 'First Name',
  // disabled: true,
  // debug: true,
  validate: isRequired,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
    },
  }
}

export const lastNameField = {
  form: form.name,
  name: 'lastName',
  type: 'text',
  placeholder: 'Last Name',
  label: 'Last Name',
  validate: isRequired,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
    },
  }
}

export const emailField = {
  form: form.name,
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Email',
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
    },
  }
}