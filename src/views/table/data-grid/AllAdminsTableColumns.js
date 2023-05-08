// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
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
import { DeleteAdmin } from 'Client/request'
import { admin_signin } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

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

const RowOptions = ({ id, newAdmin }) => {
  // ** State
  const { getAuthToken } = useAuth()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    DeleteAdmin(getAuthToken(), id).then(res => {
      if (!res.error) {
        newAdmin(true)
        toast.success(`Successfully Deleted admin ${id}`, {
          position: 'bottom-right'
        })
      } else {
        toast.error(`Error Deleting admin ${id}`, {
          position: 'bottom-right'
        })
      }
    })
  }

  return (
    <>
      <MenuItem onClick={handleClickOpen} sx={{ '& svg': { mr: 2 } }}>
        <Icon icon='tabler:trash' fontSize={20} />
        Delete
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this admin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const TableColumns = props => {
  // ** States
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [isDeleteAdmin, setIsDeleteAdmin] = useState(false)
  const { user } = useAuth()

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
    }
  ]

  const super_columns = [
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
      renderCell: params => <RowOptions id={params.row.adminUserName} newAdmin={props.newAdmin} />
    }
  ]

  return (
    <>
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
          columns={user.role === 'superadmin' ? super_columns : columns}
          disableSelectionOnClick
          getRowId={row => row.adminUserName}
        />
      </Card>
    </>
  )
}

export default TableColumns
