const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
let sqlReq
const md5 = require('md5')
const db = new sqlite3.Database('./database/main.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})
const db2 = new sqlite3.Database('./database/main.db')

router.use(express.urlencoded({ extended: false}))

async function db_all(query){
    return new Promise(function(resolve,reject){
        db2.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

router.post('/', (req, res) =>{
    const {password, login, email, firstName, lastName} = req.body,
            passwordMd5 = md5(password)

    sqlReq = 'INSERT INTO `users` (`login`, `email`, `password`, `first_name`, `last_name`, `token`) VALUES (?,?,?,?,?,?)'
    db.run(sqlReq, [login, email, passwordMd5, firstName, lastName, md5(login)], (err) => 
    { if (err) return console.error(err.message) })

    res.redirect('/sign-in')
})

router.post('/check', async (req, res) =>{
    const value = req.body.value
    sqlReq = "SELECT id FROM users WHERE login='"+ value +"' OR email='"+ value +"'"
    const reqSql = await db_all(sqlReq)
    if (reqSql.length == 0){
        return res.end(JSON.stringify(0))
    }else{
        return res.end(JSON.stringify(1))
    }
})


router.get('/', (req, res) => {
  res.render('index', { title: 'Sign up' , page: 'signUp' })
})


  
module.exports = router