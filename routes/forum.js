const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const url = require('url')
const cookieParser = require('cookie-parser')
const sqlite3 = require('sqlite3').verbose()
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

router.post('/item', async (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;

  const {comment, id_post} = req.body  
 
  const sqlReq = "INSERT INTO coments_forum (`coment`, `id_forum`, `id_user`, `date`) VALUES ('"+ comment +"' , '"+ id_post +"' , '"+ req.signedCookies.id_user +"' , '"+ today +"')"
  await db_all(sqlReq)

  const sqlReq2 = "SELECT * FROM forum WHERE id = "+ id_post +""
  const queryDb2 = await db_all(sqlReq2)

  const back = "/forum/item?id="+ id_post +"&id_user="+ queryDb2[0].id_user

  return res.redirect(back)
})

router.post('/item/delete', async (req, res) => {
  const idComent = req.body
  sqlReq = "DELETE FROM `coments_forum` WHERE `id` = '"+ idComent.idCom +"'"
  await db_all(sqlReq)
})

router.post('/item/rating', async (req, res) => {
  const {value, idPost} = req.body

  if (value == 1) {
    sqlReq = "UPDATE forum SET  rating = rating + 1 WHERE id = " + idPost + ""
    await db_all(sqlReq)
  } else if( value == -1 ){
    sqlReq = "UPDATE forum SET  rating = rating - 1 WHERE id = " + idPost + ""
    await db_all(sqlReq)
  }
})

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
        sqlReq = "SELECT * FROM forum WHERE subcategory = '"+ urlRequest.query.category +"'"+order
  }else if (typeof urlRequest.query.topic != 'undefined'){
        sqlReq = "SELECT * FROM forum WHERE category = '"+ urlRequest.query.topic +"'"+order
  } else {
        sqlReq = "SELECT * FROM forum"+order
  }

  const sqlReq2 = "SELECT * FROM category"
  const sqlReq3 = "SELECT * FROM topics"

  const queryDb = await db_all(sqlReq)
  const queryDb2 = await db_all(sqlReq2)
  const queryDb3 = await db_all(sqlReq3)
  
  res.render('index', { title: 'Forum' ,
      page: 'Forum' ,
      href: 'questions',
      forums: queryDb,
      category: queryDb2,
      sort: urlRequest.query,
      topics: queryDb3})
})

router.get('/item', async (req, res) => {
  const urlRequest = url.parse(req.url, true)
  if (typeof urlRequest.query.id != 'undefined' && typeof urlRequest.query.id_user != 'undefined'){

    const sqlReq2 = "SELECT * FROM forum WHERE id = " + urlRequest.query.id + ""
    const queryDb2 = await db_all(sqlReq2)

    const sqlReq3 = "SELECT * FROM category"
    const queryDb3 = await db_all(sqlReq3)

    const sqlReq4 = "SELECT id, login, img FROM users"
    const queryDb4 = await db_all(sqlReq4)

    const sqlReq5 = "SELECT * FROM coments_forum WHERE id_forum = " + queryDb2[0].id + " ORDER BY id DESC"
    const queryDb5 = await db_all(sqlReq5)

    const sqlReq = "UPDATE forum SET  watching = watching + 1 , coments = "+ queryDb5.length +" WHERE id = " + urlRequest.query.id + ""
    await db_all(sqlReq)
    
    res.render('index', { title: 'Forum | Forum', 
      page: 'ForumItem', 
      reqForum: queryDb2, 
      category: queryDb3, 
      users: queryDb4,
      comment: queryDb5,
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