import { useState, useEffect, useCallback } from 'react'
const authorizationKey = 'CWB-3DC4E3B4-E6F4-4DEE-AC65-59D811F0069A'

const fetchCurrentWeather = (locationoName) => {
  return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationoName}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const locationData = data.records.location[0]

    const weatherElements = locationData.weatherElement.reduce(
      (neededElements, item) => {
        if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
          neededElements[item.elementName] = item.elementValue
        }
        return neededElements
      }, {}
    )

    return {
      observationTime: locationData.time.obsTime,
      locationName: locationData.locationName,
      temperature: weatherElements.TEMP,
      windSpeed: weatherElements.WDSD,
      humid: weatherElements.HUMD,
    }
  })
}

const fetchWeatherForecast = (cityName) => {
  return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`)
  .then(response => response.json())
  .then(data => {
    const locationData = data.records.location[0]
    const weatherElements = locationData.weatherElement.reduce(
      (neededElements, item) => {
        if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
          neededElements[item.elementName] = item.time[0].parameter
        }
        return neededElements
      }, {}
    )

    return {
      description: weatherElements.Wx.parameterName,
      weatherCode: weatherElements.Wx.parameterValue,
      rainPossibility: weatherElements.PoP.parameterName,
      comfortability: weatherElements.CI.parameterName
    }
  })
}

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation
  const [ weatherElement, setWeatherElement ] = useState({
    observationTime: new Date(),
    locationName: '',
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true
  })

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [ currentWeather, weatherForecast ] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName)
      ])

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false
      })
    }

    setWeatherElement(prevState => ({
      ...prevState,
      isLoading: true
    }))

  fetchingData()
  }, [locationName, cityName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [weatherElement, fetchData]
}

export default useWeatherApi
