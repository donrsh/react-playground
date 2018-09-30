/* 
  Sourece: 
  https://github.com/acdlite/recompose/blob/master/src/packages/recompose/fromRenderProps.js

  Issue:
  https://github.com/acdlite/recompose/issues/702
*/

import React from 'react'
import { setDisplayName, wrapDisplayName } from 'recompose'

export const fromRenderProps = (
  RenderPropsComponent,
  propsMapper,
  renderPropName = 'children'
) => BaseComponent => {
  const baseFactory = React.createFactory(BaseComponent)
  const renderPropsFactory = React.createFactory(RenderPropsComponent)

  const FromRenderProps = ownerProps =>
    renderPropsFactory({
      ...ownerProps,
      [renderPropName]: (...props) =>
        baseFactory({ ...ownerProps, ...propsMapper(...props) }),
    })

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'fromRenderProps'))(
      FromRenderProps
    )
  }

  return FromRenderProps
}
