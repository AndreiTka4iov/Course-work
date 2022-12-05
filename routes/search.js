const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose()
const url = require('url')
const db = new sqlite3.Database('./database/main.db')

router.use(bodyParser.urlencoded({extended: false}));

async function db_all(query){
  return new Promise(function(resolve,reject){
      db.all(query, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
}

router.get('/', async (req, res) => {
    const urlRequest = url.parse(req.url, true)
    let sqlReq = ""
    if (urlRequest.query.searchFrom == 1){
        sqlReq = "SELECT * FROM news WHERE event LIKE '%"+ urlRequest.query.input +"%' OR title LIKE '%"+ urlRequest.query.input +"%' OR news LIKE '%"+ urlRequest.query.input +"%' ORDER BY watching DESC"
    } else if (urlRequest.query.searchFrom == 2){
        sqlReq = "SELECT * FROM forum WHERE title LIKE '%"+ urlRequest.query.input +"%' OR discussion LIKE '%"+ urlRequest.query.input +"%' ORDER BY watching DESC"
    }
    const dbReq = await db_all(sqlReq)

    return res.end(JSON.stringify(dbReq))
  })

router.get('/:any', (req, res) => {
    res.render('index', { title: 'Forum | Error', page: 'Error', homePage: 'home-header'})
})


module.exports = router