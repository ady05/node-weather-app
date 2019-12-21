const request = require('request')

const geocode = (address,callback) => {
    const urllat = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+
                    address+
                    '.json?access_token=pk.eyJ1IjoiYWR5NTgiLCJhIjoiY2s0ODMyc2doMHloMTNucGd2Z3MzYmhnaiJ9.ZNAfNSr_xF0s2vTZTRN1jA&limit=1'
        request({url : urllat, json:true},(error,response) =>{
        if(error){
            callback('unable to connect to weather services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
            lat : response.body.features[0].center[1],
            long : response.body.features[0].center[0],
            loc : response.body.features[0].place_name})
        }
    })
}
module.exports = geocode