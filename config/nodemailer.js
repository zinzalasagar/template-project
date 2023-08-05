const nodemailer = require('nodemailer');

const ejs = require('ejs');

const path = require('path');

let transporter = nodemailer.createTransport({
    service : 'google',
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "cd316dda97bc0a",
        pass: "250712d8ac9b47"
  }
});

let renderTemplte = function(data,relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log("template not load"); return false; }

            mailHTML = template
        }
    )
    return mailHTML;
}    

module.exports = {
    transporter : transporter,
    renderTemplte : renderTemplte
}