import * as React from 'react'
import * as R from 'ramda'
import Downshift from 'downshift'

import {
  Typography,
  TextField,
  MenuItem,
  Paper,
  Popper,
  Chip,
} from '@material-ui/core'
import { Clear } from '@material-ui/icons'

import { getLuminance } from 'polished'

import allColors from 'constants/colorNames'

class Muitiple extends React.Component {
  inputRef = React.createRef()
  state = {
    selectedItems: [],
  }

  addSelectedItem = (...items) => {
    this.setState(
      R.evolve({
        selectedItems: R.concat(R.__, items),
      }),
    )
  }

  removeSelectedItem = item => {
    this.setState(
      R.evolve({
        selectedItems: R.reject(R.equals(item)),
      }),
    )
  }

  genSelectedItemDeleteHandler = data => e => {
    this.removeSelectedItem(data)
  }

  render() {
    const { selectedItems } = this.state

    return (
      <div style={{ margin: '100px 0' }}>
        <Typography variant="headline" style={{ marginBottom: 20 }}>
          Downshift Muitiple Example
        </Typography>

        <Typography variant="subheading">
          What are your favorite colors?
        </Typography>

        <Downshift
          selectedItem={null}
          onSelect={(selectedItem, stateAndHelpers) => {
            this.addSelectedItem(selectedItem)
          }}
        >
          {downshift => {
            const {
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
            } = downshift

            // console.log(downshift.highlightedIndex)

            const fieldError = selectedItems.length === 0

            return (
              <div>
                <div
                  style={{
                    width: 300,
                    margin: '0 auto',
                  }}
                >
                  {selectedItems.length === 0 && (
                    <Typography variant="title">
                      Select your favorite colors
                    </Typography>
                  )}
                  {R.pipe(
                    R.map(item => {
                      const contrastColor =
                        getLuminance(item) <= 0.5 ? 'white' : 'black'
                      return (
                        <Chip
                          key={item}
                          label={item}
                          style={{
                            margin: '3px 5px',
                            background: item,
                            color: contrastColor,
                          }}
                          onClick={e => e.stopPropagation()}
                          onDelete={this.genSelectedItemDeleteHandler(item)}
                          deleteIcon={
                            <Clear style={{ color: contrastColor }} />
                          }
                        />
                      )
                    }),
                  )(selectedItems)}
                </div>

                <TextField
                  inputProps={getInputProps()}
                  InputLabelProps={getLabelProps()}
                  inputRef={this.inputRef}
                  error={fieldError}
                  helperText={fieldError ? 'choose at least one color' : null}
                />

                {isOpen && (
                  <Popper
                    open
                    anchorEl={this.inputRef.current}
                    placement="bottom"
                  >
                    <Paper style={{ maxHeight: 300, overflow: 'scroll' }}>
                      <ul {...getMenuProps()} style={{ paddingLeft: 0 }}>
                        {allColors
                          .filter(
                            color =>
                              !selectedItems.includes(color) &&
                              color
                                .toLocaleLowerCase()
                                .includes(inputValue.toLocaleLowerCase()),
                          )
                          .map((color, idx) => (
                            <MenuItem
                              key={color}
                              {...getItemProps({ item: color })}
                              selected={idx === highlightedIndex}
                            >
                              <span
                                style={{
                                  background: color,
                                  width: 30,
                                  height: 30,
                                  marginRight: 15,
                                  display: 'inline-block',
                                }}
                              />
                              <span>{color}</span>
                            </MenuItem>
                          ))}
                      </ul>
                    </Paper>
                  </Popper>
                )}
              </div>
            )
          }}
        </Downshift>
      </div>
    )
  }
}

export default Muitiple
