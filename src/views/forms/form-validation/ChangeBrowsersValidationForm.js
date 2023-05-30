// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import toast from 'react-hot-toast'

import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { changeBrowser, createAdmin, getAllBrowsers, getDefualtBrowser } from 'Client/request'
import { useAuth } from 'src/hooks/useAuth'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'

const ChangeBrowsersValidationForm = () => {
  //** get all browsers */
  const [allBrowsers, setAllBrowsers] = useState([])
  const [defualtBrowser, setDefualtBrowser] = useState(null)

  //** Get token from auth */
  const { getAuthToken } = useAuth()

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  //** If there are no validation errors, call the create admin api */
  const onSubmit = e => {
    e.preventDefault()
    var browserIds = []
    var browserStatus = []
    allBrowsers.map(browser => {
      browserIds.push(browser.browserId)
      browserStatus.push(browser.isActive)
    })

    //** Making paylaod for the api */
    const payload = {
      browser_id: browserIds,
      status: browserStatus
    }

    console.log(payload)
    changeBrowser(payload, getAuthToken()).then(res => {
      if (!res.error) {
        toast.success(`Successfully Changed browser for unregistered users`, {
          position: 'bottom-right'
        })
        resetField('browser')
      } else {
        toast.error(`Failed while Changing browser for unregistered users`, {
          position: 'bottom-right'
        })
        resetField('browser')
      }
    })
  }

  useEffect(() => {
    getAllBrowsers(getAuthToken()).then(res => {
      const array = res.data
      setAllBrowsers(array)
    })
    getDefualtBrowser(getAuthToken()).then(res => {
      setDefualtBrowser(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader title='All Search Engines' />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormGroup>
                  {allBrowsers.map((item, index) => {
                    return (
                      <div key={index}>
                        <FormControlLabel
                          label={item.browserName}
                          control={
                            <Switch
                              defaultChecked={item.isActive}
                              onChange={() => (allBrowsers[index].isActive = !allBrowsers[index].isActive)}
                            />
                          }
                          value={item.browserId}
                          key={item.browserId}
                        />
                      </div>
                    )
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {errors.admin && (
                <FormHelperText sx={{ color: 'error.main', fontSize: 14, marginBottom: 2 }} id=''>
                  {errors.admin.message}
                </FormHelperText>
              )}
              <Button size='large' type='submit' variant='contained' onClick={e => onSubmit(e)}>
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
