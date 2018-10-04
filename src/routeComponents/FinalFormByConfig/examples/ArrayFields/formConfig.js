import arrayMutators from 'final-form-arrays'

import {
  // pipeValidatorsAndGetHead,
  isRequired,
  isRequiredForArrayField
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
  name: 'ArrayFields',

  mutators: {
    ...arrayMutators
  },

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },
}

export const ArrayFieldsForm = form

export const companyField = {
  form: form.name,
  name: 'company',
  type: 'text',
  label: 'Company',
  // disabled: true,
  // debug: true,
  validate: isRequired,
  MUIProps: {
    TextField: {
      fullWidth: true,
      InputLabelProps: { style: { display: 'none' } },
      style: {
        marginBottom: 20
      },
    },
  }
}

export const customersField = {
  form: form.name,
  name: 'customers',
  type: 'array',
  validate: isRequiredForArrayField,
}