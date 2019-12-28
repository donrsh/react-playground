import arrayMutators from 'final-form-arrays'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { ARRAY_ERROR } from 'final-form'

import { createFormLogger } from '../../helpers/finalFormLogger'

import {
  // pipeValidatorsAndGetHead,
  isRequired,
  // isRequiredForArrayField
} from '../../helpers/fieldValidators'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const form = {
  name: 'ArrayFields',

  debug: createFormLogger('ArrayFields'),

  mutators: {
    ...arrayMutators,
  },

  initialValues: {
    customers: [{ firstName: '1' }, { firstName: '2' }],
  },

  validate: values => {
    const errors = {}

    if (!values.company) {
      errors.company = `Company is required!`
    }

    if (!values.customers || values.customers.length < 4) {
      let arrayError = []
      arrayError[
        ARRAY_ERROR
      ] = `Should at least contain 4 customers. (by form validators)`
      errors.customers = arrayError
    }

    return errors
  },

  onSubmit: async values => {
    await sleep(1000)

    const { company, customers } = values

    const errors = {}

    if (!company) {
      errors.company = `Company is required!`
    }

    let customersError = []
    if (R.anyPass([RA.isNilOrEmpty, R.complement(RA.isArray)], customers)) {
      customersError[ARRAY_ERROR] = `Should at least contain 3 customers.`
    }
    if (RA.isArray(customers)) {
      if (customers.length <= 2) {
        customersError[ARRAY_ERROR] = `Should at least contain 3 customers.`
      }

      customers.forEach((v = {}, i) => {
        customersError[i] = R.pipe(
          R.unless(
            () => RA.isNonEmptyString(v.firstName),
            R.assoc('firstName', 'required'),
          ),
          R.unless(
            () => RA.isNonEmptyString(v.lastName),
            R.assoc('lastName', 'required'),
          ),
        )(undefined)
      })
    }
    if (RA.compact(customersError).length > 0 || customersError[ARRAY_ERROR]) {
      errors.customers = customersError
    }

    if (Object.keys(errors).length > 0) {
      return errors
    }

    window.alert(JSON.stringify(values, 0, 2))
  },
}

export const ArrayFieldsForm = form

export const companyField = {
  form: form.name,
  name: 'company',
  type: 'text',
  label: 'Company',
  labelStandalone: true,
  // disabled: true,
  // debug: true,
  validate: isRequired,
  MUIProps: {
    TextField: {
      placeholder: 'Company name',
      fullWidth: true,
      style: {
        marginBottom: 20,
      },
    },
  },
}

const TextFieldBasePropsForSubfields = {
  InputLabelProps: { shrink: true },
  style: {
    width: '40%',
    paddingRight: 20,
    marginBottom: 20,
  },
}

export const customersField = {
  form: form.name,
  name: 'customers',
  type: 'array',
  labelStandalone: true,
  label: 'Customers',
  validate: values => {
    if (!RA.isArray(values) || R.length(values) <= 2) {
      return `Should at least contain 3 customers. (by field validator)`
    }
  },
  // debug: true,
  subFields: {
    firstName: {
      form: form.name,
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      validate: isRequired,
      MUIProps: {
        TextField: TextFieldBasePropsForSubfields,
      },
    },
    lastName: {
      form: form.name,
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      MUIProps: {
        TextField: TextFieldBasePropsForSubfields,
      },
    },
  },
}
