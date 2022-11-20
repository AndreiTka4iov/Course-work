const express = require('express')
const router = express.Router()



router.get('/', (req, res) => {
  res.render('index', { title: 'Forum' , page: 'Forum' })
})

router.get('/item', (req, res) => {
  res.render('index', { title: 'Forum | Forum', page: 'ForumItem' })
})

router.get('/:any', (req, res) => {
  res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})

router.get('/item/:any', (req, res) => {
  res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})

//get url

//router.get('/', (req, res) => {
 // res.render('index', { title: req.query?.topic , page: 'Forum' })
//})

  
module.exports = router