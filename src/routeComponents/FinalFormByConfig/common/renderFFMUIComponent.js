import * as React from 'react'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { Field, FormSpy } from 'react-final-form'

import {
  MenuItem, FormHelperText, Typography, CircularProgress
} from '@material-ui/core'

import FFMUITextField from 'components/FinalFormMUI/TextField'
import FFMUICheckbox from 'components/FinalFormMUI/Checkbox'
import FFMUIRadio from 'components/FinalFormMUI/Radio'
import FFFormHelperText from 'components/FinalFormMUI/FormHelperText'

import { isMoreThanNChars, isLessThanNChars } from '../helpers/fieldValidators'

/* 
  See final-form FieldProps:
  https://github.com/final-form/react-final-form#fieldprops
*/
const getFFFieldProps = (fieldConfig) => {
  const { key, FFFieldProps = {} } = fieldConfig
  
  return {
    ...(key ? { key } : null),

    ...R.pick([
      'name',
      'type',
      'label',
      'validate',
      'validateFields',
      'value',
    ])(fieldConfig),
    
    ...FFFieldProps
  }
}

const getMUIProps = (
  fieldConfig, fieldRenderProps
) => {
  const { MUIProps = {}, type } = fieldConfig
  
  const base = {
    ...R.pick(['type', 'label', 'form', 'debug'], fieldConfig),
    ...fieldRenderProps,
    MUIProps: {
      ...MUIProps,
      Root: {
        disabled: fieldConfig.disabled
      }
    }
  }

  switch (type) {
    case 'text':
    case 'password':
    case 'select':
      return R.applyTo(base)(R.pipe(
        R.assocPath(
          ['MUIProps', 'TextField', 'helperText'],
          getHelperTextContent(fieldConfig, fieldRenderProps)
        )
      ))
  
    default:
      return base
  }
}

const getHelperTextContent = (fieldConfig, fieldRenderProps) => {
  const { minLength, maxLength } = fieldConfig
  const { 
    input: { value }, 
    meta: { error, touched, submitError } 
  } = fieldRenderProps

  /* priority-1: submit error */
  if (submitError) {
    return submitError
  }

  /* priority-2: error */
  if (Boolean(touched && error)) {
    if (!R.contains(error.validatedBy, [isMoreThanNChars, isLessThanNChars])) {
      return typeof error === 'string' ? 
        error : 
        (error.msg || 'unknow error')
    }
  }

  /* priority-3: display text number */
  if (R.any(RA.isNotNil, [minLength, maxLength])) {
    const minLengthValid = R.allPass([RA.isInteger, RA.isPositive])(minLength)
    const maxLengthValid = R.allPass([RA.isInteger, RA.isPositive])(maxLength)

    return (
      <span style={{ float: 'right' }}>
        {minLengthValid && `${minLength} /`}
        <b style={{ textDecoration: 'underline', whiteSpace: 'pre'}}>
          {' '}{`${value}`.length}{' '}
        </b>
        {maxLengthValid && `/ ${maxLength}`}
      </span>
    )
  }

  /* return null otherwise */
  return null
}

export const renderFFMUIHelperText = (
  fieldConfig, 
  FormHelperTextProps = {}
) => {
  return (
    <Field
      {...getFFFieldProps(fieldConfig)}
      render={fieldRenderProps => (
        <FFFormHelperText
          {...fieldRenderProps}
          {...R.pick(
            ['type', 'label', 'form', 'debug'], 
            fieldConfig
          )}
          MUIProps={{
            FormHelperText: {
              ...FormHelperTextProps,
              children: getHelperTextContent(fieldRenderProps, fieldRenderProps)
            }
          }}
        />
      )}
    />
  )
}

export const renderFFMUIComponent = (fieldConfig) => {
  const { type } = fieldConfig

  switch (type) {
    case 'text': 
    case 'password': {
      return (
        <Field
          {...getFFFieldProps(fieldConfig)}
          render={fieldRenderProps => (
            <FFMUITextField
              {...getMUIProps(fieldConfig, fieldRenderProps)}
            />
          )}
        />
      )
    }

    case 'select': {
      const { options = [], getOptionProps } = fieldConfig

      const native = R.pathOr(
        false,
        ['MUIProps', 'TextField', 'SelectProps', 'native']
      )(fieldConfig)

      const multiple = R.pathOr(
        false,
        ['MUIProps', 'TextField', 'SelectProps', 'multiple']
      )(fieldConfig)

      if (native && multiple) {
        throw new Error(`You cannot set both "multiple" and "native" to be true for rendering MUI Select.`)
      }
      
      const OptionComponent = native ? 'option' : MenuItem

      return (
        <Field
          {...getFFFieldProps(fieldConfig)}
          render={fieldRenderProps => (
            <FFMUITextField
              {...getMUIProps(fieldConfig, fieldRenderProps)}
              children={options.map(option => 
                <OptionComponent {...getOptionProps(option)} />
              )}
            />
          )}
        />
      )
    }

    case 'checkbox': {
      return (
        <Field
          {...getFFFieldProps(fieldConfig)}
          render={fieldRenderProps => (
            <FFMUICheckbox
              {...getMUIProps(fieldConfig, fieldRenderProps)}
            />
          )}
        />
      )
    }

    case 'radio': {
      return (
        <Field
          {...getFFFieldProps(fieldConfig)}
          render={fieldRenderProps => (
            <FFMUIRadio
              {...getMUIProps(fieldConfig, fieldRenderProps)}
            />
          )}
        />
      )
    }

    default:
      throw new Error(`Invalid input type: ${type}.`)
  }
}

const DefaultFFFormSubComponents = {
  ValidateIndicator: ({ validating }) => {
    return validating && (
      <Typography variant="body2" color="primary"
        component="span"
        style={{
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        <CircularProgress size={16}
          style={{ marginRight: 8 }}
        />
        <span>validating ...</span>
      </Typography>
    )
  },

  SubmitErrorHelperText: ({ submitError, submitErrors }) => {
    return submitError ? (
      <FormHelperText
        error
        children={submitError}
      /> 
    ) : null
  },
}

export const createFFFormSubComponents = (formConfig) => ({
  ValidateIndicator: ({ component }) => {
    return (
      <FormSpy
        subscription={{ validating: true }}
        component={
          component ||
          DefaultFFFormSubComponents.ValidateIndicator
        }
      />
    )
  },

  SubmitErrorHelperText: ({ component }) => {
    return (
      <FormSpy
        subscription={{
          submitError: true,
          submitErrors: true
        }}
        component={
          component ||
          DefaultFFFormSubComponents.SubmitErrorHelperText
        }
      />
    )
  }
})
