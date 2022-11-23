const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/main.db')


// settings
const port = 80
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

//Routes for main url

app.get('/', (req, res) => {
  res.render('index', { title: 'Forum | Home', page: 'Home', homePage: 'home-header'})
})

app.get('/news', (req, res) => {
  res.render('index', { title: 'Forum | News', page: 'News' })
})

app.get('/news/item', (req, res) => {
  res.render('index', { title: 'Forum | News', page: 'NewsItem' })
})



//Routers for server

const forumRouter = require('./routes/forum')
app.use('/forum', forumRouter)

const signUpRouter = require('./routes/signUp')
app.use('/sign-up', signUpRouter)
app.use('/sign-up/confirm', signUpRouter)

const signInRouter = require('./routes/signIn')
app.use('/sign-in', signInRouter)

//page 404

app.get('/:any', (req, res) => {
  res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})

app.get('/news/:any', (req, res) => {
  res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})

app.get('/news/item/:any', (req, res) => {
  res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})

//Server start

app.listen(port, () => console.log(`App listening on port ${port}!`))