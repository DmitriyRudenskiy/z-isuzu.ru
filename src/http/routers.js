import Router from 'koa-router'
const router = Router()

module.exports = router

router.get('/ping', async (ctx, next) => {
    ctx.body = 'pong'
})

router.get('/', async (ctx, next) => {
    ctx.body = await ctx.render('home/index')
})
