'use strict'

import axios from 'axios'
import store from '../store'

let querystring = require('querystring')

const defaultConfig = {
  baseURL: process.env.BASE_API_URL,
  params: {}
}

let pendingAPIRequests = []

// ---------- axios defaults ----------

// change serializer default to handle arrays
axios.defaults.paramsSerializer = function (params) {
  return querystring.stringify(filterParams(params))
}

// ---------- exposed functions ----------

let get = (config) => {

  // create token source for cancellation and add it to the stack
  let source = axios.CancelToken.source()
  pendingAPIRequests.push(source)

  // build query object, set defaults for values not provided
  let configData = {
    baseURL: config.baseURL || defaultConfig.baseURL,
    params: config.params || defaultConfig.params,
    endpoint: config.endpoint,
    headers: config.headers || setDefaultHeader(),
    cancelToken: source.token
  }

  // make request
  return new Promise((resolve, reject) => {
    axios.get(configData.endpoint, configData)

      .then(response => {
        resolve(response.data)
      })

      .catch(error => {
        if (!axios.isCancel(error)) {
          reject(error)
        }
      })

  })
}


let cancelPendingAPIRequests = () => {
  for (let i = pendingAPIRequests.length - 1; i >= 0; i--) {
    pendingAPIRequests.splice(i, 1)[0].cancel('canceled')
  }
}


// ---------- helper functions ----------

// if no header is passed in, replace it with the authorization header from Vuex store
function setDefaultHeader () {
  return {
    Authorization: `Bearer ${store.getters['auth/getToken']}`
  }
}

// this function filters out params that are set to 'all'
function filterParams (paramObj) {

  for (let key in paramObj) {
    if (paramObj.hasOwnProperty(key)) {

      // if the value is null
      // if the value is set to 'all'
      // if the value is an array and the array is empty
      let value = paramObj[key]
      let emptyParam = !value || value === 'all' || (Array.isArray(value) && value.length === 0)

      if (emptyParam) {
        delete paramObj[key] // remove the entry
      }
    }
  }

  return paramObj
}


export default {
  get,
  cancelPendingAPIRequests
}
