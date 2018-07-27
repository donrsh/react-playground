import * as React from 'react'
import Downshift from 'downshift'

import { Typography, TextField, MenuItem, Paper, Popper, IconButton } from '@material-ui/core'
import { Clear } from '@material-ui/icons'

import allColors from 'constants/colorNames'

class Basic extends React.Component {
  inputRef = React.createRef()

  render () {
    return (
      <div style={{margin: '100px 0'}}>
        <Typography variant='headline'
          style={{ marginBottom: 20 }}
        >
          Downshift Basic Example
        </Typography>
        
        <Typography variant='subheading'>
          What is your favorite color?
        </Typography>

        <Downshift
          
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
                clearSelection,
              } = downshift

              // console.log(downshift)

              const fieldError = !Boolean(inputValue)

              return (
                <div>
                  <TextField
                    value={inputValue}
                    label='favorite color'
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => clearSelection()}
                        >
                          <Clear />
                        </IconButton>
                      )
                    }}
                    // eslint-disable-next-line
                    inputProps={getInputProps()}
                    InputLabelProps={getLabelProps()}
                    inputRef={this.inputRef}
                    error={fieldError}
                    helperText={fieldError ? 'required' : null}
                  />

                  { isOpen &&
                    <Popper open 
                      anchorEl={this.inputRef.current}
                      placement='bottom-start'
                    >
                      <Paper style={{ maxHeight: 300, overflow: 'scroll' }}>
                        <ul 
                          {...getMenuProps()} 
                          style={{paddingLeft: 0}}
                        >
                          {
                            allColors
                            .filter(color => color.toLowerCase().includes(inputValue.toLowerCase()))
                            .map((color, idx) => (
                              <MenuItem 
                                key={color} 
                                {...getItemProps({item: color})}
                                selected={idx === highlightedIndex}
                              >
                                <span style={{ 
                                  background: color, width: 30, height: 30, 
                                  marginRight: 15, display: 'inline-block'
                                }}/>
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

export default Basic