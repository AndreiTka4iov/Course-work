const express = require('express'),
    router = express.Router(),
    cookieParser = require('cookie-parser'),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./database/main.db')
        

router.use(express.urlencoded({ extended: false}))
router.use(cookieParser('secret ecdc0f6bb1a12b909faf9ec54262f3a5'))


async function db_all(query){
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

router.get('/', async (req, res) => {   
    const sqlReq = "SELECT * FROM topics",
        sqlReq2 = "SELECT * FROM category"

    const queryDb = await db_all(sqlReq)
    const queryDb2 = await db_all(sqlReq2)
    if(typeof req.signedCookies.level_user !== 'undefined' &&
    typeof req.signedCookies.login_user !== 'undefined' &&
    typeof req.signedCookies.id_user !== 'undefined' &&
    typeof req.signedCookies.token_user !== 'undefined'){
        res.render('index', { title: 'Create' , page: 'Create', topic: queryDb, category: queryDb2})
    } else{
        res.redirect('/sign-in')
    }
    
})

router.post('/discussion', async (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;

    const {title, discussion, category, subcategory} = req.body,
        sqlReq = "INSERT INTO `forum` (`title`, `discussion`, `category`, `subcategory`, `id_user`, `date`) VALUES ('" + title + "','" + discussion + "','" + category + "','" + subcategory + "','" + req.signedCookies.id_user + "','" + today + "')"
    await db_all(sqlReq)

    return res.redirect('/profile/questions')
})

router.post('/news', async (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;

    const {img, event, title, news, category, subcategory} = req.body,
        sqlReq = "INSERT INTO `news` (`event`, `title`, `news`, `category`, `subcategory`, `id_user`, `date`) VALUES ('"+ event +"', '" + title + "','" + news + "','" + category + "','" + subcategory + "','" + req.signedCookies.id_user + "','" + today + "')",
        sqlReq2 = "SELECT * FROM news WHERE id_user='" + req.signedCookies.id_user + "' AND img IS NULL",
        queryDb = await db_all(sqlReq2)
        console.log(img)
    
    //await db_all(sqlReq)

   return res.redirect('/profile/news')
})
  
module.exports = router