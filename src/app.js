const path = require('path')
const express = require('express')
const geocode = require('../geocode.js')
const forecast = require('../forecast.js')

const app = express()
const port = process.env.PORT || 30000
const hbs = require('hbs')

console.log(__dirname)
const pathfile = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname , '../templates/partials')
console.log(partialpath)

hbs.registerPartials(partialpath)
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(pathfile))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name: 'Aditya'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name:'Aditya'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        name: 'Aditya'
    })
})
// app.get('/help/*',(req,res) =>{
//     res.render('404',{
//         title:'404',
//         name:'Aditya',
//         error :'help page not found'
//     })
// })
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        res.send({
            error:'please specify location'
        })
    }
    else {
        
        geocode(req.query.address,(error,data) => {
            if(error){
                return res.send({error})

            }
            
                // res.send(data.loc)

            forecast(data.lat, data.long, (error, forecastData) => {
                    if (error) {
                        return res.send({error});
                    }
                    else {
                        res.send({
                            forecast:forecastData,
                            
                            address:data.loc
                        });
                    }
                })
            
        })

    }
})

app.get('*',(req,res) =>{
    res.render('404',{
       title:'404',
       name: 'Aditya',
       error : 'page not found' 
    })
})



app.listen(port,()=>{
    console.log('server is running')
})

