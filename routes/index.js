const path = require('path')
const express = require('express')

answer = {
        places : [
        { description : "test place", coordinates : "59.201145, 39.873853"},
        { description : "another test place", coordinates : "59.201145, 39.873853", img: "https://avatars.mds.yandex.net/get-ugc/217759/2a0000015faf7b98b1ee8b94dcb5703fd1b0/X5L"}
        ]
}


module.exports = (app, db) => {

        app.use('/static', express.static('static'));

        app.get('/', (request, response) => {
                response.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'))
        })

        app.get('/gallery', (request, response) => {
                response.sendFile(path.resolve(__dirname, '..', 'views', 'gallery.html'))
        })

        app.get('/maps', (request, response) => {
                response.sendFile(path.resolve(__dirname, '..', 'views', 'maps.html'))
        })

        app.get('/index.html', (request,response)=>{
               response.redirect('/')
        })

        app.get('/api/popular', (request, response) => {
                db.collection('places').find({}).toArray((err, result) => {
                  response.send(result)
                })
        })

        app.get('/api/getPlaces', (request, response) => {
            db.collection('places').find({}).toArray((err, result) => {
              response.send(result.slice(0, request.query.amount))
            })
        })

}
