const express = require('express'),
      router = express.Router(),
      cookieParser = require('cookie-parser'),
      sqlite3 = require('sqlite3').verbose(),
      md5 = require('md5'),
      db = new sqlite3.Database('./database/main.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message)
      })

router.use(express.urlencoded({ extended: false}))
router.use(cookieParser('secret ecdc0f6bb1a12b909faf9ec54262f3a5'))

router.get('/', (req, res) => {
  if (req.signedCookies.token_user){
    return res.redirect('/')
  }
  res.render('index', { title: 'Sign in' , page: 'signIn' })
})

router.post('/', (req, res) =>{
  let sqlReq
  const {password, login} = req.body,
        passwordMd5 = md5(password)

  sqlReq = "SELECT * FROM users WHERE password='" + passwordMd5 + "' AND (email='" + login + "' OR login='" + login + "')"
  db.all(sqlReq, (err, resultQuery) => {
    if (err) return console.error(err.message)

    if (typeof resultQuery[0].login !== 'undefined'){
      res.cookie('login_user', resultQuery[0].login, {
        httpOnly: true,
        signed: true
      })
  
      res.cookie('id_user', resultQuery[0].id, {
        httpOnly: true,
        signed: true
      })
  
      res.cookie('token_user', resultQuery[0].token, {
        httpOnly: true,
        signed: true
      })
  
      res.cookie('level_user', resultQuery[0].user_level, {
        httpOnly: true,
        signed: true
      })
  
      return res.redirect('/')
      
    } else {
      return res.redirect('/sign-in')
    }  
  })
  
 
})
  
module.exports = router