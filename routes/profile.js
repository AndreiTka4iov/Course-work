const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  if(typeof req.signedCookies.level_user !== 'undefined' &&
  typeof req.signedCookies.login_user !== 'undefined' &&
  typeof req.signedCookies.id_user !== 'undefined' &&
  typeof req.signedCookies.token_user !== 'undefined'){
    res.render('index', { title: 'Profile' , page: 'Profile' , href: 'news'})
  } else{
    res.redirect('/sign-in')
  }
})

router.get('/questions', (req, res) => {
  if(typeof req.signedCookies.level_user !== 'undefined' &&
  typeof req.signedCookies.login_user !== 'undefined' &&
  typeof req.signedCookies.id_user !== 'undefined' &&
  typeof req.signedCookies.token_user !== 'undefined'){
    res.render('index', { title: 'Profile' , page: 'Profile' , href: 'questions'})
  } else{
    res.redirect('/sign-in')
  }
  
})
  
module.exports = router