import React from 'react'
import { Field } from 'react-final-form'
import { fireEvent, waitForElement } from 'react-testing-library'

import { renderInForm, createElGetter } from './testHelpers'

import {
  getInputId,
  renderFFMUIComponent
} from './renderFFMUIComponent'

const formName = 'testForm'

describe('TextField', () => {
  const fieldBaseConfig = {
    type: 'text',
    name: 'text-basic',
    form: formName,
    label: 'Text Basic'
  }

  const getSubmitBtn = (baseElement) => 
    baseElement.querySelector(
      `button[type=submit]`
    )

  it('basic', () => {
    const fieldConfig = fieldBaseConfig
    const { baseElement } = renderInForm(
      renderFFMUIComponent(fieldConfig)
    )
    const inputId = getInputId(fieldConfig)

    const { getInput, getLabel } = createElGetter(baseElement)
    const labelEl = getLabel(fieldConfig)
    const inputEl = getInput(fieldConfig)

    /* render properly */
    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toContainHTML(fieldBaseConfig.label)
    expect(inputEl).toBeInTheDocument()

    /* input should have `id` attribute */
    expect(inputEl).toHaveAttribute('id', inputId)
    /* label should have `for` attribute for the input*/
    expect(labelEl).toHaveAttribute('for', inputId)
  })

  it(`"placeholder" config works`, () => {
    const placeholder = `${Math.random()}`
    const fieldConfig = { ...fieldBaseConfig, placeholder }
    
    const { baseElement } = renderInForm(
      renderFFMUIComponent(fieldConfig)
    )

    const { getInput } = createElGetter(baseElement)
    const inputEl = getInput(fieldConfig)

    expect(inputEl).toHaveAttribute('placeholder', placeholder)
  })

  it(`"disabled" config works`, () => {
    const fieldConfig = { ...fieldBaseConfig, disabled: true }
    const { baseElement } = renderInForm(
      renderFFMUIComponent(fieldConfig)
    )

    const { getInput } = createElGetter(baseElement)
    const inputEl = getInput(fieldBaseConfig)    

    expect(inputEl).toBeDisabled()
  })

  it(`"labelStandalone" config works`, () => {
    const fieldConfig = { ...fieldBaseConfig, labelStandalone: true }
    const { baseElement } = renderInForm(
      renderFFMUIComponent(fieldConfig)
    )

    const { getLabel } = createElGetter(baseElement)
    const labelEl = getLabel(fieldConfig)

    expect(labelEl).toBeNull()
  })

  it(`field-level validate do make error helperText appear`, async () => {
    const helperTextTestId = `${Math.random()}`
    const requiredMessage = `${Math.random()}`

    const fieldConfig = {
      ...fieldBaseConfig,
      validate: value => value ? undefined : requiredMessage,
    }

    const { baseElement } = renderInForm(
      renderFFMUIComponent(fieldConfig)
    )

    const { getInput, getFormHelperText } = createElGetter(baseElement)
    const inputEl = getInput(fieldConfig)    
    const getHelperTextElThunk = () => getFormHelperText(fieldConfig)

    /* untouched field should not show error */
    expect(getHelperTextElThunk()).toBeNull()

    /* touch and blur the input */
    inputEl.focus()
    inputEl.blur()

    /* now the error should appear */
    await waitForElement(getHelperTextElThunk)
    expect(getHelperTextElThunk()).toContainHTML(requiredMessage)

    /* type something to the input */
    fireEvent.change(inputEl, {
      target: { value: 'abcde' }
    })

    /* now the error should disappear */
    expect(getHelperTextElThunk()).toBeNull()
  })

  it(`record-level validate do make error helperText appear`, async () => {
    const helperTextTestId = `${Math.random()}`
    const requiredMessage = `${Math.random()}`
    
    const formConfig = {
      validate: values => !values[fieldBaseConfig.name] ?
        { [fieldBaseConfig.name]: requiredMessage } : {}
    }

    const fieldConfig = fieldBaseConfig

    const { baseElement } = renderInForm(
      renderFFMUIComponent(fieldConfig),
      formConfig
    )

    const { getInput, getFormHelperText } = createElGetter(baseElement)
    const inputEl = getInput(fieldBaseConfig)
    const submitBtn = getSubmitBtn(baseElement)

    submitBtn.click()

    const getHelperTextElThunk = () => getFormHelperText(fieldConfig)

    /* now the error should appear */
    await waitForElement(getHelperTextElThunk)
    expect(getHelperTextElThunk()).toContainHTML(requiredMessage)

    /* type something to the input */
    fireEvent.change(inputEl, {
      target: { value: 'abcde' }
    })

    /* now the error should disappear */
    expect(getHelperTextElThunk()).toBeNull()
  })

  xit(`field-level async validate do make error helperText appear`, () => {})
})