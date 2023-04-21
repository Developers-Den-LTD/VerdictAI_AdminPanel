import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import ChangeQueryLimitValidationForm from 'src/views/forms/form-validation/ChangeQueryLimitValidationForm'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import QueryLimitsTableColumns from 'src/views/table/data-grid/QueryLimitsTableColumns'
import { useAuth } from 'src/hooks/useAuth'
import { getAllQueryLimits } from 'Client/request'

const QueryLimits = () => {
  const [allQueryLimits, setAllQueryLimits] = useState(null)
  const [selectedQueryForEdit, setSelectedQueryForEdit] = useState(null)
  const { getAuthToken } = useAuth()

  useEffect(() => {
    if (!selectedQueryForEdit) {
      getAllQueryLimits(getAuthToken()).then(res => {
        if (!res.error) {
          setAllQueryLimits(res.data)
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
              <MuiLink>Query Limits</MuiLink>
            </Typography>
          }
          subtitle={<Typography variant='body2'>Change query limits for a certain id</Typography>}
        />
        <Grid item xs={12}>
          <QueryLimitsTableColumns
            row={allQueryLimits}
            setSelectedQueryForEdit={setSelectedQueryForEdit}
            selectedQueryForEdit={selectedQueryForEdit}
          />
        </Grid>
        {selectedQueryForEdit ? (
          <Grid item xs={12}>
            <ChangeQueryLimitValidationForm
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

export default QueryLimits
