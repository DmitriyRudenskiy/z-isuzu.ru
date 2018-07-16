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
  .use(minifier)
  .use(router.routes())
  .use(router.allowedMethods())

// render
app.context.render = co.wrap(
  render({
    root: path.join(__dirname, './/views'),
    autoescape: true,
    cache: false, // 'memory', // disable, set to false
    ext: 'twig',
    writeBody: false
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
