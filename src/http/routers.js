import CatalogController from './controllers/catalog.controller.js'

import Router from 'koa-router'
const router = Router()

module.exports = router

router.get('/ping', async (ctx, next) => {
    ctx.body = 'pong'
})

router.get('/', CatalogController.index)
