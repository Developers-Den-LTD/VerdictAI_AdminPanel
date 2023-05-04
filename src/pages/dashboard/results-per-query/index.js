// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import ChangeResultsPerQueryValidationForm from 'src/views/forms/form-validation/ChangeResultsPerQueryValidationForm'
import ResultsPerQueryTableColumns from 'src/views/table/data-grid/ResultsPerQueryTableColumns'
import { getResultsPerQuery } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const ChangeBrowser = () => {
  const [selectedQueryForEdit, setSelectedQueryForEdit] = useState(null)
  const [AllResults, setAllResults] = useState(null)
  const { getAuthToken } = useAuth()

  useEffect(() => {
    if (!selectedQueryForEdit) {
      getResultsPerQuery(getAuthToken()).then(res => {
        if (!res.error) {
          setAllResults(res.data)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQueryForEdit])

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
          <ResultsPerQueryTableColumns row={AllResults} setSelectedQueryForEdit={setSelectedQueryForEdit} />
        </Grid>
        {selectedQueryForEdit ? (
          <Grid item xs={12}>
            <ChangeResultsPerQueryValidationForm
              selectedQueryForEdit={selectedQueryForEdit}
              setSelectedQueryForEdit={setSelectedQueryForEdit}
            />
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </DatePickerWrapper>
  )
}

export default ChangeBrowser
