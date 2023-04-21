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

// ** Third Party Imports
import toast from 'react-hot-toast'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { changeBrowser, createAdmin, getAllBrowsers } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'

const schema = yup.object().shape({
  browser: yup.string().required()
})

const defaultValues = {
  browser: ''
}

const ChangeBrowsersValidationForm = () => {
  //** get all browsers */
  const [allBrowsers, setAllBrowsers] = useState([])

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
    const { browser } = data
    console.log(browser)
    changeBrowser(browser, getAuthToken()).then(res => {
      let browserObj = allBrowsers.find(o => o.browserId == browser)
      if (!res.error) {
        toast.success(`Successfully Changed browser for unregistered users to: ${browserObj.browserName}`, {
          position: 'bottom-right'
        })
        resetField('browser')
      } else {
        toast.success(`Failed while Changing browser for unregistered users to: ${browserObj.browserName}`, {
          position: 'bottom-right'
        })
        resetField('browser')
      }
    })
  }

  useEffect(() => {
    getAllBrowsers(getAuthToken()).then(res => {
      setAllBrowsers(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader title='Browsers' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.browser)}
                  htmlFor='validation-basic-select'
                >
                  Browsers
                </InputLabel>
                <Controller
                  name='browser'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Browsers'
                      onChange={onChange}
                      error={Boolean(errors.browser)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                    >
                      {allBrowsers.map(item => {
                        return (
                          <MenuItem value={item.browserId} key={item.browserId}>
                            {item.browserName}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )}
                />
                {errors.browser && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
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

export default ChangeBrowsersValidationForm
