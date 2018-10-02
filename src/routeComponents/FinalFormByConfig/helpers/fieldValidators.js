import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

const t = x => x

export const pipeValidatorsAndGetHead = (...validators) =>
  (...valueArgs) => {
    return R.pipe(
      (...x) => R.map(validator => validator(...x), validators),
      RA.compact,
      R.head
    )(...valueArgs)
  }

export const pipeValidatorsAndGetAll = (...validators) =>
  (...valueArgs) => {
    return R.pipe(
      R.converge(R.identity, validators),
      RA.compact,
    )(...valueArgs)
  }

export const alwaysPass = R.always(undefined)

export const isRequired = (value, allValues, props, name) => {
  return value ? undefined : {
    validatedBy: isRequired,
    msg: t('error.required')
  }
}

export const isRequiredForMultipleSelect = (value, allValues, props, name) => {
  return (RA.isEmptyArray(value) || RA.isNilOrEmpty(value)) ? {
    validatedBy: isRequiredForMultipleSelect,
    msg: t('error.isRequiredForMultipleSelect')
  } : undefined
}

export const isNumber = R.pipe(
  Number,
  R.ifElse(
    R.allPass([RA.isNumber, RA.isNotNaN]),
    R.always(undefined),
    () => ({
      validatedBy: isNumber,
      msg: t('error.shouldBeANumber')
    })
  )
)

export const isPositiveInteger = R.pipe(
  Number,
  R.ifElse(
    R.allPass([RA.isPositive, RA.isInteger]),
    R.always(undefined),
    () => ({
      validatedBy: isPositiveInteger,
      msg: t('error.shouldBeAnInteger')
    })
  )
)

export const isPositiveNumber = R.pipe(
  Number,
  R.ifElse(
    RA.isPositive,
    R.always(undefined),
    () => ({
      validatedBy: isPositiveNumber,
      msg: t('error.shouldBeAPositiveNumber')
    })
  )
)

export const isNonNegative = R.pipe(
  Number,
  R.ifElse(
    RA.isNonNegative,
    R.always(undefined),
    () => ({
      validatedBy: isNonNegative,
      msg: t('error.shouldBeANonNegativeNumber')
    })
  )
)

export const isGreaterThan = (smaller) => R.pipe(
  Number,
  R.ifElse(
    R.gt(R.__, smaller),
    R.always(undefined),
    () => ({
      validatedBy: isGreaterThan,
      msg: t('error.shouldBeGT', { n: smaller })
    })
  )
)

export const isGreaterThanOrEqualTo = (smaller) => R.pipe(
  Number,
  R.ifElse(
    R.gte(R.__, smaller),
    R.always(undefined),
    () => ({
      validatedBy: isGreaterThanOrEqualTo,
      msg: t('error.shouldBeGTE', { n: smaller })
    })
  )
)

export const isLessThan = (larger) => R.pipe(
  Number,
  R.ifElse(
    R.gt(larger),
    R.always(undefined),
    () => ({
      validatedBy: isLessThan,
      msg: t('error.shouldBeLT', { n: larger })
    })
  )
)

export const isLessThanOrEqualTo = (larger) => R.pipe(
  Number,
  R.ifElse(
    R.gte(larger),
    R.always(undefined),
    () => ({
      validatedBy: isLessThanOrEqualTo,
      msg: t('error.shouldBeLTE', { n: larger })
    })
  )
)

export const isMoreThanNChars = (n) => R.ifElse(
  x => `${x}`.length >= n,
  R.always(undefined),
  () => ({
    validatedBy: isMoreThanNChars,
    msg: t('error.shouldBeMoreThanNChars', { n })
  })
)

export const isLessThanNChars = (n) => R.ifElse(
  x => `${x}`.length <= n,
  R.always(undefined),
  () => ({
    validatedBy: isMoreThanNChars,
    msg: t('error.shouldBeLessThanNChars', { n })
  })
)