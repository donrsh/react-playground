/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form } from 'react-final-form'
import * as R from 'ramda'

import { Grid, Button, Collapse } from '@material-ui/core'

import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'

import { fromRenderProps } from 'HOCs/fromRenderProps'
import { withTogglers } from 'HOCs/withTogglers'

import {
  renderFFMUIComponent,
  renderFFMUIHelperText,
  renderFFMUIFormLabel,
} from '../../common/renderFFMUIComponent'

import {
  simpleExampleForm,
  firstNameField,
  lastNameField,
  passwordField,
  employedField,
  favoriteColorField,
  toppingsField,
  saucesField,
  stoogeField,
  notesField,
} from './formConfig'

export const testIds = {
  togglerButton: 'togglerButton',
}

class SimpleExample extends React.Component {
  componentDidMount() {
    const v = `update${simpleExampleForm.name}`

    window[v] = nextValues => {
      R.pipe(
        Object.entries,
        R.forEach(x => this.props[simpleExampleForm.name].form.change(...x)),
      )(nextValues)
    }

    console.info(
      `🔮 You can access change form function via global variable: ${v}`,
    )

    this.releaseFormVariable = () => {
      window[v] = undefined
    }
  }

  componentWillUnmount() {
    this.releaseFormVariable()
  }

  Sub = {
    TogglerButton: () => {
      const { isOpen } = this.props.collapseToggler

      const TogglerComponent = isOpen ? ArrowDropUp : ArrowDropDown

      return (
        <TogglerComponent
          data-testid={testIds.togglerButton}
          data-open={`${isOpen}`}
        />
      )
    },
  }

  render() {
    // console.group('Final Form - SimpleExample')
    // console.log(this.props)
    // console.groupEnd()
    const { Sub } = this
    const { collapseToggler } = this.props

    const { handleSubmit, submitting, pristine, form, values } = this.props[
      simpleExampleForm.name
    ]

    return (
      <Styles id={simpleExampleForm.name}>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 React Final Form - {simpleExampleForm.title}
          <Sub.TogglerButton />
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/ww40y2m595">See source</a>

          <form onSubmit={handleSubmit}>
            {renderFFMUIComponent(firstNameField)}
            {renderFFMUIComponent(lastNameField)}
            {renderFFMUIComponent(passwordField)}
            {renderFFMUIComponent(employedField)}
            {renderFFMUIComponent(favoriteColorField)}
            {renderFFMUIComponent(toppingsField)}

            {/* sauces field */}
            <Grid container style={{ marginBottom: 20 }}>
              <Grid item xs={3}>
                {renderFFMUIFormLabel(saucesField, {
                  style: { position: 'relative', top: 16 },
                })}
              </Grid>

              <Grid item xs={9}>
                {R.pipe(
                  R.values,
                  R.map(field => (
                    <div style={{ display: 'flex' }} key={field.value}>
                      {renderFFMUIComponent(field)}
                    </div>
                  )),
                )(saucesField.subFields)}
                {renderFFMUIHelperText(saucesField)}
              </Grid>
            </Grid>

            {/* stooge field */}
            <Grid container style={{ marginBottom: 20 }}>
              <Grid item xs={3}>
                {renderFFMUIFormLabel(stoogeField, {
                  style: { position: 'relative', top: 16 },
                })}
              </Grid>

              <Grid item xs={9}>
                <Grid container>
                  {R.pipe(
                    R.values,
                    R.map(field => (
                      <div style={{ display: 'inline-flex' }} key={field.value}>
                        {renderFFMUIComponent(field)}
                      </div>
                    )),
                  )(stoogeField.subFields)}
                </Grid>
                {renderFFMUIHelperText(stoogeField)}
              </Grid>
            </Grid>

            {renderFFMUIComponent(notesField)}

            <div className="buttons">
              <Button
                type="submit"
                disabled={submitting || pristine}
                color="primary"
                variant="contained"
                style={{ marginRight: 8 }}
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
                variant="contained"
              >
                Reset
              </Button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        </Collapse>
      </Styles>
    )
  }
}

const enhancer = compose(
  withTogglers(({ defaultOpen = false }) => [
    { name: 'collapse', defaultOpen },
  ]),
  fromRenderProps(
    ({ children }) => <Form {...simpleExampleForm} children={children} />,
    formRenderProps => ({
      [simpleExampleForm.name]: formRenderProps,
    }),
  ),
)

export default enhancer(SimpleExample)
