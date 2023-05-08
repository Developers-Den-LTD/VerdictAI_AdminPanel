// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

import moment from 'moment'

const TableColumns = props => {
  const columns = [
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Search Title',
      field: 'searchTitle',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.searchTitle}
        </Typography>
      )
    }
  ]

  return (
    <Card>
      <CardHeader title='All Abuse Searches' />
      <DataGrid
        autoHeight
        rows={props.row || []}
        columns={columns}
        disableSelectionOnClick
        getRowId={row => row.searchTitle + moment()}
      />
    </Card>
  )
}

export default TableColumns
