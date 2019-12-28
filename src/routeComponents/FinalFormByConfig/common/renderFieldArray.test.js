import React from 'react'
import { ARRAY_ERROR } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { fireEvent, waitForElement } from 'react-testing-library'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import { renderInForm, createElGetter, sleep } from './testHelpers'

import {
  getInputId,
  MUIComponentDataAttribute,
  renderFFMUIFormLabel,
  renderFFMUIHelperText,
  renderFFMUIComponent,
} from './renderFFMUIComponent'

const MUILabelTextElSelector = `[class*=MuiFormControlLabel-label]`
const idForAddEmployeeBtn = `${Math.random()}`
const idForAddCustomerBtn = `${Math.random()}`
const entryAttrName = `is-entry`
const getEmployeeInputEntryEls = baseElement =>
  baseElement.querySelectorAll(`[data-${entryAttrName}=true]`)
const getAddEmployeeBtn = baseElement =>
  baseElement.querySelector(`button[id="${idForAddEmployeeBtn}"]`)
const getSubmitBtn = baseElement =>
  baseElement.querySelector(`button[type=submit]`)
const getSubElsOfEmployeeInputEntry = R.pipe(
  getEmployeeInputEntryEls,
  R.map(baseEl => ({
    label: baseEl.querySelector('label'),
    input: baseEl.querySelector('input'),
    helperText: baseEl.querySelector(
      `[${MUIComponentDataAttribute}="FormHelperText"]`,
    ),
  })),
)
const getFormStateEl = baseElement =>
  baseElement.querySelector(`[id=formStateEl]`)

const formName = 'test-form-of-field-array'

describe('FieldArray', () => {
  const errorMsgs = {
    tooFewEmployees: `${Math.random()}`,
    nameIsRequired: `${Math.random()}`,
    noJohn: `${Math.random()}`,
    forKellyAndMaryHateEachOther: `${Math.random()}`,
  }

  const employeesField = {
    form: formName,
    name: 'employees',
    type: 'array',
    label: 'Employees',
    validate: value => {
      if (!value || value.length < 3) {
        return errorMsgs.tooFewEmployees
      }
    },

    subField: {
      name: {
        form: formName,
        name: 'name',
        type: 'text',
        label: 'name',
      },
    },
  }

  const formConfig = {
    show: true,
    mutators: { ...arrayMutators },
    initialValues: {
      [employeesField.name]: [{}],
    },

    validate: values => {
      let employeesError = []

      R.addIndex(R.forEach)((employee, idx) => {
        const name = R.propOr(undefined, 'name', employee)
        if (!name) {
          employeesError = R.assocPath(
            [idx, 'name'],
            errorMsgs.nameIsRequired,
            employeesError,
          )
        }
      })(values[employeesField.name] || [])

      if (employeesError.length > 0) {
        return { [employeesField.name]: employeesError }
      } else {
        return {}
      }
    },

    onSubmit: values => {
      const allNames = values[employeesField.name].map(
        R.prop(employeesField.subField.name.name),
      )

      const errorToBe = []

      /* 
        Rule No1. - No employees named `John`.
        The errors is placed to the text field where invalid
      */
      let indexOfJohn = R.findIndex(R.equals('John'), allNames)
      if (indexOfJohn >= 0) {
        errorToBe[indexOfJohn] = {
          [employeesField.subField.name.name]: errorMsgs.noJohn,
        }
      }

      /* 
        Rule No2. - No employ named `Kelly` and `Mary` in the list
        This error is placed to the the array field
      */
      if (R.contains('Kelly', allNames) && R.contains('Mary', allNames)) {
        errorToBe[ARRAY_ERROR] = errorMsgs.forKellyAndMaryHateEachOther
      }

      if (errorToBe.length > 0 || errorToBe[ARRAY_ERROR]) {
        return {
          [employeesField.name]: errorToBe,
        }
      }
    },
  }

  it('basic', async () => {
    const { baseElement } = renderInForm(
      <>
        {renderFFMUIHelperText(employeesField)}

        <FieldArray
          name={employeesField.name}
          validate={employeesField.validate}
          children={({ fields }) => (
            <>
              <button id={idForAddEmployeeBtn} onClick={() => fields.push()} />

              {fields.map((name, i) => (
                <div {...{ [`data-${entryAttrName}`]: true }} key={name}>
                  {R.pipe(
                    R.evolve({
                      name: x => `${name}.${x}`,
                    }),
                    renderFFMUIComponent,
                  )(employeesField.subField.name)}
                </div>
              ))}
            </>
          )}
        />

        {renderFFMUIFormLabel(employeesField)}
      </>,
      formConfig,
    )

    const { getInput, getLabel, getFormHelperText } = createElGetter(
      baseElement,
    )

    const fieldLabelEl = getLabel(employeesField)
    const helperTextEl = getFormHelperText(employeesField)
    const addEmployeeBtn = getAddEmployeeBtn(baseElement)
    const submitBtn = getSubmitBtn(baseElement)
    const formStateEl = getFormStateEl(baseElement)

    let entryEls, entrySubEls
    const updateEntryEls = () => {
      entryEls = getEmployeeInputEntryEls(baseElement)
      entrySubEls = getSubElsOfEmployeeInputEntry(baseElement)
    }

    /* render properly */
    expect(fieldLabelEl).toBeInTheDocument()
    expect(fieldLabelEl).toContainHTML(employeesField.label)
    expect(helperTextEl).toBeInTheDocument()
    expect(helperTextEl).toBeEmpty()

    /* submit directly */
    fireEvent.click(submitBtn)

    await sleep(100)

    // validator in employeesField should work
    // `tooFewEmployees` error should appear
    expect(getFormHelperText(employeesField)).toContainHTML(
      errorMsgs.tooFewEmployees,
    )
    // validator in formConfig should work
    // `nameIsRequired` error should appear
    updateEntryEls()
    expect(entrySubEls[0].helperText).toContainHTML(errorMsgs.nameIsRequired)

    /* add 2 employees */
    fireEvent.click(addEmployeeBtn)
    fireEvent.click(addEmployeeBtn)

    await sleep(50)

    /* expect there would be three entry elements */
    updateEntryEls()
    expect(entryEls).toHaveLength(3)

    /* change the name of employees */
    fireEvent.change(entrySubEls[0].input, {
      target: { value: 'John' },
    })
    fireEvent.change(entrySubEls[1].input, {
      target: { value: 'Kelly' },
    })
    fireEvent.change(entrySubEls[2].input, {
      target: { value: 'Mary' },
    })

    await sleep(50)

    /* Since changed, the error should disapper */
    expect(getFormHelperText(employeesField)).toBeEmpty()
    updateEntryEls()
    expect(entrySubEls[0].helperText).toBeNull()

    /* submit again */
    fireEvent.click(submitBtn)

    await sleep(50)

    // onSubmit should work
    updateEntryEls()
    expect(entrySubEls[0].helperText).toContainHTML(errorMsgs.noJohn)
    expect(getFormHelperText(employeesField)).toContainHTML(
      errorMsgs.forKellyAndMaryHateEachOther,
    )

    /* change the name of first employee */
    fireEvent.change(entrySubEls[0].input, {
      target: { value: 'Johnx' },
    })

    await sleep(50)

    /* Since changed, the error should disapper */
    expect(getFormHelperText(employeesField)).toBeEmpty()
    updateEntryEls()
    expect(entrySubEls[0].helperText).toBeNull()
  })
})
