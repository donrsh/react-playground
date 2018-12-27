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
    label: MUIReactTable-Font;
    font-family: ${theme.typography.fontFamily}
  `,

  Table: {
    root: css`
      label: MUIReactTable-Table;
    `
  },

  TheadGroup: {
    root: css`
      label: MUIReactTable-TheadGroup;
    `
  },

  TheadGroupTr: {
    root: css`
      label: MUIReactTable-TheadGroupTr;
      ${MUIStyles.TableRow}
    `
  },

  TheadGroupTh: {
    root: css`
      .ReactTable .rt-thead && {
        label: MUIReactTable-TheadGroupTh;        
        ${MUIStyles.TableCell}
        justify-content: center;
        font-weight: bold;
      }
    `
  },

  Thead: {
    root: css`
      label: MUIReactTable-Thead;
    `
  },

  TheadTr: {
    root: css`
      label: MUIReactTable-TheadTr;
      ${MUIStyles.TableRow}    
    `
  },

  TheadTh: {
    root: css`
      .ReactTable .rt-thead && {
        label: MUIReactTable-TheadTh;        
        ${MUIStyles.TableCell}
      }
    `
  },

  TheadFilter: {
    root: css`
      label: MUIReactTable-TheadFilter;
    `
  },

  TheadFilterTr: {
    root: css`
      label: MUIReactTable-TheadFilterTr;
      ${MUIStyles.TableRow}    
    `
  },

  TheadFilterTh: {
    root: css`
      .ReactTable .rt-thead && {
        label: MUIReactTable-TheadFilterTh;
        ${MUIStyles.TableCell}
        
        & {
          padding: 4px 24px;
        }

        & input {
          border: none
        }
      }
    `
  },

  Tbody: {
    root: css`
      label: MUIReactTable-Tbody;
    `
  },

  TrGroup: {
    root: css`
      label: MUIReactTable-TrGroup;
    `
  },

  Tr: {
    root: css`
      label: MUIReactTable-Tr;
      ${MUIStyles.TableRow}    
    `
  },

  Th: {
    root: css`
      .ReactTable .rt-tbody && {
        label: MUIReactTable-Th;        
        ${MUIStyles.TableCell}
      }
    `
  },

  Td: {
    root: css`
      .ReactTable .rt-tbody && {
        label: MUIReactTable-Td;
        ${MUIStyles.TableCell}
      }
    `
  },

  Tfoot: {
    root: css`
      label: MUIReactTable-Tfoot;
    `
  },

  TfootTr: {
    root: css`
      label: MUIReactTable-TfootTr;
      ${MUIStyles.TableRow}    
    `
  },

  TfootTd: {
    root: css`
      .ReactTable && {
        label: MUIReactTable-TfootTd;
        ${MUIStyles.TableCell}
      }
    `
  },

  Pagination: {
    root: css`
      label: MUIReactTable-Pagination;
    `
  },

  Loading: {
    root: css`
      label: MUIReactTable-Loading;
    `
  },

  NoData: {
    root: css`
      label: MUIReactTable-NoData;
    `
  },

  Resizer: {
    root: css`
      label: MUIReactTable-Resizer;
    `
  },
})