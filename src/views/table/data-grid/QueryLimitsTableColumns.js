// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const QueryLimitsTableColumns = props => {
  // ** States

  const RowOptions = ({ id, value }) => {
    const handleEdit = () => {
      props.setSelectedQueryForEdit({
        id,
        value
      })
    }

    return (
      <>
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
      </>
    )
  }

  const columns = [
    {
      flex: 0.175,
      minWidth: 120,
      field: 'Id',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.limitId}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'Time In String',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.timeInString}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'Time In MilliSeconds',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.timeInMilliSeconds}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'No of Quries',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.noOfQueries}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => <RowOptions id={params.row.limitId} value={params.row.noOfQueries} />
    }
  ]

  return (
    <Card>
      <CardHeader title='All Queries limits' />
      <DataGrid
        autoHeight
        rows={props.row || []}
        columns={columns}
        disableSelectionOnClick
        getRowId={row => row.limitId}
      />
    </Card>
  )
}

export default QueryLimitsTableColumns
