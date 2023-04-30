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

//async function which get all the Query Limits
export async function getAllQueryLimits(token) {
  var config = {
    method: 'get',
    url: API_URL + 'query-limits',
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

//change query limit for a certain id
export async function ChangeQueryLimit(id, noOfQueries, token) {
  var data = {
    limit_id: id,
    no_of_queries: noOfQueries
  }

  var config = {
    method: 'post',
    url: API_URL + 'set-query-limit',
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

//async function which gets all the user types
export async function getAllUserTypes(token) {
  var config = {
    method: 'get',
    url: API_URL + 'user-types',
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

//change result per query for a certain user type
export async function ChangeResultsPerQuery(userType, noOfResults, token) {
  var data = {
    no_of_results_per_query: noOfResults,
    user_type: userType
  }

  var config = {
    method: 'post',
    url: API_URL + 'set-results-per-query',
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

export async function DeleteAdmin(token, id) {
  var data = {
    username: id
  }

  var config = {
    method: 'post',
    url: API_URL + 'delete-admin',
    headers: {
      'x-access-token': token
    },
    data: data
  }

  return axios(config)
    .then(response => {
      console.log(response)
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

//async function which get all the abusers
export async function getAllAbusers(token) {
  var config = {
    method: 'get',
    url: API_URL + 'abusers',
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

export async function Block_unblock(token, id) {
  var data = {
    username: id
  }

  var config = {
    method: 'post',
    url: API_URL + 'block-unblock-user',
    headers: {
      'x-access-token': token
    },
    data: data
  }

  return axios(config)
    .then(response => {
      if (response.data.responseCode == 2000) {
        return response.data
      } else {
        return { error: 'Some error occured!:' + response.data.responseCode }
      }
    })
    .catch(error => {
      console.log(error)

      return { error: 'Some error occured!:' + error }
    })
}
