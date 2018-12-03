import * as React from 'react'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { Field, FormSpy } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { ARRAY_ERROR } from 'final-form'

import {
  MenuItem, FormHelperText, Typography, CircularProgress,
  FormLabel, InputAdornment
} from '@material-ui/core'

import FFFormControl from 'components/FinalFormMUI/FormControl'
import FFMUITextField from 'components/FinalFormMUI/TextField'
import FFMUICheckbox from 'components/FinalFormMUI/Checkbox'
import FFMUIRadio from 'components/FinalFormMUI/Radio'
import FFFormHelperText from 'components/FinalFormMUI/FormHelperText'

import { isMoreThanNChars, isLessThanNChars } from '../helpers/fieldValidators'

export const MUIComponentDataAttribute = 'data-mui-component'

export const getInputId = (fieldConfig) => {
  const { form, name, isOption, type } = fieldConfig

  let inputId = `${form}(${name})`
  if (
    (type === 'checkbox' && isOption) ||
    type === 'radio'
  ) {
    inputId = `${form}(${name}:${fieldConfig.value})`
  }

  return inputId
}

export const getDataFieldAttribute = (fieldConfig) => {
  const { name, type, isOption, value } = fieldConfig

  return (
    (type === 'checkbox' && isOption) ||
    type === 'radio'
  ) ? `${name}:${value}` : name
}

export const formSubComponentNames = {
  ValidateIndicator: 'ValidateIndicator',
  SubmitErrorHelperText: 'SubmitErrorHelperText'
}

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
      'allowNull',
      'format',
      'formatOnBlur',
      'isEqual',
      'parse',
      'subscription'
    ])(fieldConfig),

    ...FFFieldProps
  }
}

const getMUIProps = (
  fieldConfig, fieldRenderProps
) => {
  const {
    MUIProps = {},
    type,
    form, name,
    labelStandalone,
    placeholder
  } = fieldConfig

  const validating = R.pathOr(
    false, ['meta', 'data', 'validating'], fieldRenderProps
  )

  const inputId = getInputId(fieldConfig)

  const base = {
    ...R.pick(['type', 'label', 'form', 'debug'], fieldConfig),
    ...fieldRenderProps,
    MUIProps: {
      ...MUIProps,
      Root: {
        disabled: fieldConfig.disabled,
        'data-form': form,
        'data-field': name
      }
    }
  }

  switch (type) {
    case 'text':
    case 'password':
    case 'select':
      return R.applyTo(base)(R.pipe(
        R.assocPath(
          ['MUIProps', 'TextField', 'FormHelperTextProps', MUIComponentDataAttribute],
          'FormHelperText'
        ),
        R.assocPath(
          ['MUIProps', 'TextField', 'helperText'],
          getHelperTextContent(fieldConfig, fieldRenderProps)
        ),
        R.assocPath(
          ['MUIProps', 'TextField', 'InputProps', 'id'],
          inputId
        ),
        R.over(
          R.lensPath(['MUIProps', 'TextField', 'InputLabelProps']),
          R.merge({
            htmlFor: inputId,
            'data-field': getDataFieldAttribute(fieldConfig)
          })
        ),
        R.when(
          () => labelStandalone,
          R.assocPath(
            ['MUIProps', 'TextField', 'InputLabelProps', 'component'],
            () => null
          ),
        ),
        R.when(
          () => Boolean(placeholder),
          R.assocPath(
            ['MUIProps', 'TextField', 'placeholder'],
            placeholder
          ),
        ),
        R.when(
          () => validating,
          R.pipe(
            R.assocPath(
              ['MUIProps', 'TextField', 'InputProps', 'endAdornment'],
              <InputAdornment>
                <CircularProgress size={18} />
              </InputAdornment>
            ),
            R.assocPath(
              ['MUIProps', 'TextField', 'disabled'], true
            )
          )
        )
      ))

    case 'checkbox':
      return R.applyTo(base)(R.pipe(
        R.over(
          R.lensPath(['MUIProps', 'FormControlLabel']),
          R.merge({
            htmlFor: inputId,
            'data-field': getDataFieldAttribute(fieldConfig)
          })
        ),
        R.assocPath(
          ['MUIProps', 'Checkbox', 'id'],
          inputId
        ),
      ))

    case 'radio':
      return R.applyTo(base)(R.pipe(
        R.over(
          R.lensPath(['MUIProps', 'FormControlLabel']),
          R.merge({
            htmlFor: inputId,
            'data-field': getDataFieldAttribute(fieldConfig)
          })
        ),
        R.assocPath(
          ['MUIProps', 'Radio', 'id'],
          inputId
        ),
      ))

    default:
      return base
  }
}

