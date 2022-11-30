const express = require('express'),
    router = express.Router(),
    url = require('url'),
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



router.get('/', async (req, res) => {
  const sqlReq = "SELECT * FROM forum",
    sqlReq2 = "SELECT * FROM category",
    sqlReq3 = "SELECT * FROM topics",
    queryDb = await db_all(sqlReq),
    queryDb2 = await db_all(sqlReq2),
    queryDb3 = await db_all(sqlReq3)
  
  res.render('index', { title: 'Forum' , page: 'Forum' , href: 'questions', forums: queryDb, category: queryDb2, topics: queryDb3})
})

router.get('/item', async (req, res) => {
  const urlRequest = url.parse(req.url, true)
  if (typeof urlRequest.query.id != 'undefined' && typeof urlRequest.query.id_user != 'undefined'){
    const 
      sqlReq = "SELECT * FROM forum WHERE id = " + urlRequest.query.id + "",
      sqlReq2 = "SELECT * FROM category",
      sqlReq3 = "SELECT id, login FROM users WHERE id = " + urlRequest.query.id_user + "",
      sqlReq4 = "UPDATE forum SET  watching = watching + 1 WHERE id = " + urlRequest.query.id + ""
    await db_all(sqlReq4)
    const 
      queryDb = await db_all(sqlReq),
      queryDb2 = await db_all(sqlReq2),
      queryDb3 = await db_all(sqlReq3)
    
    res.render('index', { title: 'Forum | Forum', 
      page: 'ForumItem', 
      reqForum: queryDb, 
      category: queryDb2, 
      user: queryDb3,
      userWatch: req.signedCookies.id_user
    })
  } else {
    return res.redirect('/forum')
  }
  
})

router.get('/:any', (req, res) => {
  res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})

router.get('/item/:any', (req, res) => {
  res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})

  
module.exports = router