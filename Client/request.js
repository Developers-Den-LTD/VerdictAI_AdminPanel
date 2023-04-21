var axios = require('axios')

export const API_URL = 'https://api.verdict.com/api/admin/'

//async function which get all the admins
export async function getAllAdmins(token) {
  var config = {
    method: 'get',
    url: API_URL,
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

//create a new admin function call
export async function createAdmin(userName, name, password, token) {
  var data = {
    username: userName,
    password: password,
    name: name
  }

  var config = {
    method: 'post',
    url: API_URL + 'create-admin',
    headers: {
      'x-access-token': token
    },
    data: data
  }

  return axios(config)
    .then(response => {
      if (response.data.responseCode == 2000) {
        return true
      } else {
        return { error: 'Some error occured!:' + response.data.responseCode }
      }
    })
    .catch(error => {
      console.log(error)

      return { error: 'Some error occured!:' + error }
    })
}

//async function which get all the browsers
export async function getAllBrowsers(token) {
  var config = {
    method: 'get',
    url: API_URL + 'browsers',
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

//change browsers for unregistered users
export async function changeBrowser(id, token) {
  var data = {
    browser_id: id
  }

  var config = {
    method: 'post',
    url: API_URL + 'change-browser',
    headers: {
      'x-access-token': token
    },
    data: data
  }

  return axios(config)
    .then(response => {
      if (response.data.responseCode == 2000) {
        return true
      } else {
        return { error: 'Some error occured!:' + response.data.responseCode }
      }
    })
    .catch(error => {
      console.log(error)

      return { error: 'Some error occured!:' + error }
    })
}
