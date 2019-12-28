import * as R from 'ramda'

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
    marginBottom: 20,
  },
}

const form = {
  name: 'ParseAndFormat',

  // debug: createFormLogger('ParseAndFormat'),

  validate: values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'

      return Object.keys(errors).length ? errors : undefined
    }
  },

  onSubmit: async values => {
    await sleep(1000)

    window.alert('LOGIN SUCCESS!')
  },
}

export const ParseAndFormat = form

export const userNameField = {
  form: form.name,
  name: 'username',
  type: 'text',
  label: 'Username',
  parse: value => (value ? value.toUpperCase() : ''),
  format: value => (value ? value.toLowerCase() : ''),
  // disabled: true,
  // debug: true,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      placeholder: 'Username',
    },
  },
}

export const phoneField = {
  form: form.name,
  name: 'phone',
  type: 'text',
  placeholder: '(999) 999-9999',
  label: 'Phone',
  parse: value => {
    if (!value) return value

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) return onlyNums
    if (onlyNums.length <= 7)
      return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
      6,
      10,
    )}`
  },
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
    },
  },
}

export const cardField = {
  form: form.name,
  name: 'card',
  type: 'text',
  placeholder: 'XXXX - XXXX - XXXX - XXXX',
  label: 'Card No',
  parse: value => {
    if (!value) return value

    const onlyNums = value.replace(/[^\d]/g, '')

    return R.pipe(
      R.slice(0, 16),
      R.split(''),
      R.splitEvery(4),
      R.map(R.join('')),
      R.join(' - '),
    )(onlyNums)
  },
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
    },
  },
}
