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
import { createAdmin } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const schema = yup.object().shape({
  userName: yup.string().min(5).required(),
  password: yup.string().min(5).required(),
  name: yup.string().min(5).required(),
  isSuperAdmin: yup.boolean()
})

const defaultValues = {
  userName: '',
  name: '',
  password: '',
  isSuperAdmin: false
}

const CreateAdminValidationForm = () => {
  // ** States
  const [state, setState] = useState({
    password: '',
    showPassword: false
  })
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

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

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  //** If there are no validation errors, call the create admin api */
  const onSubmit = data => {
    const { userName, password, name, isSuperAdmin } = data

    return console.log(isSuperAdmin)
    createAdmin(userName, name, password, getAuthToken()).then(res => {
      if (!res.error) {
        toast.success(`Admin added with user name: ${userName}`, {
          position: 'bottom-right'
        })
        resetField('userName')
        resetField('name')
        resetField('password')
      } else {
        toast.error(`Failed adding user: ${userName}`, {
          position: 'bottom-right'
        })
        setError('admin', {
          type: 'manual',
          message: 'Admin with provided username already exists!'
        })
        resetField('userName')
        resetField('name')
        resetField('password')
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
                  name='userName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='User Name'
                      onChange={onChange}
                      placeholder='Enter admin user name'
                      type='text'
                      error={Boolean(errors.userName)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.userName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Name'
                      onChange={onChange}
                      placeholder='Enter admin name'
                      type='text'
                      error={Boolean(errors.name)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Password'
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
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={Boolean(errors.isSuperAdmin)}>
                <FormLabel>Create Super-admin?</FormLabel>
                <Controller
                  name='isSuperAdmin'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      value={value}
                      onChange={onChange}
                      label='Super-admin'
                      sx={errors.isSuperAdmin ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.isSuperAdmin ? { color: 'error.main' } : null} />}
                    />
                  )}
                />
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

export default CreateAdminValidationForm
