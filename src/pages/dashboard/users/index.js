// ** React Imports
import { useEffect, useState } from 'react'

//** Next imports */
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableColumns from 'src/views/table/data-grid/AllAbusersTableColumns'
import { GetAllUsers, getAllAbusers } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'

const DataGrid = () => {
  const [allAbusers, setAllAbusers] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const { getAuthToken } = useAuth()

  useEffect(() => {
    getAllAbusers(getAuthToken()).then(res => {
      if (!res.error) {
        setAllAbusers(res.data)
      }
    })
    GetAllUsers(getAuthToken()).then(res => {
      if (!res.error) {
        console.log(res.data)
        setAllUsers(res.data)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <MuiLink>Users</MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            This page shows all the Users. You can perform block/Unblock functionality on them
          </Typography>
        }
      />
      <Grid item xs={12}>
        <TableColumns row={allUsers} allAbusers={allAbusers} />
      </Grid>
    </Grid>
  )
}

export default DataGrid
