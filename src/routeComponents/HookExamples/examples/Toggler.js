import * as React from 'react'
import { useState } from 'react'

import {
  Typography, Switch, Button, Divider,
  Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core'

const useToggler = ({
  isOpen: initialIsOpen = false,
  subState: initialSubState = null
} = {}) => {
  const [{ isOpen, subState }, setToggler] = useState({
    isOpen: initialIsOpen, subState: initialSubState
  })

  return {
    isOpen,
    subState,
    open: (subState) => setToggler({
      isOpen: true, subState
    }),
    close: (subState) => setToggler({
      isOpen: false, subState
    }),
    toggle: (subState) => setToggler({
      isOpen: !isOpen, subState
    }),
    setToggler
  }
}

function TogglerExample() {
  const Toggler1 = useToggler()
  const Toggler2 = useToggler({ subState: 0 })

  return (
    <div style={{ margin: '20px auto', width: 800 }}>
      <Typography variant='h5' style={{ marginBottom: 20 }}>
        Toggler
      </Typography>

      <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '25%' }} >name</TableCell>
            <TableCell style={{ width: '25%' }} >sub state</TableCell>
            <TableCell style={{ width: '50%' }} ></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              Basic
            </TableCell>
            <TableCell>
              <pre>{Toggler1.subState}</pre>
            </TableCell>
            <TableCell>
              <Switch
                checked={Toggler1.isOpen}
                onChange={e => Toggler1.toggle()}
              />
              <Button
                onClick={e => Toggler1.open()} color="primary"
              >
                open
              </Button>
              <Button
                onClick={e => Toggler1.close()} color="primary"
              >
                close
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              With sub state
              <Divider style={{ margin: '5px 0' }}/>
              This toggler has a counter substate. While toggled/opened/closed, the counter would increase.
            </TableCell>
            <TableCell>
              <pre>{Toggler2.subState}</pre>
            </TableCell>
            <TableCell>
              <Switch
                checked={Toggler2.isOpen}
                onChange={e => Toggler2.toggle(Toggler2.subState + 1)}
              />
              <Button
                onClick={e => Toggler2.open(Toggler2.subState + 1)} color="primary"
              >
                open + 1
              </Button>
              <Button
                onClick={e => Toggler2.close(Toggler2.subState + 1)} color="primary"
              >
                close + 1
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>
  )
}

export default TogglerExample