import axios from 'axios'

import { LATITUDE, LONGITUDE } from './consts'
import { formatDate, formatTimezoneOffset } from './dateTime'

export const getMoonPhase = async date => {
  const apiConfig = getMoonApiConfig(date)

  try {
    const weatherDataResponse = await fetchWeatherData(apiConfig)

    const weatherData = weatherDataResponse.data

    return extractMoonPhase(weatherData)
  } catch (err) {
    return []
  }
}

const extractMoonPhase = weatherData =>
  /\(([a-z]+(\s[a-z]+)+)\)$/.exec(
    weatherData.activeElement.children[1].children[0].children[0].attributes
      .desc.value,
  )[1]

const fetchWeatherData = apiConfig =>
  axios({
    method: 'get',
    responseType: 'document',
    url: `https://api.met.no/weatherapi/sunrise/2.0/?${getQueryString(
      apiConfig,
    )}`,
  })

const getMoonApiConfig = date => {
  const dateObj = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  return {
    date: formatDate(dateObj),
    lat: LATITUDE,
    lon: LONGITUDE,
    offset: formatTimezoneOffset(dateObj.getTimezoneOffset()),
  }
}

const getQueryString = apiConfig =>
  Object.keys(apiConfig)
    .map(key => `${key}=${encodeURIComponent(apiConfig[key])}`)
    .join('&')
