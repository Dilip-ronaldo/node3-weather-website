const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
// Define paths for Express config
const port = process.env.PORT || 3000
const pubDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirPath))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'cr7'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'cr7'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        exampleContent: 'This is the dynamic help content',
        title: 'Help',
        name: 'cr7'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "Address is not sent in the query params"
        })
    }
    const address = req.query.address
    geocode(address, (error, {place_name: location, center} = {}) => { //using default argument property of ES6
        //  console.log(location)
        if (error) {
            return res.send({
                error
            })
        }
        else {
            forecast(center[1], center[0], (error, forecast) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                else {
                    return res.send({
                        forecast,
                        location,
                        address
                    })
                }
            })

        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('errorPage',{
        title: '404 help',
        name: 'cr7',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res)=>{
    res.render('errorPage',{
        title: '404',
        name: 'cr7',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => { //callback to call once the server starts
    console.log('Server started successfully on port '+ port)
})
//app.com
