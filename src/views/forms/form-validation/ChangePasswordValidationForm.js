// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import toast from 'react-hot-toast'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ChangeAdminPassword, createAdmin } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'

import { useRouter } from 'next/router'

const schema = yup.object().shape({
  current_password: yup.string().min(5).required(),
  new_password: yup.string().min(5).required()
})

const defaultValues = {
  current_password: '',
  new_password: ''
}

const ChangePasswordValidationForm = () => {
  // ** States
  const [state, setState] = useState({
    password: '',
    showPassword: false
  })
  const { user } = useAuth()

  //** Get token from auth */
  const { getAuthToken } = useAuth()
  const router = useRouter()

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onBlur', resolver: yupResolver(schema) })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  //** If there are no validation errors, call the create admin api */
  const onSubmit = data => {
    const { current_password, new_password } = data
    const userName = user.userName
    console.log(userName)
    ChangeAdminPassword(userName, current_password, new_password).then(res => {
      if (!res.error) {
        toast.success(`Admin password Successfully changed with user name: ${userName}`, {
          position: 'bottom-right'
        })
        resetField('current_password')
        resetField('new_password')
      } else {
        toast.error(`Failed changing password: ${userName}`, {
          position: 'bottom-right'
        })
        setError('admin', {
          type: 'manual',
          message: 'Current password or new password validation is wrong!'
        })
        resetField('current_password')
        resetField('new_password')
      }
    })
  }

  return (
    <Card>
      <CardHeader title='Admin Details' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='current_password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Current Password'
                      onChange={onChange}
                      placeholder='Enter Current Password'
                      type='password'
                      error={Boolean(errors.name)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.current_password && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.new_password)}>
                  New Password
                </InputLabel>
                <Controller
                  name='new_password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='New Password'
                      onChange={onChange}
                      id='validation-basic-password'
                      error={Boolean(errors.password)}
                      type={state.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.new_password && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                    This field is required
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

export default ChangePasswordValidationForm
