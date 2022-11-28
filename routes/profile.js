const express = require('express'),
    router = express.Router(),
    cookieParser = require('cookie-parser'),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./database/main.db')

async function db_all(query){
  return new Promise(function(resolve,reject){
      db.all(query, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
}

router.get('/news', (req, res) => {
  if(typeof req.signedCookies.level_user !== 'undefined' &&
  typeof req.signedCookies.login_user !== 'undefined' &&
  typeof req.signedCookies.id_user !== 'undefined' &&
  typeof req.signedCookies.token_user !== 'undefined'){
    res.render('index', { title: 'Profile' , page: 'Profile' , href: 'news'})
  } else{
    res.redirect('/sign-in')
  }
})

router.get('/questions', async (req, res) => {
  const sqlReq = "SELECT * FROM forum WHERE id_user = '" + req.signedCookies.id_user + "'",
    sqlReq2 = "SELECT * FROM category",
    queryDb = await db_all(sqlReq),
    queryDb2 = await db_all(sqlReq2)
  if(typeof req.signedCookies.level_user !== 'undefined' &&
  typeof req.signedCookies.login_user !== 'undefined' &&
  typeof req.signedCookies.id_user !== 'undefined' &&
  typeof req.signedCookies.token_user !== 'undefined'){
    res.render('index', { title: 'Profile' , page: 'Profile' , href: 'questions', userPosts: queryDb, category: queryDb2})
  } else{
    res.redirect('/sign-in')
  }
  
})
  
module.exports = router