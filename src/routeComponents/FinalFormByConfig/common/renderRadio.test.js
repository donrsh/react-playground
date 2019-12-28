import React from 'react'
import { Field } from 'react-final-form'
import { fireEvent, waitForElement } from 'react-testing-library'
import * as R from 'ramda'

import { renderInForm, createElGetter, sleep } from './testHelpers'

import {
  getInputId,
  renderFFMUIFormLabel,
  renderFFMUIComponent,
  renderFFMUIHelperText,
} from './renderFFMUIComponent'

const MUILabelTextElSelector = `[class*=MuiFormControlLabel-label]`
const idForRadioValue = `${Math.random()}`
const getSubmitBtn = baseElement =>
  baseElement.querySelector(`button[type=submit]`)
const getRadioValueEl = baseElement =>
  baseElement.querySelector(`[id="${idForRadioValue}"]`)

const formName = 'test-form'

describe('Radio', () => {
  const fieldInvalidMessage = `${Math.random()}`
  const submitInvalidMessage = `${Math.random()}`

  const fieldBaseConfig = {
    form: formName,
    name: 'stooge',
    type: 'radioGroup',
    label: 'Best Stooge',
    validate: value => (value === 'moe' ? fieldInvalidMessage : undefined),

    options: {
      larry: {
        form: formName,
        name: 'stooge',
        type: 'radio',
        label: 'Larry',
        value: 'larry',
        disabled: true,
      },
      moe: {
        form: formName,
        name: 'stooge',
        type: 'radio',
        label: 'Moe',
        value: 'moe',
      },
      curly: {
        form: formName,
        name: 'stooge',
        type: 'radio',
        label: 'Curly',
        value: 'curly',
      },
    },
  }

  it('basic', async () => {
    const fieldConfig = fieldBaseConfig
    const { baseElement } = renderInForm(formRenderProps => (
      <>
        {renderFFMUIFormLabel(fieldConfig)}

        {R.pipe(
          R.values,
          R.map(field => ({ ...field, key: field.value })),
          R.map(renderFFMUIComponent),
        )(fieldConfig.options)}

        {renderFFMUIHelperText(fieldConfig)}

        <div id={idForRadioValue}>
          {formRenderProps.values[fieldConfig.name]}
        </div>
      </>
    ))

    const { larry, moe, curly } = fieldConfig.options

    const { getInput, getLabel, getFormHelperText } = createElGetter(
      baseElement,
    )

    const fieldLabelEl = getLabel(fieldConfig)
    const radioValueEl = getRadioValueEl(baseElement)
    const helperTextEl = getFormHelperText(fieldConfig)
    const optionLabelEls = {
      larry: getLabel(larry),
      moe: getLabel(moe),
      curly: getLabel(curly),
    }
    const optionLabelTextEls = R.map(labelEl =>
      labelEl.querySelector(MUILabelTextElSelector),
    )(optionLabelEls)
    const optionRadioEls = {
      larry: getInput(larry),
      moe: getInput(moe),
      curly: getInput(curly),
    }

    /* render properly */
    expect(fieldLabelEl).toBeInTheDocument()
    expect(fieldLabelEl).toContainHTML(fieldConfig.label)
    expect(optionLabelEls.larry).toBeInTheDocument()
    expect(optionLabelEls.moe).toBeInTheDocument()
    expect(optionLabelEls.curly).toBeInTheDocument()
    expect(optionLabelTextEls.larry).toContainHTML(larry.label)
    expect(optionLabelTextEls.moe).toContainHTML(moe.label)
    expect(optionLabelTextEls.curly).toContainHTML(curly.label)
    expect(optionRadioEls.larry).toBeInTheDocument()
    expect(optionRadioEls.moe).toBeInTheDocument()
    expect(optionRadioEls.curly).toBeInTheDocument()

    /* `larry` is disabled */
    expect(optionRadioEls.larry).toBeDisabled()

    /* make the field touched, for showing error later */
    fireEvent.blur(optionRadioEls.curly)
    fireEvent.click(optionRadioEls.curly)

    /* choose `curly`, then the radio value should be it */
    fireEvent.focus(optionRadioEls.curly)
    expect(radioValueEl.innerHTML).toEqual(curly.value)
    expect(helperTextEl).toBeEmpty()

    /* choose `moe`, then the HelperText should contain the invalid message */
    fireEvent.click(optionRadioEls.moe)
    expect(helperTextEl).toContainHTML(fieldInvalidMessage)
  })

  it(`standalone FormLabels and HelperText should reflect submit error`, async () => {
    const fieldConfig = R.omit(['validate'], fieldBaseConfig)
    const formConfig = {
      initialValues: {
        /* Set invalid initial value */
        [fieldConfig.name]: 'moe',
      },
      validate: values =>
        values[fieldConfig.name] === 'moe'
          ? { [fieldConfig.name]: fieldInvalidMessage }
          : {},
    }

    const { baseElement } = renderInForm(
      formRenderProps => (
        <React.Fragment>
          {renderFFMUIFormLabel(fieldConfig)}

          {R.pipe(
            R.values,
            R.map(field => ({ ...field, key: field.value })),
            R.map(renderFFMUIComponent),
          )(fieldConfig.options)}

          {renderFFMUIHelperText(fieldConfig)}

          <div id={idForRadioValue}>
            {formRenderProps.values[fieldConfig.name]}
          </div>
        </React.Fragment>
      ),
      formConfig,
    )

    const { getFormHelperText, getInput } = createElGetter(baseElement)

    const helperTextEl = getFormHelperText(fieldConfig)
    expect(helperTextEl).toBeEmpty() /* since untouched */

    const submitBtn = getSubmitBtn(baseElement)
    submitBtn.click()

    expect(helperTextEl).toContainHTML(fieldInvalidMessage)

    /* choose other option */
    const curlyInput = getInput(fieldConfig.options.curly)
    curlyInput.click()

    /* now the error should disapper */
    expect(helperTextEl).toBeEmpty()
  })
})
