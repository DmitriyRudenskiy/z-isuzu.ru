import path from 'path'
import Koa from 'koa'
import helmet from 'koa-helmet'
import serve from 'koa-static'
import Router from 'koa-router'
import render from 'koa-swig'
import co from 'co'
import compress from 'koa-compress'
import minifier from './http/middleware/minifier'

const router = Router()
const app = new Koa()
    .use(serve(path.join(__dirname, '/../public')))
    .use(helmet())
    .use(compress())
    .use(minifier)
    .use(router.routes())
    .use(router.allowedMethods())

// render
app.context.render = co.wrap(
    render({
        root: 'app/views',
        autoescape: true,
        cache: false, // 'memory', // disable, set to false
        ext: 'twig',
        writeBody: false,
    })
)

app.use(async ctx => {
    ctx.body = await ctx.render('home/index')
})

router.get('/ping', async function(ctx, next) {
    ctx.body = 'pong'
})

module.exports = app
