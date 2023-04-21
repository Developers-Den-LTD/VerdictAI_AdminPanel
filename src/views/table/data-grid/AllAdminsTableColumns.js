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

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  // ** State

  const handleDelete = () => {
    // dispatch(deleteUser(id))
  }

  return (
    <>
      <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
        <Icon icon='tabler:trash' fontSize={20} />
        Delete
      </MenuItem>
    </>
  )
}

const TableColumns = props => {
  // ** States
  const [hideNameColumn, setHideNameColumn] = useState(false)

  const columns = [
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'userName',
      field: 'userName',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.adminUserName}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'Name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.adminName}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => <RowOptions id={params.row.adminName} />
    }
  ]

  return (
    <Card>
      <CardHeader
        title='All Admins'
        action={
          <div>
            <Link href='/dashboard/admins/add-new-admin'>
              <Button size='small' variant='contained'>
                Add New Admin
              </Button>
            </Link>
          </div>
        }
      />
      <DataGrid
        autoHeight
        rows={props.row || []}
        columns={columns}
        disableSelectionOnClick
        getRowId={row => row.adminUserName}
      />
    </Card>
  )
}

export default TableColumns
