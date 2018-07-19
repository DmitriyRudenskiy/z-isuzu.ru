import path from 'path'
import Koa from 'koa'
import helmet from 'koa-helmet'
import serve from 'koa-static'
import render from 'koa-swig'
import co from 'co'
import compress from 'koa-compress'
import router from './http/routers'
import minifier from './http/middleware/minifier'

const app = new Koa()
    .use(serve(path.join(__dirname, '/../public')))
    .use(helmet())
    .use(compress())
    //.use(minifier)
    .use(router.routes())
    .use(router.allowedMethods())

app.use((ctx, next) => {
    ctx.compress = true
    ctx.body = fs.createReadStream(file)
})

app.context.render = co.wrap(
    render({
        root: path.join(__dirname, './/views'),
        autoescape: true,
        cache: false, // 'memory', // disable, set to false
        ext: 'twig',
        writeBody: false,
        locals: {
            route: function(name, params) {
                return router.url(name, params)
            }
        },
    })
)

// error
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.message = err.message || 'Sorry, an error has occurred.'
    }
})

module.exports = app
