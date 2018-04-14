const path = require('path')
const express = require('express')

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

        app.get('/index.html', (request,response) => {
               response.redirect('/')
        })

        app.get('/api/popular', (request, response) => {
            db.collection('places').find({}).toArray((err, result) => {
              response.send(result)
            })
        })

}
