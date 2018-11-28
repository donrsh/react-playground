import * as React from 'react'
import { Form } from 'react-final-form'
import { render } from 'react-testing-library'

import { MUIComponentDataAttribute, getInputId, getDataFieldAttribute } from './renderFFMUIComponent'

export function renderInForm(children, formConfig = {}) {
  const defaultFormConfig = {
    onSubmit: () => { }
  }

  const resolvedFormConfig = { ...defaultFormConfig, ...formConfig }

  return render(
    <Form {...resolvedFormConfig}>
      {
        (formRenderProps) => (
          <form onSubmit={formRenderProps.handleSubmit}>
            {
              typeof children === 'function' ? 
              children(formRenderProps) :
              children
            }
            <button type='submit' />
            {
              formConfig.show && (
                <pre id="formStateEl">
                  FormConfigs: {JSON.stringify(Object.keys(resolvedFormConfig), null, 2)}
                  formRenderProps: {JSON.stringify(formRenderProps, null, 2)}
                </pre>
              )
            }
          </form>
        )
      }
    </Form>
  )
}

const getBaseSelector = (fieldConfig) => {
  const { form, name } = fieldConfig
  return `[data-form=${form}][data-field=${name}]`
}

export const createElGetter = (baseEl) => ({
  getInput: (fieldConfig) => {
    const { isOption, type, value } = fieldConfig

    const formSelector = `[data-form=${fieldConfig.form}]`
    const valueSelector = (
      (type === 'checkbox' && isOption) ||
      type === 'radio'
    ) ? `[value="${value}"]` : ''

    return baseEl.querySelector(
      `${formSelector} input${valueSelector}`
    )
  },

  getLabel: (fieldConfig) => {
    const formSelector = `[data-form=${fieldConfig.form}]`
    const baseSelector = getBaseSelector(fieldConfig)
    const labelSelector = `label[data-field="${getDataFieldAttribute(fieldConfig)}"]`
    
    return baseEl.querySelector(
      `${formSelector}${labelSelector}, ${formSelector} ${labelSelector}`
    )
  },

  getFormControl: (fieldConfig) => {
    const { isOption, type, value } = fieldConfig

    const baseSelector = getBaseSelector(fieldConfig)

    return baseEl.querySelector(
      `${baseSelector}[${MUIComponentDataAttribute}="FormControl"]`
    )
  },

  getFormHelperText: (fieldConfig) => {
    const { isOption, type, value } = fieldConfig

    const baseSelector = getBaseSelector(fieldConfig)

    return baseEl.querySelector(
      `${baseSelector} [${MUIComponentDataAttribute}="FormHelperText"]`
    )
  },
})

export const sleep = ms => new Promise((ok) => {
  setTimeout(ok, ms)
})