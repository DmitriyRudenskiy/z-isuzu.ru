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
    let sourceId = (ctx.request.body.source_id || -1) * 1
    let email = ctx.request.body.email || 'нет'
    let subject = ctx.request.body.subject || 'нет'
    let name = ctx.request.body.name || 'нет'
    let phone = ctx.request.body.phone || '0'
    let vin = ctx.request.body.vin || 'нет'
    let comment = ctx.request.body.comment || 'нет'
    const now = new Date()

    if (email) {
        email = email.trim().toLowerCase()
    }

    if (subject) {
        subject = subject.trim()
    }

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
        sourceId,
        email,
    })

    Mailer(
        process.env.MAILGUN_ADMIN,
        'Тестовое сообщение для проверки',
        null,
        message
    )
    // ctx.body = message

    fs.appendFile(
        path.join(__dirname, '/../../../public') + '/log_phones.txt',
        [
            [now.getDate(), now.getMonth() + 1, now.getFullYear()].join('.'),
            sourceId,
            phone,
            name,
            vin,
            comment,
        ].join(' | ') + '\n',
        error => {}
    )

    ctx.redirect(ctx.router.url('home', { query: { success: 1 } }))
}
