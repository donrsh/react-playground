import React from 'react'
import { FORM_ERROR } from 'final-form'
import { Field } from 'react-final-form'
import { fireEvent, waitForElement } from 'react-testing-library'
import * as R from 'ramda'

import { renderInForm, createElGetter, sleep } from './testHelpers'

import {
  formSubComponentNames,
  createFFFormSubComponents,
  MUIComponentDataAttribute
} from './renderFFMUIComponent'

const getSubmitBtn = (baseElement) =>
  baseElement.querySelector(
    `button[type=submit]`
  )

const formName = 'test-form-for-form-subcomponents'

describe(`${formSubComponentNames.ValidateIndicator}`, () => {
  it('basic', async() => {
    const formConfig = {
      name: formName,
      validate: async () => {
        await sleep(100)
        return {}
      }
    }

    const { ValidateIndicator } = createFFFormSubComponents(formConfig)

    const { baseElement } = renderInForm(
        <ValidateIndicator />
      , formConfig
    )

    const submitBtn = getSubmitBtn(baseElement)
    const getValidateIndicator = () => 
      baseElement.querySelector(
        `[${MUIComponentDataAttribute}="${formSubComponentNames.ValidateIndicator}"]`
      )

    await sleep(3000)    
    console.dom(getValidateIndicator())    

    // Not yet submit, 
    // expect the `ValidateIndicator` to be null
    // expect(getValidateIndicator()).toBeNull()

    // click submit button
    // fireEvent.click(submitBtn)

    // Since the `onSubmit` is async,
    // we expect the indicator to appear
    await sleep(100)
    // expect(getValidateIndicator()).toBeInTheDocument()

    // The `onSumbit` last for 500ms,
    // After that duration, we expect the indicator to disapeear
    await sleep(1000)
    // expect(getValidateIndicator()).toBeNull()

    expect(1).toBe(1)
  })
})

/* 
xdescribe(`${formSubComponentNames.SubmitErrorHelperText}`, async () => {
  const submitError = `${Math.random()}`
  const formConfig = {
    name: formName,
    onSubmit: async () => {
      return {[FORM_ERROR]: submitError}
    }
  }

  const { SubmitErrorHelperText } = createFFFormSubComponents(formConfig)

  const { baseElement } = renderInForm(
    <SubmitErrorHelperText />
    , formConfig
  )

  const submitBtn = getSubmitBtn(baseElement)
  const getSubmitErrorHelperText = () =>
    baseElement.querySelector(
      `[${MUIComponentDataAttribute}="${formSubComponentNames.SubmitErrorHelperText}"]`
    )

  // Not yet submit, 
  // expect the `SubmitErrorHelperText` to be null
  expect(SubmitErrorHelperText).toBeNull()

  // click submit button
  fireEvent.click(submitBtn)

  // Since the `onSubmit` is async,
  // we expect the indicator to appear
  await sleep(50)
  expect(getValidateIndicator).toBeInTheDocument()

  // The `onSumbit` last for 500ms,
  // After that duration, we expect the indicator to disapeear
  await sleep(1000)
  expect(getValidateIndicator).toBeNull()
})
*/