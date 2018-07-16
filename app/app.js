import Koa from 'koa'
import render from 'koa-swig'
import co from 'co'
import compress from 'koa-compress'
import minifier from './http/middleware/minifier'
const app = new Koa();

app.use(compress());

// minifier HTML
app.use(minifier);

// render
app.context.render = co.wrap(render({
    root: 'app/views',
    autoescape: true,
    cache: false, // 'memory', // disable, set to false
    ext: 'twig',
    writeBody: false
}));

app.use(async ctx => {
    ctx.body = await ctx.render('home/index')
});

module.exports = app;