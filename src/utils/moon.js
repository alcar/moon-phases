import axios from 'axios'

import { LATITUDE, LONGITUDE } from './consts'
import getFormattedDate from './date'

export const getMoonPhases = async apiConfig => {
  try {
    const weatherDataResponse = await fetchWeatherData(apiConfig)

    const weatherData = weatherDataResponse.data

    return extractMoonPhases(weatherData)
  } catch (err) {
    console.log(err)

    return []
  }
}

const extractMoonPhases = weatherData =>
  Array.from(weatherData.getElementsByTagName('moon')).map(element =>
    element.getAttribute('phase'),
  )

const fetchWeatherData = apiConfig =>
  axios({
    method: 'get',
    responseType: 'document',
    url: `https://api.met.no/weatherapi/sunrise/1.1/?${getQueryString(
      apiConfig,
    )}`,
  })

const getQueryString = apiConfig =>
  Object.keys(apiConfig)
    .map(key => `${key}=${encodeURIComponent(apiConfig[key])}`)
    .join('&')

export const getMoonApiConfig = date => ({
  from: getFormattedDate(new Date(date.getFullYear(), date.getMonth(), 1)),
  lat: LATITUDE,
  lon: LONGITUDE,
  to: getFormattedDate(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
})
