// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import toast from 'react-hot-toast'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import { ChangeQueryLimit } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'

const schema = yup.object().shape({
  noOfQuries: yup.number().min(1).max(50).required()
})

const defaultValues = {
  noOfQuries: 1
}

const ChangeQueryLimitValidationForm = props => {
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
    const { noOfQuries } = data
    console.log(noOfQuries)
    ChangeQueryLimit(props.selectedQueryForEdit.id, noOfQuries, getAuthToken()).then(res => {
      if (!res.error) {
        toast.success(`Successfully changed query limit of id: ${props.selectedQueryForEdit.id}`, {
          position: 'bottom-right'
        })
        resetField('noOfQuries')
        props.setSelectedQueryForEdit(null)
      } else {
        toast.error(`Failed while changing query limit of id: ${props.selectedQueryForEdit.id}`, {
          position: 'bottom-right'
        })
        resetField('noOfQuries')
      }
    })
  }

  return (
    <Card>
      <CardHeader title={'Change Query Limit (id:' + props.selectedQueryForEdit.id + ')'} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='noOfQuries'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='No Of Quries'
                      onChange={onChange}
                      placeholder='Enter number of quries'
                      type='text'
                      error={Boolean(errors.noOfQuries)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.noOfQuries && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {errors.noOfQuries.type === 'typeError'
                      ? 'No of quries should be number and is required field'
                      : ''}
                    {errors.noOfQuries.type === 'max' ? 'No of queries should be less then or equal to 50' : ''}
                    {errors.noOfQuries.type === 'min' ? 'No of queries should be greater then or equal to 1' : ''}
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
              <Button
                size='large'
                type='button'
                variant='outlined'
                style={{ marginRight: 10 }}
                onClick={() => props.setSelectedQueryForEdit(null)}
              >
                Cancel
              </Button>
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

export default ChangeQueryLimitValidationForm
