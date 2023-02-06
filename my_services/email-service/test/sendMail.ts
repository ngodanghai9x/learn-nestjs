import * as sgMail from '@sendgrid/mail';

process.env.SENDGRID_API_KEY =
  'SG.dpBgreDIQKa_UmF7HojprA.xxxxxxxxxxxxxxxxxxxxxxxx'; //_byOrC _DlRSC5IKHg72 w49OJANTvNHJWoOXAwL8rq0E
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'ngodanghai156+ncc@gmail.com', // Change to your recipient
  from: 'ndh.developer@hotmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  })
  .catch((error) => {
    console.error(error);
  });
