const express = require('express'),
    router = express.Router(),
    cookieParser = require('cookie-parser'),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./database/main.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message)
    })

router.use(express.urlencoded({ extended: false}))
router.use(cookieParser('secret ecdc0f6bb1a12b909faf9ec54262f3a5'))

router.get('/', async (req, res) => {
    const sqlReq = "SELECT * FROM topics",
        sqlReq2 = "SELECT * FROM category"
    db.all(await sqlReq, (err, resultQuery) => {
        if (err) return console.error(err.message)
        return {resultQ1: resultQuery}
    })
    db.all(await sqlReq2, (err, resultQuery) => {
        if (err) return console.error(err.message)
    })

    
    if(typeof req.signedCookies.level_user !== 'undefined' &&
    typeof req.signedCookies.login_user !== 'undefined' &&
    typeof req.signedCookies.id_user !== 'undefined' &&
    typeof req.signedCookies.token_user !== 'undefined'){
        res.render('index', { title: 'Create' , page: 'Create'})
    } else{
        res.redirect('/sign-in')
    }
    
})

router.post('/discussion', (req, res) => {
    
})
  
module.exports = router