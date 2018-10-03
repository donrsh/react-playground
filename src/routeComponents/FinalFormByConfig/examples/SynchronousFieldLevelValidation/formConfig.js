import {
  pipeValidatorsAndGetHead,
  isRequired,
  isNumber,
  isGreaterThanOrEqualTo
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
  name: 'SynchronousFieldLevelValidation',

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },
}

export const SynchronousFieldLevelValidation = form

export const firstNameField = {
  form: form.name,
  name: 'firstName',
  type: 'text',
  label: 'First Name',
  // disabled: true,
  // debug: true,
  validate: isRequired,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'First Name',
    },
  }
}

export const lastNameField = {
  form: form.name,
  name: 'lastName',
  type: 'text',
  label: 'Last Name',
  validate: isRequired,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Last Name',
    },
  }
}

export const ageField = {
  form: form.name,
  name: 'age',
  type: 'text',
  label: 'Age',
  validate: pipeValidatorsAndGetHead(
    isNumber,
    isGreaterThanOrEqualTo(18)
  ),
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Age',
    },
  }
}