const express = require('express'),
    router = express.Router(),
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
    const 
        sqlReq = "SELECT * FROM news",
        sqlReq2 = "SELECT * FROM category",
        sqlReq3 = "SELECT * FROM topics",
        queryDb = await db_all(sqlReq),
        queryDb2 = await db_all(sqlReq2),
        queryDb3 = await db_all(sqlReq3)

    res.render('index', {title: 'Forum || News', page: 'News', category: queryDb2, topics: queryDb3, news: queryDb})
})
  
router.get('/item', (req, res) => {
    res.render('index', {page: 'NewsItem' })
})
  
module.exports = router