var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
 
 // create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({

		service:"Gmail",
		auth:{
			user:'davidobende@gmail.com',
			pass:'gbemisolafalegan'   //the correct username and password of the email you are using to receive the email
		}

});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '', // sender address //not really necessary
    to: 'davidobende@gmail.com', // list of receivers //the email you want to send the form to
    subject: 'Website Submission', // Subject line
    html: '<p>You have a new submission from the website. Here are the details:</p><ul><li>FirstName: '+req.body.firstname+' </li> <li>Surname: '+req.body.surname+' </li><li>Email: '+req.body.email+' </li><li>Phone Number: '+req.body.phone+' </li><li>Project Type: '+req.body.projecttype+' </li><li>Message: '+req.body.message+' </li></ul>'
    
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.redirect('/');
    }else{
    	 console.log('Message sent: ' + info.response);
    	 res.redirect('/thanks'); //redirect to thanks page of just leave it as '/' to go to home page
    }
   
});

});

module.exports = router;
