// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableColumns from 'src/views/table/data-grid/TableColumns'

const DataGrid = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <MuiLink target='_blank'>Admins</MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            This page shows all the admins in the system. You can perform crud functionality and all other things as
            well
          </Typography>
        }
      />
      <Grid item xs={12}>
        <TableColumns />
      </Grid>
    </Grid>
  )
}

export default DataGrid
