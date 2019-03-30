import React, { useState, useRef, useEffect } from 'react'
import * as R from 'ramda'
import { css } from 'emotion'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { Typography } from '@material-ui/core';

const useGeometryOf = (el) => {
  const [geometry, setGeometry] = useState(null)

  useEffect(() => {
    if (!(el instanceof HTMLElement)) return

    setGeometry(el.getBoundingClientRect())

    const onResize = () => {
      setGeometry(el.getBoundingClientRect())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [el])

  return geometry
}

const rootDivColor = 'coral'
const childDivColor = 'purple'
const absChildColor = 'lightseagreen'

const cls = {
  Title: css`&& {
    margin-bottom: 20px;
    text-align: center;
  }`,

  Root: css`
    border: 5px solid ${rootDivColor};
    padding: 20px;
    position: relative;
  `,

  Child: css`
    width: 60%;
    border: 5px solid ${childDivColor};
    padding: 20px;
  `,

  AbsoluteChild: css`
    width: 30%;
    position: absolute;
    border: 5px solid ${absChildColor};
    padding: 20px;
    right: 0;
  `,
}

const Styc = {
  GeometryRoot: styled.div`
    margin: 10px 0;
    color: ${R.prop('color')};
    code {
      display: inline-block;
      border: 1px solid ${R.prop('color')};
      background-color: ${ps => transparentize(0.9, R.prop('color', ps))};
      font-weight: bold;
      font-size: 1.25rem;
      margin: 0 10px 10px 0;
      padding: 4px;
      border-radius: 3px;
    }
  `
}

const Sub = {
  Geometry: ({
    geometry: {
      x, y, width, height, top, right, bottom, left
    },
    color
  }) => (
      <Styc.GeometryRoot color={color}>
        <code>x: {x}</code>
        <code>y: {y}</code>
        <code>width: {width}</code>
        <code>height: {height}</code>
        <code>top: {top}</code>
        <code>right: {right}</code>
        <code>bottom: {bottom}</code>
        <code>left: {left}</code>
      </Styc.GeometryRoot>
    )
}

function GeometryExample() {
  const [rootEl, setRootEl] = useState(null)
  const [childEl, setChildEl] = useState(null)
  const [absChildEl, setAbsChildEl] = useState(null)
  const geometryOfRootEl = useGeometryOf(rootEl)
  const geometryOfChildEl = useGeometryOf(childEl)
  const geometryOfAbsChildEl = useGeometryOf(absChildEl)

  return (
    <>
      <Typography variant="h4" className={cls.Title}>
        Resize to see the geometry of elements.<br />
      </Typography>

      <Typography variant="h5" className={cls.Title}>
        <span style={{ color: rootDivColor }}>root div (width = 100%)</span><br />
        <span style={{ color: childDivColor }}>child div (width = 60%)</span><br />
        <span style={{ color: absChildColor }}>absolute-positioned child div (width = 30%)</span><br />
      </Typography>

      <div
        ref={el => setRootEl(el)}
        className={cls.Root}
      >
        {geometryOfRootEl && (
          <Sub.Geometry
            geometry={geometryOfRootEl}
            color={rootDivColor}
          />
        )}

        <div
          ref={el => setChildEl(el)}
          className={cls.Child}
        >
          {geometryOfChildEl && (
            <Sub.Geometry
              geometry={geometryOfChildEl}
              color={childDivColor}
            />
          )}
        </div>

        <div
          ref={el => setAbsChildEl(el)}
          className={cls.AbsoluteChild}
        >
          {geometryOfAbsChildEl && (
            <Sub.Geometry
              geometry={geometryOfAbsChildEl}
              color={absChildColor}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default GeometryExample