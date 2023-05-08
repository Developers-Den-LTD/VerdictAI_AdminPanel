// ** MUI Imports
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`Powered by `}
        <MuiLink target='_blank' href='https://developersdens.com'>
          Developers Den
        </MuiLink>
      </Typography>
      <Typography sx={{ mr: 2 }}>
        {`Copyright ${new Date().getFullYear()},  `}
        {` All rights reserved `}
      </Typography>
    </Box>
  )
}

export default FooterContent
