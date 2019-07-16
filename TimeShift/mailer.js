
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '***REMOVED***',
        pass: '***REMOVED***'
    }
    });
    var ime = "appmodule";
    module.exports.send = function(rcp,subject,text)
    {
        var mailOptions = {
        from: '***REMOVED***',
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