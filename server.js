const express = require('express')
const app = express()
const port = 3000

answer = {
        places : [
        {"Description":"Test place", "Coordinates":"59.201085, 39.873239", "img":"http://betosteel.ru/wp-content/uploads/2017/06/69-696x435.jpg"},
        {"Description":"Anothre test place", "Coordinates":"59.201085, 39.873239", "Rating":"5"}
    ]
}

app.get('/', (request, responce) => {
        responce.send(answer)
})

app.listen(port, (err) => {
        if(err){
                return console.log('something bad', err)
        }

        console.log(`server is listening on ${port}`)
})
