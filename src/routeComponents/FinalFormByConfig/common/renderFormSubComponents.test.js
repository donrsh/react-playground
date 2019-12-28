import React from 'react'
import { FORM_ERROR } from 'final-form'
import { Field } from 'react-final-form'
import { fireEvent, waitForElement } from 'react-testing-library'
import * as R from 'ramda'

import { renderInForm, createElGetter, sleep } from './testHelpers'

import {
  formSubComponentNames,
  renderFFMUIComponent,
  createFFFormSubComponents,
  MUIComponentDataAttribute,
} from './renderFFMUIComponent'

const getSubmitBtn = baseElement =>
  baseElement.querySelector(`button[type=submit]`)

const formName = 'test-form-for-form-subcomponents'
const invalidName = 'INVALID_NAME'
const usernameInvalidMsg = `${Math.random()}`

describe(`${formSubComponentNames.ValidateIndicator}`, () => {
  it('basic', async () => {
    const verifyUsername = async values => {
      await sleep(500)
      if (
        ~[invalidName].indexOf(values.username && values.username.toLowerCase())
      ) {
        return { username: usernameInvalidMsg }
      }
    }

    const formConfig = {
      name: formName,
      validate: values => {
        const errors = {}
        if (!values.username) {
          errors.username = 'Required'
        }

        return Object.keys(errors).length ? errors : verifyUsername(values)
      },
    }

    const userNameField = {
      form: formName,
      name: 'username',
      type: 'text',
      label: 'Username',
    }

    const { ValidateIndicator } = createFFFormSubComponents(formConfig)

    const { baseElement } = renderInForm(
      <>
        {renderFFMUIComponent(userNameField)}
        <ValidateIndicator />,
      </>,
      formConfig,
    )

    const submitBtn = getSubmitBtn(baseElement)
    const { getInput } = createElGetter(baseElement)
    const usernameInputEl = getInput(userNameField)
    const getValidateIndicator = () =>
      baseElement.querySelector(
        `[${MUIComponentDataAttribute}="${formSubComponentNames.ValidateIndicator}"]`,
      )

    // In the beginning, the validate indicator should not appear
    expect(getValidateIndicator()).toBeNull()

    // change the username input to trigger form validate
    fireEvent.change(usernameInputEl, {
      target: { value: 'abcde' },
    })

    // now validate indicator should appear
    await sleep(100)
    expect(getValidateIndicator()).toBeInTheDocument()

    // wait until the validate function resolved
    await sleep(500)
    expect(getValidateIndicator()).not.toBeInTheDocument()
  })
})

describe(`${formSubComponentNames.SubmitErrorHelperText}`, () => {
  it('basic', async () => {
    const verifyUsername = async values => {
      await sleep(300)
      if (values.username === invalidName) {
        return { [FORM_ERROR]: usernameInvalidMsg }
      }
    }

    const formConfig = {
      name: formName,
      onSubmit: verifyUsername,
    }

    const userNameField = {
      form: formName,
      name: 'username',
      type: 'text',
      label: 'Username',
    }

    const { SubmitErrorHelperText } = createFFFormSubComponents(formConfig)

    const { baseElement } = renderInForm(
      <>
        {renderFFMUIComponent(userNameField)}
        <SubmitErrorHelperText />
      </>,
      formConfig,
    )

    const submitBtn = getSubmitBtn(baseElement)
    const { getInput } = createElGetter(baseElement)
    const usernameInputEl = getInput(userNameField)
    const getSubmitErrorHelperText = () =>
      baseElement.querySelector(
        `[${MUIComponentDataAttribute}="${formSubComponentNames.SubmitErrorHelperText}"]`,
      )

    // change the username input to trigger form validate
    fireEvent.change(usernameInputEl, {
      target: { value: invalidName },
    })

    // click the submit button
    fireEvent.click(submitBtn)

    // wait until onSubmit finish
    await sleep(500)

    // now submit error helper text should appear
    expect(getSubmitErrorHelperText()).toBeInTheDocument()
    expect(getSubmitErrorHelperText()).toContainHTML(usernameInvalidMsg)
  })
})
