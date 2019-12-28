import * as React from 'react'
import * as R from 'ramda'
import Downshift from 'downshift'

import {
  Typography,
  TextField,
  MenuItem,
  Paper,
  Popper,
  IconButton,
  CircularProgress,
} from '@material-ui/core'
import { Clear } from '@material-ui/icons'

import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import rawAllColors from 'constants/colorNames'

const allColors = rawAllColors.map((color, idx) => ({
  value: color,
  idx,
}))

const INIT = 'INIT'
const FETCHING = 'FETCHING'
const SUCCESSFUL = 'SUCCESSFUL'
const FAILED = 'FAILED'

const fetchColors = s => {
  const filteredColors = allColors.filter(
    R.where({ value: c => c.toLowerCase().includes(s.toLowerCase()) }),
  )

  return new Promise((res, rej) => {
    setTimeout(() => res(filteredColors), 1000)
  })
}

class SingleAsync extends React.Component {
  inputRef = React.createRef()
  input$ = new Subject()

  state = {
    optionsFetchStatus: INIT,
    colorOptions: null,
  }

  resetState = () => {
    this.setState({
      optionsFetchStatus: INIT,
      colorOptions: null,
    })
  }

  onInputValueChange = (inputValue, { type }) => {
    // console.log(type)

    if (
      ![
        Downshift.stateChangeTypes.clickItem,
        Downshift.stateChangeTypes.keyDownEnter,
      ].includes(type)
    ) {
      this.input$.next(inputValue)
    } else {
      this.resetState()
    }

    if (!inputValue) {
      this.resetState()
    }
  }

  componentDidMount() {
    this.input$.pipe(debounceTime(500)).subscribe({
      next: this.fetchColorOptions,
    })
  }

  fetchColorOptions = async searchText => {
    if (!searchText) {
      return
    }

    this.setState(
      R.evolve({
        optionsFetchStatus: () => FETCHING,
        colorOptions: () => null,
      }),
    )

    try {
      const colors = await fetchColors(searchText)

      this.setState(
        R.evolve({
          optionsFetchStatus: () => SUCCESSFUL,
          colorOptions: () => colors,
        }),
      )
    } catch (e) {
      this.setState(
        R.evolve({
          optionsFetchStatus: () => FAILED,
          colorOptions: () => null,
        }),
      )
    }
  }

  render() {
    const { optionsFetchStatus, colorOptions } = this.state
    // const { Sub } = this

    // console.log(this.state)

    return (
      <div style={{ margin: '100px 0' }}>
        <Typography variant="headline" style={{ marginBottom: 20 }}>
          Downshift SingleAsync Example
        </Typography>

        <Typography variant="subheading">
          What is your favorite color?
        </Typography>

        <Downshift
          onInputValueChange={this.onInputValueChange}
          itemToString={item => (item ? `${item.value} (${item.idx})` : '')}
          onOuterClick={this.resetState}
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
              clearSelection,
            } = downshift

            // console.log(downshift.highlightedIndex)

            const fieldError = !Boolean(inputValue)

            const hideMenu =
              optionsFetchStatus === INIT || optionsFetchStatus === FETCHING

            return (
              <div>
                <TextField
                  value={inputValue}
                  label="favorite color"
                  InputProps={{
                    endAdornment:
                      optionsFetchStatus === FETCHING ? (
                        <IconButton disabled>
                          <CircularProgress size={20} />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => clearSelection()}>
                          <Clear />
                        </IconButton>
                      ),
                  }}
                  // eslint-disable-next-line
                  inputProps={getInputProps()}
                  InputLabelProps={getLabelProps()}
                  inputRef={this.inputRef}
                  error={fieldError}
                  helperText={fieldError ? 'required' : null}
                />

                {isOpen && !hideMenu && (
                  <Popper
                    open
                    anchorEl={this.inputRef.current}
                    placement="bottom-start"
                  >
                    <Paper style={{ maxHeight: 300, overflow: 'scroll' }}>
                      {/*  
                          optionsFetchStatus === FETCHING && (
                            <Sub.OptionLoading />
                          )
                        */}
                      {optionsFetchStatus === SUCCESSFUL && (
                        <ul {...getMenuProps()} style={{ paddingLeft: 0 }}>
                          {colorOptions.length > 0 ? (
                            colorOptions.map(
                              ({ value: color, idx }, optionIdx) => (
                                <MenuItem
                                  key={color}
                                  {...getItemProps({
                                    item: { value: color, idx },
                                  })}
                                  selected={optionIdx === highlightedIndex}
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
                              ),
                            )
                          ) : (
                            <MenuItem disabled>No colors found</MenuItem>
                          )}
                        </ul>
                      )}
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

export default SingleAsync
