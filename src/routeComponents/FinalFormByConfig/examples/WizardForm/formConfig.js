import * as RA from 'ramda-adjunct'

import {
  pipeValidatorsAndGetHead,
  isRequired,
  isRequiredForMultipleSelect,
} from '../../helpers/fieldValidators'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const MUITextFieldBaseProps = {
  fullWidth: true,
  InputLabelProps: { shrink: true },
  style: {
    marginBottom: 20
  },
}

export const WizardForm = {
  name: 'WizardForm',

  onSubmit: async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  },

  initialValues: {
    stooge: 'moe',
    employed: false,
    // favoriteColor: '#00ff00',
    toppings: []
  },

  nonAPI: 123
}

export const firstNameField = {
  form: WizardForm.name,
  name: 'firstName',
  type: 'text',
  label: 'First Name',
  labelStandalone: true,
  // disabled: true,
  // debug: true,
  validate: pipeValidatorsAndGetHead(
    isRequired,
  ),
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
    },
  }
}

export const lastNameField = {
  form: WizardForm.name,
  name: 'lastName',
  type: 'text',
  label: 'Last Name',
  labelStandalone: true,
  validate: pipeValidatorsAndGetHead(
    isRequired,
  ),
  placeholder: 'Last Name',
  MUIProps: {
    TextField: MUITextFieldBaseProps
  }
}

export const emailField = {
  form: WizardForm.name,
  name: 'email',
  type: 'text',
  label: 'Email',
  labelStandalone: true,
  MUIProps: {
    TextField: {
      placeholder: 'email',
      ...MUITextFieldBaseProps
    },
  }
}

export const employedField = {
  form: WizardForm.name,
  name: 'employed',
  type: 'checkbox',
  label: 'Employed',
  // disabled: true,
  // debug: true,
  MUIProps: {
    FormControlLabel: {
      labelPlacement: 'start'
    }
  }
}

export const favoriteColorField = {
  form: WizardForm.name,
  name: 'favoriteColor',
  type: 'select',
  label: 'Favorite Color',
  labelStandalone: true,
  // disabled: true,
  // debug: true,
  options: [
    { value: "#ff0000", display: "❤️ Red" },
    { value: "#00ff00", display: "💚 Green" },
    { value: "#0000ff", display: "💙 Blue" },
  ],
  getOptionProps: ({ value, display }) => ({
    key: value,
    value,
    children: display
  }),
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      select: true,
      SelectProps: {
        native: false
      }
    }
  }
}

export const toppingsField = {
  form: WizardForm.name,
  name: 'toppings',
  type: 'select',
  label: 'Toppings',
  // validate: pipeValidatorsAndGetHead(
  //   isRequiredForMultipleSelect,
  // ),
  // disabled: true,
  // debug: true,
  options: [
    { value: "chicken", display: "🐓 Chicken" },
    { value: "ham", display: "🐷 Ham" },
    { value: "mushrooms", display: "🍄 Mushrooms" },
    { value: "cheese", display: "🧀 Cheese" },
    { value: "tuna", display: "🐟 Tuna" },
    { value: "pineapple", display: "🍍 Pineapple" }
  ],
  getOptionProps: ({ value, display }) => ({
    key: value,
    value,
    children: display
  }),
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      select: true,
      SelectProps: {
        multiple: true,
        // native: true
      },
    }
  }
}

export const saucesField = {
  form: WizardForm.name,
  name: 'sauces',
  type: 'selectionGroup',
  label: 'Sauces',
  validate: pipeValidatorsAndGetHead(
    isRequiredForMultipleSelect,
    (value, allValues, props, name) => {
      if (RA.isArray(value) && value.length > 2) {
        return {
          msg: `Neh, I don't think more than 2 sauces would be a good idea...`
        }
      }
    }
  ),
  // debug: true,
  subFields: {
    ketchup: {
      form: WizardForm.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Ketchup',
      value: 'ketchup',
      MUIProps: {},
      // disabled: true,
      // debug: true,
    },
    mustard: {
      form: WizardForm.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Mustard',
      value: 'mustard',
      MUIProps: {}
    },
    mayonnaise: {
      form: WizardForm.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Mayonnaise',
      value: 'mayonnaise',
      MUIProps: {}
    },
    guacamole: {
      form: WizardForm.name,
      name: 'sauces',
      type: 'checkbox',
      label: 'Guacamole',
      value: 'guacamole',
      MUIProps: {}
    }
  }
}

export const stoogeField = {
  form: WizardForm.name,
  name: 'stooge',
  type: 'radioGroup',
  label: 'Best Stooge',
  // debug: true,
  validate: pipeValidatorsAndGetHead(
    (value, allValues, props, name) => {
      if (value === 'moe') {
        return {
          msg: `Moe? Are you sure?`
        }
      }
    }
  ),
  subFields: {
    larry: {
      form: WizardForm.name,
      name: 'stooge',
      type: 'radio',
      label: 'Larry',
      value: 'larry',
      MUIProps: {}
    },
    moe: {
      form: WizardForm.name,
      name: 'stooge',
      type: 'radio',
      label: 'Moe',
      value: 'moe',
      MUIProps: {},
    },
    curly: {
      form: WizardForm.name,
      name: 'stooge',
      type: 'radio',
      label: 'Curly',
      value: 'curly',
      MUIProps: {},
      // disabled: true,
      // debug: true,
    },
  }
}

export const notesField = {
  form: WizardForm.name,
  name: 'notes',
  type: 'text',
  label: 'Notes',
  labelStandalone: true,
  // debug: true,
  MUIProps: {
    TextField: {
      ...MUITextFieldBaseProps,
      multiline: true,
      rows: 2,
      placeholder: 'Write some things...',
    },
  }
}