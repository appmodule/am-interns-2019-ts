    var nodemailer = require('nodemailer');

    const mail_user = process.env.MAIL_USER

    var transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: mail_user,
            pass: process.env.MAIL_PASS
        }
    });

    module.exports.send = function(rcp,subject,text)
    {
        var mailOptions = {
        from: mail_user,
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

/*const sender = require('./mailer.js');
sender.send("dragana.stojnev@gmail.com","subject","text");*/