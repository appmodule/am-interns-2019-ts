    var nodemailer = require('nodemailer');
    require('dotenv').config()
    //const mail_user = process.env.MAIL_USER
    const env = process.env;
    var transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: env.MAIL_USER,
            pass: env.MAIL_PASS
        }
    });

    module.exports.send = function(rcp,subject,text)
    {
        var mailOptions = {
        from: env.MAIL_USER,
        to: rcp,
        subject: subject,
        text: text 
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    };

const sender = require('./mailer.js');
sender.send("dragana.stojnev@gmail.com","subject","text");