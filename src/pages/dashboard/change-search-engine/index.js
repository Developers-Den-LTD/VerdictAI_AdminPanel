// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import ChangeBrowsersValidationForm from 'src/views/forms/form-validation/ChangeBrowsersValidationForm'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const ChangeBrowser = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <MuiLink>Search Engines</MuiLink>
            </Typography>
          }
          subtitle={<Typography variant='body2'>Change the search engine for unregistered users</Typography>}
        />
        <Grid item xs={12}>
          <ChangeBrowsersValidationForm />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ChangeBrowser
