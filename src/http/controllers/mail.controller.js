import fs from 'fs'
import path from 'path'
import Mailer from '../../services/mailgun.service'

const MailController = {}
module.exports = MailController

MailController.test = async (ctx, next) => {
    Mailer(process.env.MAILGUN_ADMIN, 'Тестовое сообщение для проверки', 'ping')

    ctx.body = 'Ok'
}

MailController.send = async (ctx, next) => {
    let { name, phone, vin, comment } = ctx.request.body
    const now = new Date();

    name = name
        .toString()
        .trim()
        .substring(0, 50)

    phone = '+7' + phone.replace(/[^0-9]/gi, '').slice(-10)

    vin.toString().substring(0, 25)

    comment
        .toString()
        .trim()
        .substring(0, 255)

    const message = await ctx.render('mail/template', {
        name,
        phone,
        vin,
        comment,
    })

    // Mailer(process.env.MAILGUN_ADMIN, 'Тестовое сообщение для проверки', null, message)
    // ctx.body = message

    fs.appendFile(
        path.join(__dirname, '/../../../public') + '/log_phones.txt',
        [
            [now.getDate(), now.getMonth()  + 1, now.getFullYear()].join('.'),
            phone,
            name,
            vin,
            comment
        ].join(' | ') + "\n",
        (error) => { }
    );


    ctx.redirect(ctx.router.url('home', { query: { success: 1 } }))
}
