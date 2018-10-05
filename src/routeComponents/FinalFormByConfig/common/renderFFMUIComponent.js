import * as React from 'react'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { ARRAY_ERROR } from 'final-form'
import { Field, FormSpy } from 'react-final-form'

import {
  MenuItem, FormHelperText, Typography, CircularProgress,
  FormLabel
} from '@material-ui/core'

import FFFormControl from 'components/FinalFormMUI/FormControl'
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
  const { MUIProps = {}, type, labelStandalone } = fieldConfig
  
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
        ),
        R.when(
          () => labelStandalone,
          R.assocPath(
            ['MUIProps', 'TextField', 'InputLabelProps', 'style'],
            { display: 'none' }
          ),
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

const getArrayFieldHelperTextContent = (fieldConfig, formSpyRenderProps) => {
  if (Boolean(
    R.path(
      ['dirtyFields', fieldConfig.name],
      formSpyRenderProps
    )
  )) {
    return (
      R.path(
        ['submitErrors', fieldConfig.name, ARRAY_ERROR],
        formSpyRenderProps
      )
    ) || (
      R.path(
        ['errors', fieldConfig.name, ARRAY_ERROR],
        formSpyRenderProps
      )
    )
  }
}

export const renderFFMUIHelperText = (
  fieldConfig, 
  FormHelperTextProps = {}
) => {
  return (
    <Field
      {...getFFFieldProps(fieldConfig)}
      render={fieldRenderProps => (
        <FFFormControl
          fieldConfig={fieldConfig}
          fieldRenderProps={fieldRenderProps}
        >
          <FFFormHelperText
            {...fieldRenderProps}
            {...R.pick(
              ['type', 'label', 'form', 'debug'], 
              fieldConfig
            )}
            MUIProps={{
              FormHelperText: {
                ...FormHelperTextProps,
                children: getHelperTextContent(
                  fieldConfig, 
                  fieldRenderProps
                )
              }
            }}
          />
        </FFFormControl>
      )}
    />
  )
}

export const renderFFArrayFieldMUIHelperText = (
  fieldConfig,
  FormHelperTextProps = {}
) => {
  return (
    <FormSpy
      render={(formSpyRenderProps) => (
        <FFFormControl
          fieldConfig={fieldConfig}
          formSpyRenderProps={formSpyRenderProps}
          children={
            <FFFormHelperText
              {...R.pick(
                ['type', 'label', 'form', 'debug'],
                fieldConfig
              )}
              MUIProps={{
                FormHelperText: {
                  ...FormHelperTextProps,
                  children: getArrayFieldHelperTextContent(
                    fieldConfig, 
                    formSpyRenderProps
                  )
                }
              }}
            />
          }
        />
      )}
    />
  )
}

export const renderFFMUIFormLabel = (
  fieldConfig,
  FormLabelProps = {}
) => {
  return (
    <Field
      {...getFFFieldProps(fieldConfig)}
      render={fieldRenderProps => (
        <FFFormControl
          fieldConfig={fieldConfig}
          fieldRenderProps={fieldRenderProps}
        >
          <FormLabel
            {...FormLabelProps}
            children={fieldConfig.label}
          />
        </FFFormControl>
      )}
    />
  )
}

export const renderFFArrayFieldMUIFormLabel = (
  fieldConfig,
  FormLabelProps = {}
  ) => {
    return (
      <FormSpy
        render={(formSpyRenderProps) => (
        <FFFormControl
          fieldConfig={fieldConfig}
          formSpyRenderProps={formSpyRenderProps}
          children={
            <FormLabel
              {...FormLabelProps}
              children={fieldConfig.label}
            />
          }
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
