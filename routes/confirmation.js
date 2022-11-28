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
    const urlRequest = url.parse(req.url, true)
    if (urlRequest.query.del == 'true' && urlRequest.query.forum == 'true'){
       const sqlReq = "DELETE FROM forum WHERE id_user = '" + req.signedCookies.id_user + "' AND id = '" + urlRequest.query.id +"'"
       await db_all(sqlReq)
       return res.redirect('/profile/questions')
    }
    
})

module.exports = router