const express = require('express')
const router = express.Router()
const url = require('url')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/main.db')

router.use(express.urlencoded({ extended: false}))
router.use(cookieParser('secret ecdc0f6bb1a12b909faf9ec54262f3a5'))
router.use(fileUpload());

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
    } else if (urlRequest.query.del == 'true' && urlRequest.query.forum == 'false'){
      const sqlReq = "DELETE FROM news WHERE id_user = '" + req.signedCookies.id_user + "' AND id = '" + urlRequest.query.id +"'"
      await db_all(sqlReq)
      return res.redirect('/profile/news')
    } else{
      return res.redirect('/')
    }
    
})

router.post('/', async (req, res) => {

  const splitStr = req.files.imgUpload.name.split('.')
  req.files.imgUpload.name = req.signedCookies.id_user + '.' + splitStr[1]

  const sqlReq = "UPDATE users SET img = '"+ splitStr[1] +"' WHERE id = "+ req.signedCookies.id_user +""
  await db_all(sqlReq)

  req.files.imgUpload.mv('./public/images/users/' + req.files.imgUpload.name, function (err) {
        if (err) { console.log(err)}
  })

  return res.redirect('/profile/news')
})


module.exports = router