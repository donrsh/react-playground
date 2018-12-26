/*
  Pagination of React-Table
  https://github.com/react-tools/react-table/blob/master/src/pagination.js
*/

import * as React from 'react'
import { css, cx } from 'emotion'

import { IconButton, TextField, Typography, MenuItem } from '@material-ui/core'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const cls = {
  Pagination: css`
    && {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 8px 24px 8px 8px;
    }
  `,

  Toolbar: css`
    display: inline-flex;
    align-items: center;
  `,

  Caption: css`
    && {
      display: inline;
    }
  `,

  PageNoTextFieldWrapper: css`
    & {
      display: inline-flex;
      align-items: center;
      padding: 0 8px;
    }
  `,

  PageNoTextField: css`
    && {
      width: 80px;
      margin: 0 8px;
    }
  `,

  PageNoInput: css`
    text-align: center;
  `,

  PageSizeSelectWrapper: css`
    & {
      margin-right: 48px;
      display: inline-flex;
      align-items: center;
    }
  `,

  PageSizeSelect: css`
    && {
      width: 60px;
      margin-left: 8px;
    }
  `
}

export default class Pagination extends React.Component {
  constructor(props) {
    super()

    this.getSafePage = this.getSafePage.bind(this)
    this.changePage = this.changePage.bind(this)
    this.applyPage = this.applyPage.bind(this)

    this.state = {
      page: props.page,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.setState({ page: nextProps.page })
    }
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1)
  }

  changePage(page) {
    page = this.getSafePage(page)
    this.setState({ page })
    if (this.props.page !== page) {
      this.props.onPageChange(page)
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault()
    }
    const page = this.state.page
    this.changePage(page === '' ? this.props.page : page)
  }

  Sub = {
    PageInput: () => {
      const { pages } = this.props

      return (
        <div className={cls.PageNoTextFieldWrapper}>
          <Typography variant="caption" className={cls.Caption}>
            Page
          </Typography>
          <TextField
            className={cls.PageNoTextField}
            variant="outlined"
            aria-label={this.props.pageJumpText}
            type={this.state.page === '' ? 'text' : 'number'}
            onChange={e => {
              const val = e.target.value
              const page = val - 1
              if (val === '') {
                return this.setState({ page: val })
              }
              this.setState({ page: this.getSafePage(page) })
            }}
            value={this.state.page === '' ? '' : this.state.page + 1}
            onBlur={this.applyPage}
            onKeyPress={e => {
              if (e.which === 13 || e.keyCode === 13) {
                this.applyPage()
              }
            }}
            inputProps={{
              className: cls.PageNoInput
            }}
          />
          <Typography variant="caption" className={cls.Caption}>
            of <b>{pages}</b>
          </Typography>
        </div>
      )
    },

    PageSizeSelect: () => {
      const { pageSize, pageSizeOptions, onPageSizeChange } = this.props
      return (
        <div className={cls.PageSizeSelectWrapper}>
          <Typography variant="caption" className={cls.Caption}>
            Size per page:
          </Typography>
          <TextField
            select
            InputLabelProps={{ shrink: true }}
            className={cls.PageSizeSelect}
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )
    }
  }

  render() {
    const { Sub } = this
    const {
      // Computed
      pages,
      // Props
      page,
      canPrevious,
      canNext,
      className,
    } = this.props

    return (
      <div className={cx(className, cls.Pagination, '-pagination')} style={this.props.style}>
        <div className={cls.Toolbar}>
          <Sub.PageSizeSelect />

          <IconButton
            onClick={() => this.changePage(0)}
            disabled={!canPrevious}
            aria-label="First Page"
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              if (!canPrevious) return
              this.changePage(page - 1)
            }}
            disabled={!canPrevious}
            aria-label="Previous Page"
          >
            <KeyboardArrowLeft />
          </IconButton>

          <Sub.PageInput />

          <IconButton
            onClick={() => {
              if (!canNext) return
              this.changePage(page + 1)
            }}
            disabled={!canNext}
            aria-label="Next Page"
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            onClick={() => this.changePage(pages)}
            disabled={!canNext}
            aria-label="Last Page"
          >
            <LastPageIcon />
          </IconButton>

        </div>
      </div>
    )
  }
}

