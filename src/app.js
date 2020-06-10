const path = require('path')
const express = require('express')
const hbs = require('hbs')
const location = require('./utils/location')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and viws location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

 app.get('', (req, res) => {
  res.render('index', {
        title: 'Weather ',
        name: 'Ekow'
  })
 })

 app.get('/about', (req, res) => {
   res.render('about', {
     title: 'About me',
     quote: 'All my opinions are limited to this feelings: I love my family, I respect my supervisors, and I love my lady.',
     name: 'Ekow'
   })
 })

 app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Contact me for support',
      phone: '+233 508294088',
      email: 'ivanspj2@gmail.com',
      name: 'Ekow',
   })
 })

app.get('/weather', (req, res) => {
  if(!req.query.address) {
      return res.send({
        error: 'You must provide an address'
      })
  }

  location(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if(error) {
        return res.send( {error})
      }

      forecast(latitude, longitude, (error, forecastData) => {
          if(error) {
            return res.send({ error })
          }

          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
      })
  }) 
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ekow',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ekow',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})