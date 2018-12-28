/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react'
import Styles from './Styles'
import { compose } from 'recompose'
import { Form } from 'react-final-form'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import {
  Button, Collapse, Grid, CircularProgress,
  Divider, FormHelperText
} from '@material-ui/core'

import {
  ArrowDropDown, ArrowDropUp
} from '@material-ui/icons'

import { fromRenderProps } from 'HOCs/fromRenderProps'
import { withTogglers } from 'HOCs/withTogglers'

import {
  renderFFMUIComponent,
  renderFFMUIFormLabel,
} from '../../common/renderFFMUIComponent'

import {
  CalculatedFieldsForm,
  minimumField,
  maximumField,
  dayField,
  totalField
} from './formConfig'

const daySubfields = dayField.subFields

class ExampleComponent extends React.Component {
  componentDidMount() {
    const v = `update${CalculatedFieldsForm.name}`

    window[v] = (nextValues) => {

      R.pipe(
        Object.entries,
        R.forEach(x =>
          this.props[CalculatedFieldsForm.name].form.change(...x)
        )
      )(nextValues)

    }

    console.info(`🔮 You can access change form function via global variable: ${v}`)

    this.releaseFormVariable = () => {
      window[v] = undefined
    }
  }

  componentWillUnmount() {
    this.releaseFormVariable()
  }

  renderFieldInGrid = (fieldConfig) => (
    <Grid container>
      <Grid item xs={3}>
        <div style={{
          position: 'relative',
          top: 21
        }}>
          {renderFFMUIFormLabel(fieldConfig)}
        </div>
      </Grid>
      <Grid item xs={9}>
        {renderFFMUIComponent(fieldConfig)}
      </Grid>
    </Grid>
  )

  render() {
    // console.group('Final Form - ExampleComponent')
    // console.log(this.props)
    // console.groupEnd()
    const { renderFieldInGrid } = this
    const { collapseToggler } = this.props

    const {
      handleSubmit, submitting, pristine, form,
      values, touched
    } = this.props[CalculatedFieldsForm.name]

    return (
      <Styles>
        <h1 onClick={() => collapseToggler.toggle()}>
          🏁 Calculated Fields
          {
            collapseToggler.isOpen ?
              <ArrowDropUp /> :
              <ArrowDropDown />
          }
        </h1>

        <Collapse in={collapseToggler.isOpen}>
          <a href="https://codesandbox.io/s/oq52p6v96y">
            See source
          </a>

          <p>
            {`Change the minimum and maximum values with the arrow keys and notice that the other updates so that minimum is always <= maximum.`}
          </p>

          <p>
            As you enter numbers for each day of the week, the total is calulated in realtime.
          </p>

          <form onSubmit={handleSubmit}>
            {renderFieldInGrid(minimumField)}
            {renderFieldInGrid(maximumField)}

            <Divider />

            {renderFieldInGrid(daySubfields.Monday)}
            {renderFieldInGrid(daySubfields.Tuesday)}
            {renderFieldInGrid(daySubfields.Wednesday)}
            {renderFieldInGrid(daySubfields.Thursday)}
            {renderFieldInGrid(daySubfields.Friday)}
            {renderFieldInGrid(totalField)}

            <Divider />

            <div style={{ height: 50 }}>
              {
                R.any(Boolean, R.values(touched)) &&
                (() => {
                  const { minimum, maximum, total } = values

                  if (RA.isNumber(total)) {
                    if (
                      RA.isNumber(minimum) &&
                      Number(total) < Number(minimum)
                    ) {
                      return (
                        <FormHelperText
                          error
                          children={`Total is less than mininum!`}
                        />
                      )
                    }

                    if (
                      RA.isNumber(maximum) &&
                      Number(total) > Number(maximum)
                    ) {
                      return (
                        <FormHelperText
                          error
                          children={`Total exceed maximum!`}
                        />
                      )
                    }
                  }
                })()
              }
            </div>

            <div className="buttons">
              <Button
                type="submit"
                disabled={submitting || pristine}
                color="primary"
                variant="contained"
                style={{ marginRight: 8 }}
              >
                {
                  submitting && (
                    <CircularProgress size={16}
                      style={{ marginRight: 8 }}
                    />
                  )
                }
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
  withTogglers(({ defaultOpen }) => [
    { name: 'collapse', defaultOpen }
  ]),
  fromRenderProps(
    ({ children }) => (
      <Form
        {...CalculatedFieldsForm}
        children={children}
      />
    ),
    (formRenderProps) => ({
      [CalculatedFieldsForm.name]: formRenderProps
    }),
  )
)

export default enhancer(ExampleComponent)