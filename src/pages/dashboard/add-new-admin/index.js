// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import FormValidationBasicAdmin from 'src/views/forms/form-validation/FormValidationBasicAdmin'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const AddNewAdmin = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <MuiLink>Create A New Admin</MuiLink>
            </Typography>
          }
          subtitle={<Typography variant='body2'>Please fill out the details for admin</Typography>}
        />
        <Grid item xs={12}>
          <FormValidationBasicAdmin />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default AddNewAdmin
