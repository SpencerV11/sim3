require('dotenv').config()
let massive = require('massive')
let express = require('express')
let session = require('express-session')
let { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
let mainController = require('./controllers/mainController')

let app = express()


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Your port is runnin' on ${SERVER_PORT}`))
    console.log('db is set')
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/auth/register', mainController.register)
app.post('/auth/login', mainController.login)
app.get('/auth/user-data', mainController.userData)
app.get('/auth/logout', mainController.logout)

app.get('/api/posts', mainController.getPosts)
app.get('/api/posts/:id', mainController.getPostById)