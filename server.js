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
  res.render('index', { title: 'Kill Music', page: 'main' })
})

app.get('/about', (req, res) => {
  res.render('index', { title: 'О нас | Kill Music', page: 'about' })
})

app.get('/catalog', (req, res) => {
  res.render('index', { title: 'Каталог | Kill Music', page: 'catalog' })
})

app.get('/contacts', (req, res) => {
  res.render('index', { title: 'Контакты | Kill Music' , page: 'contacts'})
})



//Routers for server

const itemsRouter = require('./routes/items')
app.use('/items', itemsRouter)

const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

//Server start

app.listen(port, () => console.log(`App listening on port ${port}!`))