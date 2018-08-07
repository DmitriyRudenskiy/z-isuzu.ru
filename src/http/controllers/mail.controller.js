import Mailer from '../../services/mailgun.service'

const MailController = {}
module.exports = MailController

MailController.test = async (ctx, next) => {
    Mailer(process.env.MAILGUN_ADMIN, 'Тестовое сообщение для проверки', 'ping')

    ctx.body = 'Ok'
}

MailController.send = async (ctx, next) => {
    let { name, phone, vin, comment } = ctx.request.body

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

    ctx.redirect(ctx.router.url('home', { query: { success: 1 } }))
}
