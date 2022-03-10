const request = require('postman-request')

const forcast = (latitude, longitude, callback) => {
    
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=f9413f8d01c811e76974b86f9ad386bc&query='+latitude+','+longitude+'&units=m'

    request({ url: forecastUrl, json: true }, (error, {body}={}) => { //destructure response to {body} as we need only body from response
            if (error) {
                callback("Unable to connect to the service !!")
            } else
                if (body.error) {
                    callback(body.error.info)
                }
                else {
                    const currentData = body.current
                    data = currentData.weather_descriptions[0]
                    data+=". It is currently " + currentData.temperature + " degrees out. It feels like " + currentData.feelslike
                    callback(undefined, data)
                }
        
        })
}


module.exports = forcast
