const request = require('request')




const forecast = (lat,long,callback) => {
const url = 'https://api.darksky.net/forecast/5375fe680df390db16d2e6972c2164e2/'+lat+','+long+'?units=si'
request({url : url, json:true},(error,response) =>{
    if(error){
        callback('not able to connect to weather sevice',undefined)
    }
    else if(response.body.error){
        callback('unable to find location',undefined)
    }
    else{
    
   callback(undefined,'it is currently '+response.body.currently.temperature+' degree celsius with '+response.body.currently.precipProbability+' probability to rain.It is currently '+response.body.currently.summary)
   
    }
})
}

module.exports = forecast