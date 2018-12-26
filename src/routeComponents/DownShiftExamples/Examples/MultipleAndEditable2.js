import * as React from 'react'
import * as R from 'ramda'
import Downshift from 'downshift'

import { Typography, TextField, MenuItem, Paper, Popper, Chip } from '@material-ui/core'
import { Clear } from '@material-ui/icons'

import { getLuminance } from 'polished'

import allColors from 'constants/colorNames'

const { useState, useRef } = React

const MultipleAndEditable2 = () => {
  const inputRef = useRef()
  const [selectedItem, setSelectedItem] = useState([])

  const addToSelectedItem = (...items) => {
    setSelectedItem(R.concat(R.__, items))
  }

  const removeFromSelectedItem = (item) => {
    setSelectedItem(R.reject(R.equals(item)))
  }

  const removeLastFromSelectedItem = () => {
    setSelectedItem(R.init)
  }

  return (
    <div style={{ margin: '100px 0' }}>
      <Typography variant='h5'
        style={{ marginBottom: 20 }}
      >
        Downshift Multiple & Editable Example
        <br />
        (with
        {' '}
        <b><code>selectedItem</code></b>
        {' '}
        controlled)
      </Typography>

      <Typography variant='h6'>
        What are your favorite colors?
        </Typography>
      <Typography variant='body1'>
        <em>Hint 1: enter <b><code>space</code></b> to separate items</em>
        <br />
        <em>Hint 2: enter <b><code>backspace</code></b> to delete the last selected item</em>
      </Typography>

      <Downshift
        selectedItem={selectedItem}
        itemToString={() => ''}
        onSelect={(item) => addToSelectedItem(item)}
      >
        {
          (downshift) => {
            const {
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              inputValue,
              isOpen,
              highlightedIndex,
              closeMenu,
            } = downshift

            const fieldError = selectedItem.length === 0

            const startAdornment = (
              <>
                {
                  R.pipe(
                    R.map(item => {
                      const isColor = R.contains(item, allColors)
                      return (
                        <Chip key={item}
                          label={`${item}${isColor ? '' : ' (?)'}`}
                          style={{
                            margin: '3px 5px',
                            ...isColor && {
                              color: getLuminance(item) <= 0.5 ? 'white' : 'black',
                              background: item
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onDelete={(e) => removeFromSelectedItem(item)}
                          deleteIcon={<Clear />}
                        />
                      )
                    })
                  )(selectedItem)
                }
              </>
            )

            const items = allColors
              .filter(color =>
                !selectedItem.includes(color) &&
                color
                  .toLocaleLowerCase()
                  .includes(inputValue.toLocaleLowerCase())
              )

            const isMenuOpen = isOpen && items.length > 0

            const inputProps = {
              ...getInputProps({
                onKeyDown: (e) => {
                  if (
                    e.key === "Backspace" &&
                    !inputValue &&
                    !isMenuOpen
                  ) {
                    removeLastFromSelectedItem()
                  }

                  if (
                    e.key === "Tab" &&
                    inputValue
                  ) {
                    addToSelectedItem(inputValue)
                    closeMenu()
                    e.preventDefault()
                  }
                }
              }),
            }

            return (
              <div style={{
                width: 800,
                margin: '0 auto'
              }}>
                <TextField
                  fullWidth
                  inputProps={inputProps}
                  InputLabelProps={getLabelProps()}
                  // eslint-disable-next-line
                  InputProps={{
                    startAdornment
                  }}
                  inputRef={inputRef}
                  error={fieldError}
                  helperText={fieldError ? 'choose at least one color' : null}
                />

                {
                  <Popper
                    open={isMenuOpen}
                    {...getMenuProps()}
                    anchorEl={inputRef.current}
                    placement='bottom-start'
                  >
                    <Paper style={{ maxHeight: 300, overflow: 'scroll' }}>
                      <ul style={{ paddingLeft: 0 }}>
                        {
                          items
                            .map((color, idx) => (
                              <MenuItem
                                key={color}
                                {...getItemProps({
                                  item: color
                                })}
                                selected={idx === highlightedIndex}
                              >
                                <span style={{
                                  background: color, width: 30, height: 30,
                                  marginRight: 15, display: 'inline-block'
                                }} />
                                <span>{color}</span>
                              </MenuItem>
                            ))
                        }
                      </ul>
                    </Paper>
                  </Popper>
                }

              </div>
            )
          }
        }
      </Downshift>

      <div>
        <pre>
          <b>selectedItem</b> (controlled): {JSON.stringify(selectedItem)}
        </pre>
      </div>
    </div>
  )
}

export default MultipleAndEditable2