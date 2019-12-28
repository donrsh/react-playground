import React from 'react'
import { Field } from 'react-final-form'
import { fireEvent, waitForElement } from 'react-testing-library'
import * as R from 'ramda'

import { renderInForm, createElGetter } from './testHelpers'

import {
  getInputId,
  renderFFMUIFormLabel,
  renderFFMUIComponent,
  renderFFMUIHelperText,
} from './renderFFMUIComponent'

const MUILabelTextElSelector = `[class*=MuiFormControlLabel-label]`
const idForSelectedValues = `${Math.random()}`
const getSubmitBtn = baseElement =>
  baseElement.querySelector(`button[type=submit]`)
const getSelectedValuesEl = baseElement =>
  baseElement.querySelector(`[id="${idForSelectedValues}"]`)

const formName = 'test-form'

describe('Checkbox (Standalone)', () => {
  const fieldBaseConfig = {
    type: 'checkbox',
    name: 'standaloneCheckbox',
    form: formName,
    label: 'Standalone Checkbox',
  }

  it('basic', () => {
    const fieldConfig = fieldBaseConfig
    const { baseElement } = renderInForm(renderFFMUIComponent(fieldBaseConfig))
    const inputId = getInputId(fieldConfig)

    const { getInput, getLabel } = createElGetter(baseElement)

    const labelEl = getLabel(fieldConfig)
    const inputEl = getInput(fieldConfig)
    const labelTextEl = labelEl.querySelector(MUILabelTextElSelector)

    /* render properly */
    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toContainHTML(fieldConfig.label)
    expect(inputEl).toBeInTheDocument()

    /* input should have id */
    expect(inputEl).toHaveAttribute('id', inputId)
    /* label should have `for` attr for input */
    expect(labelEl).toHaveAttribute('for', inputId)

    /* toggle functionality works */
    inputEl.click()
    expect(inputEl.value).toBe(`true`)
    inputEl.click()
    expect(inputEl.value).toBe(`false`)
  })

  it(`"disabled" config works`, () => {
    const fieldConfig = { ...fieldBaseConfig, disabled: true }
    const { baseElement, getByTestId } = renderInForm(
      renderFFMUIComponent(fieldConfig),
    )

    const { getInput, getLabel } = createElGetter(baseElement)
    const inputEl = getInput(fieldConfig, baseElement)

    expect(inputEl).toBeDisabled()
  })
})

describe('Checkbox (As Group)', () => {
  const invalidFieldMessage = `${Math.random()}`
  const submitErrorMessage = `${Math.random()}`

  const fieldBaseConfig = {
    form: formName,
    name: 'sauces',
    type: 'selectionGroup',
    label: 'Sauces',
    validate: value => {
      if (!value || (Array.isArray(value) && value.length < 2)) {
        return invalidFieldMessage
      }
    },
    options: {
      ketchup: {
        form: formName,
        name: 'sauces',
        type: 'checkbox',
        isOption: true,
        label: 'Ketchup',
        value: 'ketchup',
      },
      mustard: {
        form: formName,
        name: 'sauces',
        type: 'checkbox',
        isOption: true,
        label: 'Mustard',
        value: 'mustard',
      },
      mayonnaise: {
        form: formName,
        name: 'sauces',
        type: 'checkbox',
        isOption: true,
        label: 'Mayonnaise',
        value: 'mayonnaise',
      },
      guacamole: {
        form: formName,
        name: 'sauces',
        type: 'checkbox',
        isOption: true,
        label: 'Guacamole',
        value: 'guacamole',
      },
    },
  }
  const { ketchup, mustard, mayonnaise, guacamole } = fieldBaseConfig.options

  const formConfig = {
    onSubmit: values =>
      R.contains(ketchup.value, values[fieldBaseConfig.name])
        ? { [fieldBaseConfig.name]: submitErrorMessage }
        : {},
  }

  let fieldLabelEl, inputEls, helperTextEl, selectedValuesEl, submitBtn
  beforeAll(() => {
    const { baseElement } = renderInForm(
      ({ values }) => (
        <>
          {renderFFMUIFormLabel(fieldBaseConfig)}
          {R.pipe(
            Object.values,
            R.map(field => ({ ...field, key: field.value })),
            R.map(renderFFMUIComponent),
          )(fieldBaseConfig.options)}
          {renderFFMUIHelperText(fieldBaseConfig)}

          <div id={idForSelectedValues}>
            {`${values[fieldBaseConfig.name]}`}
          </div>
        </>
      ),
      formConfig,
    )

    selectedValuesEl = getSelectedValuesEl(baseElement)
    submitBtn = getSubmitBtn(baseElement)

    const { getInput, getLabel, getFormHelperText } = createElGetter(
      baseElement,
    )

    fieldLabelEl = getLabel(fieldBaseConfig)
    inputEls = {
      ketchup: getInput(ketchup),
      mustard: getInput(mustard),
      mayonnaise: getInput(mayonnaise),
      guacamole: getInput(guacamole),
    }
    helperTextEl = getFormHelperText(fieldBaseConfig)
  })

  it('basic', () => {
    /* render properly */
    expect(fieldLabelEl).toBeInTheDocument()
    expect(fieldLabelEl).toContainHTML(fieldBaseConfig.label)
    expect(inputEls.ketchup).toBeInTheDocument()
    expect(inputEls.mustard).toBeInTheDocument()
    expect(inputEls.mayonnaise).toBeInTheDocument()
    expect(inputEls.guacamole).toBeInTheDocument()
    expect(helperTextEl).toBeInTheDocument()
    expect(helperTextEl).toBeEmpty()

    /* touch the field */
    inputEls.ketchup.focus()
    inputEls.ketchup.blur()

    /* now the error should appear */
    expect(helperTextEl).toContainHTML(invalidFieldMessage)

    /* choose two sauces */
    inputEls.ketchup.click()
    inputEls.mustard.click()

    /* 
      the selected values should contains `ketchup` and `mustard`, 
      while not `mayonnaise` and `guacamole`
    */
    expect(selectedValuesEl).toContainHTML(ketchup.value)
    expect(selectedValuesEl).toContainHTML(mustard.value)
    expect(selectedValuesEl).not.toContainHTML(mayonnaise.value)
    expect(selectedValuesEl).not.toContainHTML(guacamole.value)

    /* then validate should pass, and the error should disappear */
    expect(helperTextEl).toBeEmpty()

    /* click submit button */
    submitBtn.click()

    /* when `ketchup` is selected, the error should appear */
    expect(helperTextEl).toContainHTML(submitErrorMessage)

    /* change the field */
    inputEls.mayonnaise.click()

    /* then the error should disapper */
    expect(helperTextEl).toBeEmpty()
  })
})
