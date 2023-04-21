// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import ChangeResultsPerQueryValidationForm from 'src/views/forms/form-validation/ChangeResultsPerQueryValidationForm'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const ChangeBrowser = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <MuiLink>Result Per Query</MuiLink>
            </Typography>
          }
          subtitle={
            <Typography variant='body2'>Change number of result per each query for a certain user type</Typography>
          }
        />
        <Grid item xs={12}>
          <ChangeResultsPerQueryValidationForm />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ChangeBrowser
