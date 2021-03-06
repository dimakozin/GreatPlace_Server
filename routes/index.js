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

        app.get('/feedback', (request, response) => {
                response.sendFile(path.resolve(__dirname, '..', 'views', 'feedback.html'))
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

        app.get('/api/getPlacesBy', (request, response) => {
                db.collection('places').find({category : request.query.category}).toArray((err, result) => {
                        response.send(result)
                })
        })

}
