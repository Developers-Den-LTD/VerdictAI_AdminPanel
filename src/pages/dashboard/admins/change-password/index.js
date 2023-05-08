// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import ChangePasswordValidationForm from 'src/views/forms/form-validation/ChangePasswordValidationForm'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const ChangePassword = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <MuiLink>Change Admin Password</MuiLink>
            </Typography>
          }
          subtitle={<Typography variant='body2'>Please fill out the details to change password for admin</Typography>}
        />
        <Grid item xs={12}>
          <ChangePasswordValidationForm />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ChangePassword
