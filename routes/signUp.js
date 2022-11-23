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
    const {password, login, email, firstName, lastName} = req.body
    const passwordMd5 = md5(password)
    const loginLoverCase = login.toLowerCase()
    sqlReq = 'INSERT INTO `users` (`login`, `email`, `password`, `first_name`, `last_name`) VALUES (?,?,?,?,?)'
    db.run(sqlReq, 
        [loginLoverCase, email, passwordMd5, firstName, lastName],
        (err) => {
            if (err) return console.error(err.message)
        })
    res.redirect('/')
})


router.get('/', (req, res) => {
  res.render('index', { title: 'Sign up' , page: 'signUp' })
})


  
module.exports = router