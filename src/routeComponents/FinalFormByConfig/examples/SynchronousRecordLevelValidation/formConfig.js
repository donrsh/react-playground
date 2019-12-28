// import {
//   pipeValidatorsAndGetHead,
//   isRequired,
//   isRequiredForMultipleSelect,
//   isMoreThanNChars
// } from '../../helpers/fieldValidators'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const MUITextFieldBaseProps = {
  fullWidth: true,
  InputLabelProps: { shrink: true },
  style: {
    marginBottom: 20,
  },
}

const form = {
  name: 'SynchronousRecordLevelValidation',

  validate: values => {
    const errors = {}
    if (!values.firstName) {
      errors.firstName = 'Required'
    }
    if (!values.lastName) {
      errors.lastName = 'Required'
    }
    if (!values.age) {
      errors.age = 'Required'
    } else if (isNaN(values.age)) {
      errors.age = 'Must be a number'
    } else if (values.age < 18) {
      errors.age = 'No kids allowed'
    }
    return errors
  },

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },
}

export const SynchronousRecordLevelValidationForm = form

export const firstNameField = {
  form: form.name,
  name: 'firstName',
  type: 'text',
  label: 'First Name',
  // disabled: true,
  // debug: true,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'First Name',
    },
  },
}

export const lastNameField = {
  form: form.name,
  name: 'lastName',
  type: 'text',
  label: 'Last Name',
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Last Name',
    },
  },
}

export const ageField = {
  form: form.name,
  name: 'age',
  type: 'text',
  label: 'Age',
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Age',
    },
  },
}
