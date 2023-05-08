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
import TableColumns from 'src/views/table/data-grid/AbuseSearchesTableColumns'
import { GetAllAbuseSearches, GetAllUsers, getAllAbusers } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'

import { useRouter } from 'next/router'

const DataGrid = () => {
  const router = useRouter()

  const [allSearches, setAllSearches] = useState(null)
  const { getAuthToken } = useAuth()

  useEffect(() => {
    if (router.query.userName) {
      GetAllAbuseSearches(getAuthToken(), router.query.userName).then(res => {
        if (!res.error) {
          console.log('wert', res.data)
          setAllSearches(res.data)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.userName])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <MuiLink>Abuse Searches for {router.query.userName}</MuiLink>
          </Typography>
        }
        subtitle={<Typography variant='body2'>This page shows abuse searches that a user have done</Typography>}
      />
      <Grid item xs={12}>
        <TableColumns row={allSearches} />
      </Grid>
    </Grid>
  )
}

export default DataGrid
