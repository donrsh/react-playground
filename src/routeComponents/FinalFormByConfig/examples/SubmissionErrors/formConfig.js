import { FORM_ERROR } from 'final-form'

// import {
//   pipeValidatorsAndGetHead,
//   isRequired,
//   isRequiredForMultipleSelect,
//   isMoreThanNChars
// } from '../../helpers/fieldValidators'

// import { createFormLogger } from '../../helpers/finalFormLogger'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const MUITextFieldBaseProps = {
  fullWidth: true,
  InputLabelProps: { shrink: true },
  style: {
    marginBottom: 20
  },
}

const form = {
  name: 'SubmissionErrors',

  // debug: createFormLogger('SubmissionErrors'),

  validate: values => {
    const errors = {}
    if (!values.username) {
      errors.username = "Required"
    }
    if (!values.password) {
      errors.password = "Required"
    }

    return Object.keys(errors).length ? errors : undefined
  },

  onSubmit: async values => {
    await sleep(1000)
    if (values.username !== "erikras") {
      return { username: "Unknown username" }
    }
    if (values.password !== "finalformrocks") {
      return { [FORM_ERROR]: "Login Failed" }
    }
    window.alert("LOGIN SUCCESS!")
  },
}

export const SubmissionErrors = form

export const userNameField = {
  form: form.name,
  name: 'username',
  type: 'text',
  label: 'Username',
  // disabled: true,
  // debug: true,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Username',
    },
  }
}

export const passwordField = {
  form: form.name,
  name: 'password',
  type: 'password',
  label: 'Password',
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Password',
    },
  }
}