import { css } from 'emotion'
import { styles as TableCellStyles } from '@material-ui/core/TableCell'

import theme from './MUITheme'

console.log(theme)
console.log(TableCellStyles)

const MUIStyles = {
  // https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableRow/TableRow.js#L21
  TableRow: css`
    & {
      height: 48px;
      vertical-align: middle;
      outline: none;
    }
  `,

  // https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/TableCell/TableCell.js
  TableCell: css`
    & {
      text-align: left;
      padding: 4px 56px 4px 24px;
      display: flex;
      align-items: center;

      &:last-child {
        padding-right: 24px;
      }

      &:focus {
        outline: none
      }
    }
  `
}

export default {
  Table: {
    root: css``
  },

  TheadGroup: {
    root: css``
  },

  TheadGroupTr: {
    root: css`
      ${MUIStyles.TableRow}
    `
  },

  TheadGroupTh: {
    root: css`
      ${MUIStyles.TableCell}
      justify-content: center;
    `
  },

  Thead: {
    root: css``
  },

  TheadTr: {
    root: css`
      ${MUIStyles.TableRow}    
    `
  },

  TheadTh: {
    root: css`
      ${MUIStyles.TableCell}
    `
  },

  TheadFilter: {
    root: css``
  },

  TheadFilterTr: {
    root: css`
      ${MUIStyles.TableRow}    
    `
  },

  TheadFilterTh: {
    root: css`
      ${MUIStyles.TableCell}
    `
  },

  Tbody: {
    root: css``
  },

  TrGroup: {
    root: css``
  },

  Tr: {
    root: css`
      ${MUIStyles.TableRow}    
    `
  },

  Th: {
    root: css`
      ${MUIStyles.TableCell}
    `
  },

  Td: {
    root: css`
      ${MUIStyles.TableCell}
    `
  },

  Pagination: {
    root: css``
  },

  Loading: {
    root: css``
  },

  NoData: {
    root: css``
  },

  Resizer: {
    root: css``
  },
}