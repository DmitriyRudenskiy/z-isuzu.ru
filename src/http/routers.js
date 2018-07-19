import geoip from './middleware/geoip'
import CatalogController from './controllers/catalog.controller.js'
import Router from 'koa-router'

const router = Router()

module.exports = router

router.all('*', async (ctx, next) => {

    let cityId = ctx.cookies.get('city_id') * 1;

    if (cityId) {
        const result = geoip(ctx.ip)

        if (result !== null) {
            cityId = result.city.geoname_id || 0
            ctx.cookies.set('city_id', cityId);
        }
    }

    ctx.state.cityId = cityId;

    await next();
})

router.get('/.well-known/acme-challenge/:key', async (ctx, next) => {
    ctx.type = 'text/html'
    ctx.body =
        '-pQfRJ7qgbcUbz7bxuUYclE8fQzne0vJ-hTOUzGRsBQ.qK4ArxdwvBGKj9YFnSfag1bnCEdFLJg6EosqHxAr2Kg'
})

router.get('test_ping', '/.ping', async (ctx, next) => {
    ctx.body = 'pong'
})

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
