const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')
const db2 = new sqlite3.Database('./database/main.db')

router.use(express.urlencoded({ extended: false}))
router.use(cookieParser('secret ecdc0f6bb1a12b909faf9ec54262f3a5'))

async function db_all(query){
  return new Promise(function(resolve,reject){
      db2.all(query, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
}

router.get('/', (req, res) => {
  if (req.signedCookies.token_user){
    return res.redirect('/')
  }
  res.render('index', { title: 'Sign in' , page: 'signIn' })
})

router.post('/', async (req, res) => {
  const {password, login} = req.body,
        passwordMd5 = md5(password)
  const sqlReq = "SELECT * FROM users WHERE password='" + passwordMd5 + "' AND login='" + login + "'"
  const resultQuery = await db_all(sqlReq)
  console.log(resultQuery[0])
  if (typeof resultQuery[0] !== 'undefined'){

    res.cookie('login_user', resultQuery[0].login, {httpOnly: true, signed: true})

    res.cookie('id_user', resultQuery[0].id, {httpOnly: true, signed: true})

    res.cookie('token_user', resultQuery[0].token, { httpOnly: true, signed: true})

    res.cookie('level_user', resultQuery[0].user_level, { httpOnly: true, signed: true})

    return res.redirect('/') 
  } else {
    return res.redirect('/sign-in') 
  }

})
  
module.exports = router