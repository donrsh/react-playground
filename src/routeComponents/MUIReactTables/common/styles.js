import { css } from 'emotion'

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
      display: flex;
      align-items: center;

      padding: 4px 56px 4px 24px;

      &:last-child {
        padding-right: 24px;
      }

      &:focus {
        outline: none
      }
    }
  `
}

export default (theme) => ({
  Font: css`
    font-family: ${theme.typography.fontFamily}
  `,

  Table: {
    root: css`
    `
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
      .ReactTable .rt-thead && {
        ${MUIStyles.TableCell}
        justify-content: center;
        font-weight: bold;
      }
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
      .ReactTable .rt-thead && {
        ${MUIStyles.TableCell}
      }
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
      .ReactTable .rt-thead && {
        ${MUIStyles.TableCell}
      }
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
      .ReactTable .rt-tbody && {
        ${MUIStyles.TableCell}
      }
    `
  },

  Td: {
    root: css`
      .ReactTable .rt-tbody && {
        ${MUIStyles.TableCell}
      }
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
})