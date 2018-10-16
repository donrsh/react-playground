import arrayMutators from 'final-form-arrays'
import * as RA from 'ramda-adjunct'
import createDecorator from 'final-form-calculate'
import { ARRAY_ERROR } from 'final-form'

// import { createFormLogger } from '../../helpers/finalFormLogger'

import {
  pipeValidatorsAndGetHead,
  isRequired,
  isNumber,
} from '../../helpers/fieldValidators'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const calculator = createDecorator(
  {
    field: 'minimum', // when minimum changes...
    updates: {
      // ...update maximum to the result of this function
      maximum: (minimumValue, allValues) =>
        Math.max(minimumValue || 0, allValues.maximum || 0)
    }
  },
  {
    field: 'maximum', // when maximum changes...
    updates: {
      // update minimum to the result of this function
      minimum: (maximumValue, allValues) =>
        Math.min(maximumValue || 0, allValues.minimum || 0)
    }
  },
  {
    field: /day\[\d\]/, // when a field matching this pattern changes...
    updates: {
      // ...update the total to the result of this function
      total: (ignoredValue, allValues) => {
        const sum = (allValues.day || [])
          .reduce((sum, value) => sum + Number(value || 0), 0)

        return RA.isNaN(sum) ? `` : sum
      }
    }
  }
)

const form = {
  name: 'CalculatedFields',

  // debug: createFormLogger('CalculatedFields'),

  decorators: [calculator],

  mutators: {
    ...arrayMutators
  },

  validate: (values) => {
    const dayError = []
    dayError[ARRAY_ERROR] = 'wrong'

    return { day: dayError }
  },

  onSubmit: async values => {
    await sleep(1000)

    window.alert(JSON.stringify(values, 0, 2))
  },
}

export const CalculatedFieldsForm = form

const TextFieldBaseProps = {
  fullWidth: true,
  style: {
    marginBottom: 5
  },
}

export const minimumField = {
  form: form.name,
  name: 'minimum',
  type: 'text',
  label: 'Minimum',
  labelStandalone: true,
  // disabled: true,
  // debug: true,
  validate: pipeValidatorsAndGetHead(
    isRequired,
    isNumber
  ),
  MUIProps: {
    TextField: {
      ...TextFieldBaseProps,
      placeholder: 'Minimum',
    },
  }
}

export const maximumField = {
  form: form.name,
  name: 'maximum',
  type: 'text',
  label: 'Maximum',
  labelStandalone: true,
  // disabled: true,
  // debug: true,
  validate: pipeValidatorsAndGetHead(
    isRequired,
    isNumber
  ),
  MUIProps: {
    TextField: {
      ...TextFieldBaseProps,
      placeholder: 'Maximum',
    },
  }
}

export const dayField = {
  name: 'day',
  type: 'array',
  // validate: (values) => {
  // }
  subFields: {
    Monday: {
      name: 'day[0]',
      type: 'text',
      label: 'Monday',
      labelStandalone: true,
      // debug: true,
      validate: pipeValidatorsAndGetHead(
        isRequired,
        isNumber
      ),
      MUIProps: {
        TextField: {
          ...TextFieldBaseProps,
          placeholder: 'Monday',
        },
      }
    },
    Tuesday: {
      name: 'day[1]',
      type: 'text',
      label: 'Tuesday',
      labelStandalone: true,
      // debug: true,
      validate: pipeValidatorsAndGetHead(
        isRequired,
        isNumber
      ),
      MUIProps: {
        TextField: {
          ...TextFieldBaseProps,
          placeholder: 'Tuesday',
        },
      }
    },
    Wednesday: {
      name: 'day[2]',
      type: 'text',
      label: 'Wednesday',
      labelStandalone: true,
      // debug: true,
      validate: pipeValidatorsAndGetHead(
        isRequired,
        isNumber
      ),
      MUIProps: {
        TextField: {
          ...TextFieldBaseProps,
          placeholder: 'Wednesday',
        },
      }
    },
    Thursday: {
      name: 'day[3]',
      type: 'text',
      label: 'Thursday',
      labelStandalone: true,
      // debug: true,
      validate: pipeValidatorsAndGetHead(
        isRequired,
        isNumber
      ),
      MUIProps: {
        TextField: {
          ...TextFieldBaseProps,
          placeholder: 'Thursday',
        },
      }
    },
    Friday: {
      name: 'day[4]',
      type: 'text',
      label: 'Friday',
      labelStandalone: true,
      // debug: true,
      validate: pipeValidatorsAndGetHead(
        isRequired,
        isNumber
      ),
      MUIProps: {
        TextField: {
          ...TextFieldBaseProps,
          placeholder: 'Friday',
        },
      }
    }
  }
}

export const totalField = {
  form: form.name,
  name: 'total',
  type: 'text',
  label: 'Total',
  disabled: true,
  labelStandalone: true,
  // disabled: true,
  // debug: true,
  MUIProps: {
    TextField: {
      ...TextFieldBaseProps
    },
  }
}