var axios = require('axios')

export const API_URL = 'https://api.verdict.com/api/admin/'

//async function which get all the admins
export async function getAllAdmins(token) {
  var config = {
    method: 'get',
    url: 'https://api.verdict.com/api/admin/',
    headers: {
      'x-access-token': token
    }
  }

  return axios(config)
    .then(response => {
      if (response.data.responseCode == 2000) {
        return { data: response.data.response }
      } else {
        return { error: 'Some error occured!:' + response.data.responseCode }
      }
    })
    .catch(error => {
      console.log(error)

      return { error: 'Some error occured!:' + error }
    })
}
