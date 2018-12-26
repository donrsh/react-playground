import * as React from 'react'
import { withTheme, CircularProgress } from '@material-ui/core'

import getSubcomponentClasses from './styles'
import tableComponents from './components'

class MUIReactTable extends React.Component {
  get subcomponentClasses() {
    return getSubcomponentClasses(this.props.theme)
  }

  getReactTableProps = () => {
    const {
      TheadGroupTr, TheadGroupTh,
      TheadTr, TheadTh,
      TheadFilterTr, TheadFilterTh,
      Tr, Th, Td
    } = this.subcomponentClasses

    return {
      loadingText: <CircularProgress />,
      PaginationComponent: tableComponents.Pagination,

      getTheadGroupTrProps: () => ({
        className: TheadGroupTr.root
      }),
      getTheadGroupThProps: () => ({
        className: TheadGroupTh.root
      }),
      getTheadTrProps: () => ({
        className: TheadTr.root
      }),
      getTheadThProps: () => ({
        className: TheadTh.root
      }),
      getTheadFilterTrProps: () => ({
        className: TheadFilterTr.root
      }),
      getTheadFilterThProps: () => ({
        className: TheadFilterTh.root
      }),
      getTrProps: () => ({ className: Tr.root }),
      getThProps: () => ({ className: Th.root }),
      getTdProps: () => ({ className: Td.root })
    }
  }

  render() {
    const { subcomponentClasses } = this
    const { children } = this.props

    if (typeof children !== 'function') {
      throw new Error(`Children of MUIReactTable should be a function returning ReactTable element.`)
    }

    const renderedChildren = children({
      ReactTableProps: this.getReactTableProps(),
      subcomponentClasses,
      fontClass: subcomponentClasses.Font
    })

    return renderedChildren
  }
}

// export default MUIReactTable
export default withTheme()(MUIReactTable)