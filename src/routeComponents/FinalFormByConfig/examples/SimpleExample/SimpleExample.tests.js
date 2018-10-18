import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import SimpleExample, { testIds } from './SimpleExample'
import {
  simpleExampleForm,
  firstNameField,
  notesField
} from './formConfig'

it('renders properly', () => {
  const { baseElement, getByTestId } = render(
    <SimpleExample defaultOpen/>
  )
  
  expect(
    baseElement.querySelector(`#${simpleExampleForm.name}`)
  ).toBeDefined()
})

it('toggle works', () => {
  const { baseElement, getByTestId } = render(
    <SimpleExample defaultOpen={false} />
  )

  expect(
    baseElement.querySelector(`#${simpleExampleForm.name}`)
  ).toBeDefined()

  expect(
    getByTestId(testIds.togglerButton)
  ).toHaveAttribute('data-open', 'false')

  fireEvent.click(getByTestId(testIds.togglerButton))

  expect(
    getByTestId(testIds.togglerButton)
  ).toHaveAttribute('data-open', 'true')
})

it(`"placeholder config works`, () => {
  const { baseElement, getByTestId } = render(
    <SimpleExample defaultOpen />
  )

  expect(
    baseElement.querySelector(`#${simpleExampleForm.name} [name=${firstNameField.name}]`)
  ).toHaveAttribute('placeholder', firstNameField.placeholder)
})

it(`"disabled" config works`, () => {
  const { baseElement, getByTestId } = render(
    <SimpleExample defaultOpen />
  )

  expect(
    baseElement.querySelector(`#${simpleExampleForm.name} [name=${notesField.name}]`)
  ).toBeDisabled()
})