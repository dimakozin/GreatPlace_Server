const path   = require('path')

answer = {
        places : [
        { description : "test place", coordinates : "59.201145, 39.873853"},
        { description : "another test place", coordinates : "59.201145, 39.873853", img: "https://avatars.mds.yandex.net/get-ugc/217759/2a0000015faf7b98b1ee8b94dcb5703fd1b0/X5L"}
        ]
}


module.exports = (app, db) => {
        app.get('/', (request, response) => {
                response.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'))
        })

        app.post('/test', (request, response) => {
                console.log(request.body)
                response.send(request.body)
        })

}
