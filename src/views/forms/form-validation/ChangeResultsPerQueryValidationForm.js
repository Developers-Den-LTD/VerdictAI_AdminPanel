// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import toast from 'react-hot-toast'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ChangeResultsPerQuery, changeBrowser, createAdmin, getAllBrowsers, getAllUserTypes } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'

const schema = yup.object().shape({
  userType: yup.string().required(),
  results: yup.number().min(5).max(15).required()
})

const defaultValues = {
  userType: '',
  results: 5
}

const ChangeResultsPerQueryValidationForm = () => {
  //** get all browsers */
  const [allUserTypes, setAllUserTypes] = useState([])

  //** Get token from auth */
  const { getAuthToken } = useAuth()

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onBlur', resolver: yupResolver(schema) })

  //** If there are no validation errors, call the create admin api */
  const onSubmit = data => {
    const { userType, results } = data
    ChangeResultsPerQuery(userType, results, getAuthToken()).then(res => {
      let userTypeObj = allUserTypes.find(o => o.userTypeId == userType)
      if (!res.error) {
        toast.success(`Successfully changed number of result for user type: ${userTypeObj.userTypeName}`, {
          position: 'bottom-right'
        })
        resetField('userType')
        resetField('results')
      } else {
        toast.error(`Failed while changing number of result for user type: ${userTypeObj.userTypeName}`, {
          position: 'bottom-right'
        })
        resetField('userType')
        resetField('results')
      }
    })
  }

  useEffect(() => {
    getAllUserTypes(getAuthToken()).then(res => {
      setAllUserTypes(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader title='Result per query' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.userType)}
                  htmlFor='validation-basic-select'
                >
                  User Types
                </InputLabel>
                <Controller
                  name='userType'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='User Type'
                      onChange={onChange}
                      error={Boolean(errors.userType)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {allUserTypes.map(item => {
                        return (
                          <MenuItem value={item.userTypeId} key={item.userTypeId}>
                            {item.userTypeName}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )}
                />
                {errors.userType && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='results'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='No of Results'
                      onChange={onChange}
                      placeholder='Enter number of results'
                      type='text'
                      error={Boolean(errors.results)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.results && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {errors.results.type === 'typeError'
                      ? 'No of results should be a number and is a required field'
                      : 'This field is required'}
                    {errors.results.type === 'max' ? 'No of results should be less then or equal to 15' : ''}
                    {errors.results.type === 'min' ? 'No of results should be greater then or equal to 5' : ''}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {errors.admin && (
                <FormHelperText sx={{ color: 'error.main', fontSize: 14, marginBottom: 2 }} id=''>
                  {errors.admin.message}
                </FormHelperText>
              )}
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangeResultsPerQueryValidationForm
