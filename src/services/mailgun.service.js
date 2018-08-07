import mailgun from 'mailgun-js'

const apiKey = process.env.MAILGUN_SECRET
const domain = process.env.MAILGUN_DOMAIN
const Mailgun = mailgun({ apiKey, domain })

module.exports = (email, subject, text, html = null) => {
    const data = {
        from: 'Excited User <mega-bot@' + domain + '>',
        to: email,
        subject,
    }

    if (html !== null) {
        data.html = html
    } else {
        data.text = text
    }

    /*
    Mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
    */

    /*
    mailgun.lists('mylist@mydomain.com').info().then(function (data) {
        console.log(data);
    }, function (err) {
        console.log(err);
    });
    */

    Mailgun.messages().send(data, function(error, body) {
        if (error) {
            console.log('got an error: ', error)
        } else {
            console.log(body)
        }
    })
}
