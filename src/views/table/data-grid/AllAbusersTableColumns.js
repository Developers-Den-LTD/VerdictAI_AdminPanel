// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer } from '@mui/x-data-grid'

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Import
import { Block_unblock } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import moment from 'moment'
import { useRouter } from 'next/router'

const RowOptions = ({ id, status }) => {
  // ** State
  const { getAuthToken } = useAuth()
  const router = useRouter()

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

  const handleAbuseSearches = () => {
    router.push(`/dashboard/users/abuse-searches?userName=${id}`)
  }

  return (
    <>
      <>
        <MenuItem onClick={() => handleAbuseSearches()} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:user-search' fontSize={20} />
        </MenuItem>
      </>
      <MenuItem onClick={handleBlock} sx={{ '& svg': { mr: 2 } }}>
        <Icon icon='tabler:user-off' fontSize={20} />
        {status ? 'Block' : 'Unblock'}
      </MenuItem>
    </>
  )
}

const TableColumns = props => {
  const [searchText, setSearchText] = useState('')
  const [tableData, setTableData] = useState(props.row)

  const columns = [
    {
      flex: 0.12,
      minWidth: 80,
      headerName: 'Name',
      field: 'name',
      valueGetter: params => params.row.firstName + ' ' + params.row.lastName,
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.firstName} {params.row.lastName}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Email',
      field: 'email',
      valueGetter: params => params.row.userName,
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.userName}
        </Typography>
      )
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'Total Abuse Searches',
      valueGetter: params => {
        const b = props.allAbusers.find(o => o.userName == params.row.userName)

        return b ? b.totalAbuseSearches : '0'
      },
      renderCell: params => {
        const b = props.allAbusers.find(o => o.userName == params.row.userName)

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {b ? b.totalAbuseSearches : 0}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'Status',
      valueGetter: params => {
        const b = props.allAbusers.find(o => o.userName == params.row.userName)

        return params.row.isActive ? 'Active' : 'Blocked'
      },
      renderCell: params => {
        const b = props.allAbusers.find(o => o.userName == params.row.userName)

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {params.row.isActive ? 'Active' : 'Blocked'}
          </Typography>
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => <RowOptions id={params.row.userName} status={params.row.isActive} />
    }
  ]

  const requestSearch = searchValue => {
    const searchRegex = new RegExp(`.*${searchValue}.*`, 'ig')

    const filteredRows = props.row.filter(o => {
      return Object.keys(o).some(k => {
        return searchRegex.test(o[k].toString())
      })
    })
    setTableData(filteredRows)
  }

  const cancelSearch = () => {
    setSearchText('')
    requestSearch(searchText)
  }

  return (
    <Card>
      <CardHeader title='All Users' />
      <DataGrid
        autoHeight
        rows={props.row || []}
        columns={columns}
        disableSelectionOnClick
        getRowId={row => row.userName + moment()}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: searchVal => requestSearch(searchVal),
            onCancelSearch: () => cancelSearch()
          }
        }}
      />
    </Card>
  )
}

export default TableColumns
