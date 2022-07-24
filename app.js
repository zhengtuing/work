const express = require('express');
const mail = require('./send_mail')
const changePw = require('./change_password')


let app = express();
app.listen(9000)
app.get('/youtube',(req,res)=>{
    console.log(req.query.myMail,req.query.myPassword, req.query.toMailAddress, new Date());
    try {
    mail.sendMail(req.query.myMail, req.query.myPassword, req.query.toMailAddress)
    }catch (e) {
        console.log(e)
    }
})

app.get('/nfchangepwd', (req, res)=> {
    console.log(req.query.account, req.query.passwd, req.query.newpasswd, new Date());
    try {
        changePw.changePassword(req.query.account, req.query.passwd, req.query.newpasswd)
    }catch (e){
        console.log(e)}
})




