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
    let sqlReq = "";
    let order = " ORDER BY id DESC"
    

    if (urlRequest.query.by === 'comments'){
      order = " ORDER BY coments DESC"
    }else if (urlRequest.query.by === 'views'){
      order = " ORDER BY watching DESC"
    }else if (urlRequest.query.by === 'favourites'){
      order = " ORDER BY favorite DESC"
      
    }
    
    if (typeof urlRequest.query.category != 'undefined'){
         sqlReq = "SELECT * FROM news WHERE subcategory = '"+ urlRequest.query.category +"'"+order
    }else if (typeof urlRequest.query.topic != 'undefined'){
         sqlReq = "SELECT * FROM news WHERE category = '"+ urlRequest.query.topic +"'"+order
    } else {
         sqlReq = "SELECT * FROM news"+order
    }

    const sqlReq3 = "SELECT * FROM topics"
    const sqlReq2 = "SELECT * FROM category"

    const queryDb = await db_all(sqlReq)
    const queryDb2 = await db_all(sqlReq2)
    const queryDb3 = await db_all(sqlReq3)

    res.render('index', {title: 'Forum || News',
      page: 'News',
      category: queryDb2,
      topics: queryDb3,
      sort: urlRequest.query,
      news: queryDb})
})

router.post('/item/delete', async (req, res) => {
  const idComent = req.body
  sqlReq = "DELETE FROM `coments_news` WHERE `id` = '"+ idComent.idCom +"'"
  await db_all(sqlReq)
})

router.post('/item', async (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;

  const {comment, id_post} = req.body  
 
  const sqlReq = "INSERT INTO coments_news (`coment`, `id_news`, `id_user`, `date`) VALUES ('"+ comment +"' , '"+ id_post +"' , '"+ req.signedCookies.id_user +"' , '"+ today +"')"
  await db_all(sqlReq)

  const sqlReq2 = "SELECT * FROM news WHERE id = "+ id_post +""
  const queryDb2 = await db_all(sqlReq2)

  const back = "/news/item?id_post="+ id_post +"&id_user="+ queryDb2[0].id_user

  return res.redirect(back)
})
  
router.get('/item', async (req, res) => {
    const urlRequest = url.parse(req.url, true)

    if (typeof urlRequest.query.id_post != 'undefined' && typeof urlRequest.query.id_user != 'undefined'){
      
      const sqlReq = "SELECT * FROM news WHERE id = " + urlRequest.query.id_post + ""
      const queryDb = await db_all(sqlReq)
      
      const sqlReq2 = "SELECT * FROM category"
      const queryDb2 = await db_all(sqlReq2)

      const sqlReq3 = "SELECT id, login FROM users"
      const queryDb3 = await db_all(sqlReq3)  
      
      const sqlReq5 = "SELECT * FROM coments_news WHERE id_news = " + queryDb[0].id + " ORDER BY id DESC"
      const queryDb5 = await db_all(sqlReq5)

      const sqlReq4 = "UPDATE news SET  watching = watching + 1, coments = "+ queryDb5.length +" WHERE id = " + urlRequest.query.id_post + ""
      await db_all(sqlReq4) 
      
      res.render('index', {
        page: 'NewsItem', 
        reqNews: queryDb, 
        category: queryDb2, 
        users: queryDb3,
        comment: queryDb5,
        userWatch: req.signedCookies.id_user
      })
    } else {
      return res.redirect('/news')
    }
})


  
module.exports = router