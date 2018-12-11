import * as React from 'react'
import * as R from 'ramda'
import Downshift from 'downshift'

import { Typography, TextField, MenuItem, Paper, Popper, Chip } from '@material-ui/core'
import { Clear } from '@material-ui/icons'

import { getLuminance } from 'polished'

import allColors from 'constants/colorNames'

class MultipleAndEditable extends React.Component {
  inputRef = React.createRef()
  state = {
    selectedItems: [],
    inputValue: ''
  }

  addSelectedItem = (...items) => {
    this.setState(R.evolve({
      selectedItems: R.concat(R.__, items)
    }))
  }

  removeSelectedItem = (item) => {
    this.setState(R.evolve({
      selectedItems: R.reject(R.equals(item))
    }))
  }

  removeLastItem = () => {
    this.setState(R.evolve({
      selectedItems: R.init
    }))
  }

  genSelectedItemDeleteHandler = (data) => (e) => {
    this.removeSelectedItem(data)
  }

  render() {
    const { selectedItems, inputValue } = this.state

    return (
      <div style={{ margin: '100px 0' }}>
        <Typography variant='h5'
          style={{ marginBottom: 20 }}
        >
          Downshift MultipleAndEditable Example
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
          inputValue={inputValue}
          onChange={(selectedItem) => {
            this.setState({
              inputValue: selectedItem
            })
          }}
          onStateChange={(changes, stateAndHelpers) => {
            switch (changes.type) {
              case Downshift.stateChangeTypes.changeInput:
                this.setState(R.evolve({
                  inputValue: R.always(changes.inputValue)
                }))
                break

              case Downshift.stateChangeTypes.clickItem:
                this.setState(R.evolve({
                  inputValue: R.always(changes.selectedItem)
                }))
                break

              default:
                return changes
            }
          }}
        >
          {
            (downshift) => {
              const {
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                closeMenu
              } = downshift

              const fieldError = selectedItems.length === 0

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
                            onDelete={this.genSelectedItemDeleteHandler(item)}
                            deleteIcon={<Clear />}
                          />
                        )
                      })
                    )(selectedItems)
                  }
                </>
              )

              const items = allColors
                .filter(color =>
                  !selectedItems.includes(color) &&
                  color
                    .toLocaleLowerCase()
                    .includes(inputValue.toLocaleLowerCase())
                )

              const isMenuOpen = isOpen && items.length > 0

              const inputProps = {
                ...getInputProps({
                  onKeyDown: (e) => {
                    if (
                      e.keyCode === 8 /* backspace */ &&
                      !inputValue &&
                      !isMenuOpen
                    ) {
                      this.removeLastItem()
                    }

                    if (
                      e.keyCode === 32 /* space */ &&
                      inputValue
                    ) {
                      this.addSelectedItem(inputValue)
                      this.setState({ inputValue: '' }, closeMenu)
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
                    inputRef={this.inputRef}
                    error={fieldError}
                    helperText={fieldError ? 'choose at least one color' : null}
                  />

                  {
                    <Popper
                      open={isMenuOpen}
                      {...getMenuProps()}
                      anchorEl={this.inputRef.current}
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
      </div>
    )
  }
}

export default MultipleAndEditable