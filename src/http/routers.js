import CatalogController from './controllers/catalog.controller.js'

import Router from 'koa-router'
const router = Router()

module.exports = router



router.get('/.well-known/acme-challenge/:key', async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = '-pQfRJ7qgbcUbz7bxuUYclE8fQzne0vJ-hTOUzGRsBQ.qK4ArxdwvBGKj9YFnSfag1bnCEdFLJg6EosqHxAr2Kg'
})

router.get('/.ping', async (ctx, next) => {
    ctx.body = 'pong'
})

router.get('/', CatalogController.index)
