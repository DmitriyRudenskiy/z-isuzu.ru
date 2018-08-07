import geoip from './middleware/geoip'
import CatalogController from './controllers/catalog.controller'
import MailController from './controllers/mail.controller'
import Router from 'koa-router'

const router = Router()

module.exports = router

router.all('*', async (ctx, next) => {
    let cityId = ctx.cookies.get('city')

    if (cityId) {
        const result = geoip(ctx.ip)

        if (result !== null) {
            cityId = result.city
            ctx.cookies.set('city', cityId)
        }
    }

    ctx.state.cityId = cityId

    await next()
})

router.get('/.well-known/acme-challenge/:key', async (ctx, next) => {
    ctx.type = 'text/html'
    ctx.body =
        '-pQfRJ7qgbcUbz7bxuUYclE8fQzne0vJ-hTOUzGRsBQ.qK4ArxdwvBGKj9YFnSfag1bnCEdFLJg6EosqHxAr2Kg'
})

router.get('test_ping', '/.ping', async (ctx, next) => {
    ctx.body = 'pong'
})

router.get('/mail', MailController.test)
router.post('callback_send', '/callback/send', MailController.send)

router.get('home', '/', CatalogController.index)
router.get(
    'front_product_view',
    '/view/:id/product/:sparePartId',
    CatalogController.product
)
router.get(
    'front_category_view',
    '/view/:id/list/:sparePartId',
    CatalogController.category
)
router.get('front_model_view', '/view/:id', CatalogController.view)
