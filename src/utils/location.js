const request = require("request")


const location = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2VuZXJhbHByYWgiLCJhIjoiY2tiMG1pZ2lnMGFyZTJ4bGV3OHVhN2tqOCJ9.iJ2zU0htJ-XYOOPokON8cA'
  
  request({url, json: true}, (error, { body } ) => {
      if (error) {
        callback('Service currently unavailable. Kindly check your internet connection', undefined)
      } else if (body.features.length === 0) {
          callback('Location not accessible. Provide the correct location details', undefined)
      } else {
          callback (undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
          })
      }
  })
}


module.exports = location