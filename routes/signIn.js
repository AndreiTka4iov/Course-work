const express = require('express')
const router = express.Router()
const url = require('url')
const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')
const db = new sqlite3.Database('./database/main.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})

router.use(express.urlencoded({ extended: false}))

router.get('/', (req, res) => {
  res.render('index', { title: 'Sign in' , page: 'signIn' })
})

router.post('/', (req, res) =>{
  let sqlReq
  let newToken
  const {password, login} = req.body
  const passwordMd5 = md5(password) 
  const loginLoverCase = login.toLowerCase()

  sqlReq = "SELECT * FROM users WHERE password='" + passwordMd5 + "' AND (email='" + loginLoverCase + "' OR login='" + loginLoverCase + "')"
  db.all(sqlReq, (err, resultQuery) => {
    if (err) return console.error(err.message)
    
    if (resultQuery[0].token !== null){
      newToken = resultQuery[0].token
    } else {
      newToken = md5(newTokenFunction(10) + resultQuery[0].id)
    }
    
    if (resultQuery[0].login == loginLoverCase || resultQuery[0].email == loginLoverCase){
      sqlReq = "UPDATE users SET token='" + newToken + "' WHERE id='" + resultQuery[0].id + "'"
      db.all(sqlReq, (err) => {if (err) return console.error(err.message)})

      return res.redirect('/')
    } else{return res.redirect('/sign-in')}
  })
})


function newTokenFunction(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
  
module.exports = router