const getHelperTextContent = (fieldConfig, fieldRenderProps) => {
  const { minLength, maxLength } = fieldConfig
  const {
    input: { value },
    meta: {
      error, touched, submitError, dirtySinceLastSubmit,
      data: { error: dataError, validating } = {}
    },
  } = fieldRenderProps

  /* priority-1: data error */
  if (validating === false && dataError) {
    return typeof dataError === 'string' ?
      dataError :
      (dataError.msg || '')
  }

  /* priority-2: submit error */
  if (submitError && !dirtySinceLastSubmit) {
    return submitError
  }

  /* priority-3: error */
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
        <b style={{ textDecoration: 'underline', whiteSpace: 'pre' }}>
          {' '}{`${value}`.length}{' '}
        </b>
        {maxLengthValid && `/ ${maxLength}`}
      </span>
    )
  }

  /* return null otherwise */
  return null
}

const getArrayFieldHelperTextContent = (fieldConfig, fieldArrayRenderProps) => {
  const {
    error, submitError,
    touched, dirtySinceLastSubmit
  } = fieldArrayRenderProps.meta

  /* submitError first */
  let arrayFieldSubmitError = R.propOr(
    undefined, ARRAY_ERROR, submitError
  )
  if (!dirtySinceLastSubmit &&
    arrayFieldSubmitError
  ) {
    return typeof arrayFieldSubmitError === 'string' ?
      arrayFieldSubmitError :
      (arrayFieldSubmitError.msg || 'unknow submit error')
  }

  /* then validate error */
  if (touched && error && RA.isNotArray(error)) {
    return typeof error === 'string' ?
      error :
      (error.msg || 'unknow error')
  }

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
                [MUIComponentDataAttribute]: "FormHelperText",
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
  const { form, name, debug } = fieldConfig

  return (
    <FieldArray
      name={fieldConfig.name}
      isEqual={fieldConfig.isEqual || R.equals}
      render={(fieldArrayRenderProps) => {
        if (debug) {
          console.group(`🏁 [${form}]${name} @ArrayFieldMUIHelperText`)
          console.log('meta', fieldArrayRenderProps.meta)
          console.log('FormHelperTextProps', FormHelperTextProps)
          console.groupEnd()
        }

        return (
          <FFFormControl
            fieldConfig={fieldConfig}
            fieldArrayRenderProps={fieldArrayRenderProps}
            children={
              <FFFormHelperText
                {...R.pick(
                  ['type', 'label', 'form', 'debug'],
                  fieldConfig
                )}
                MUIProps={{
                  FormHelperText: {
                    ...FormHelperTextProps,
                    [MUIComponentDataAttribute]: "FormHelperText",
                    children: getArrayFieldHelperTextContent(
                      fieldConfig,
                      fieldArrayRenderProps
                    )
                  }
                }}
              />
            }
          />
        )
      }}
    />
  )
}

export const renderFFMUIFormLabel = (
  fieldConfig,
  FormLabelProps = {}
) => {
  const inputId = getInputId(fieldConfig)

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
            data-field={getDataFieldAttribute(fieldConfig)}
            htmlFor={inputId}
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
    <FieldArray
      name={fieldConfig.name}
      isEqual={fieldConfig.isEqual || R.equals}
      render={(fieldArrayRenderProps) => (
        <FFFormControl
          fieldConfig={fieldConfig}
          fieldArrayRenderProps={fieldArrayRenderProps}
          children={
            <FormLabel
              {...FormLabelProps}
              data-field={getDataFieldAttribute(fieldConfig)}
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
  ValidateIndicator: (formRenderProps) => {
    return formRenderProps.validating && (
      <Typography variant="body2" color="primary"
        component="span"
        style={{
          display: 'inline-flex',
          alignItems: 'center'
        }}
        {...{
          [MUIComponentDataAttribute]: formSubComponentNames.ValidateIndicator
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
        {...{
          [MUIComponentDataAttribute]: formSubComponentNames.SubmitErrorHelperText
        }}
      />
    ) : null
  },
}

export const createFFFormSubComponents = (formConfig) => ({
  ValidateIndicator: ({ component }) => {
    return (
      <FormSpy
        // subscription={{ validating: true }}
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
