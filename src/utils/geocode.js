const request = require('postman-request')

const geocode = (place, callback) => {

    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiZGlsaXBjcjciLCJhIjoiY2t5YjdzOW84MGN6bjMxbXJndzY3YmYyciJ9.hS0e_2_zxpci2UiO6T4xaA&limit=1'
    
    
request({ url: geoCodeUrl, json: true }, (error, {body}={}) => { //destructure response to {body} as we need only body from response

    if (error) {
        callback("Unable to connect to the service !!")
    } else
        if (body.features.length===0) {
            callback("Nothing found for the given location. please provide a valid location !")
        }
        else {

            callback(undefined, {
                center: body.features[0].center,
                place_name: body.features[0].place_name,
            })
        }


})

}

module.exports = geocode

