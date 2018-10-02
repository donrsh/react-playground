import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

const t = x => x

export const alwaysPass = R.always(undefined)

export const isRequired = (value, allValues, props, name) => {
  return value ? undefined : {
    validatedBy: isRequired,
    msg: t('error.required')
  }
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

export const moreThanNChars = (n) => R.ifElse(
  x => `${x}`.length >= n,
  R.always(undefined),
  () => ({
    validatedBy: moreThanNChars,
    msg: t('error.shouldBeMoreThanNChars', { n })
  })
)

export const lessThanNChars = (n) => R.ifElse(
  x => `${x}`.length <= n,
  R.always(undefined),
  () => ({
    validatedBy: lessThanNChars,
    msg: t('error.shouldBeLessThanNChars', { n })
  })
)