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
    marginBottom: 20
  },
}

const verifyUsername = async values => {
  await sleep(1000);
  if (
    ~["john", "paul", "george", "ringo"].indexOf(
      values.username && values.username.toLowerCase()
    )
  ) {
    return { username: "Username taken!" }
  }
}

 const form = {
  name: 'HybridSyncAsyncRecordLevelValidation',

  // debug: console.log,

  validate: values => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.confirm) {
      errors.confirm = "Required";
    } else if (values.confirm !== values.password) {
      errors.confirm = "Does not match";
    }

    return Object.keys(errors).length ? errors : verifyUsername(values);
  },

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },
}

export const HybridSyncAsyncRecordLevelValidation = form

export const userNameField = {
  form: form.name,
  name: 'username',
  type: 'text',
  label: 'Username',
  // disabled: true,
  // debug: true,
  // validate: verifyUsername,
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

export const confirmField = {
  form: form.name,
  name: 'confirm',
  type: 'password',
  label: 'Confirm',
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Confirm',
    },
  }
}