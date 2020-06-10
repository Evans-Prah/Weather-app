const request = require('request')

const forecast= (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=6a2afa7001b5b7a58d4adaf92ffc44c2&query=' + latitude + ',' + longitude + '&units=f'

  request({url, json: true}, (error, { body } ) => {
    if (error) {
      callback('Unable to connect to weather service for information!', undefined)
    } else if (body.error) {
        callback('Unable to find the location. Provide the correct information.', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. ' + 
         'It feels like ' + body.current.feelslike + ' degrees outside. The humidity is ' + body.current.humidity +   ' %. There is ' + body.current.precip + ' chance of rain. ')
    }
  })
}

module.exports = forecast