import React from 'react'
import { Field } from 'react-final-form'
import { fireEvent, waitForElement } from 'react-testing-library'

import { renderInForm, createElGetter } from './testHelpers'

import {
  getInputId,
  renderFFMUIComponent
} from './renderFFMUIComponent'

const MUILabelTextElSelector = `[class*=MuiFormControlLabel-label]`
const getSubmitBtn = (baseElement) =>
  baseElement.querySelector(
    `button[type=submit]`
  )

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
    const { baseElement } = renderInForm(
      renderFFMUIComponent(fieldBaseConfig)
    )
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
    expect (labelEl).toHaveAttribute('for', inputId)

    /* toggle functionality works */
    inputEl.click()
    expect(inputEl.value).toBe(`true`)
    inputEl.click()
    expect(inputEl.value).toBe(`false`)
  })

  it(`"disabled" config works`, () => {
    const fieldConfig = { ...fieldBaseConfig, disabled: true }
    const { baseElement, getByTestId } = renderInForm(
      renderFFMUIComponent(fieldConfig)
    )

    const { getInput, getLabel } = createElGetter(baseElement)
    const inputEl = getInput(fieldConfig, baseElement)

    expect(inputEl).toBeDisabled()
  })
})