const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
let sqlReq
const md5 = require('md5')
const db = new sqlite3.Database('./database/main.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})

router.use(express.urlencoded({ extended: false}))

router.post('/', (req, res) =>{
    const {password, login, email, firstName, lastName} = req.body,
            passwordMd5 = md5(password)

    sqlReq = 'INSERT INTO `users` (`login`, `email`, `password`, `first_name`, `last_name`, `token`) VALUES (?,?,?,?,?,?)'
    db.run(sqlReq, [login, email, passwordMd5, firstName, lastName, md5(login)], (err) => 
    { if (err) return console.error(err.message) })

    res.cookie('login_user', login, {
        httpOnly: true,
        signed: true
    })
    
    res.cookie('token_user', md5(login), {
    httpOnly: true,
    signed: true
    })
    
    res.cookie('level_user', 0, {
    httpOnly: true,
    signed: true
    })

    res.redirect('/')
})


router.get('/', (req, res) => {
  res.render('index', { title: 'Sign up' , page: 'signUp' })
})


  
module.exports = router