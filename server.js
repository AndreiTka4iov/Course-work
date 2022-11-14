const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')


// settings
const port = 80
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

//Routes for main url

app.get('/', (req, res) => {
  res.render('index', { title: 'Web', page: 'Home' })
})



//Routers for server

const itemsRouter = require('./routes/items')
app.use('/items', itemsRouter)

//Server start

app.listen(port, () => console.log(`App listening on port ${port}!`))