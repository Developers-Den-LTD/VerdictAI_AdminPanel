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

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Block_unblock } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import moment from 'moment'

const RowOptions = ({ id }) => {
  // ** State
  const { getAuthToken } = useAuth()

  const handleBlock = () => {
    Block_unblock(getAuthToken(), id).then(res => {
      if (!res.error) {
        toast.success(`${id} ${res.message}`, {
          position: 'bottom-right'
        })
      } else {
        toast.error(`Error Blocking/Unblocking ${id}`, {
          position: 'bottom-right'
        })
      }
    })
  }

  return (
    <>
      <MenuItem onClick={handleBlock} sx={{ '& svg': { mr: 2 } }}>
        <Icon icon='tabler:user-off' fontSize={20} />
        Block\Unblock
      </MenuItem>
    </>
  )
}

const TableColumns = props => {
  const columns = [
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'userName',
      field: 'userName',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.userName}
        </Typography>
      )
    },

    {
      flex: 0.15,
      minWidth: 110,
      field: 'Total Abuse Searches',
      renderCell: params => {
        const b = props.allAbusers.find(o => o.userName == params.row.userName)

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {b ? b.totalAbuseSearches : 'Not known'}
          </Typography>
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => <RowOptions id={params.row.userName} />
    }
  ]

  return (
    <Card>
      <CardHeader title='All Users' />
      <DataGrid
        autoHeight
        rows={props.row || []}
        columns={columns}
        disableSelectionOnClick
        getRowId={row => row.userName + moment()}
      />
    </Card>
  )
}

export default TableColumns
