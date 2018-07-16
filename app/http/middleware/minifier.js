import { minify } from 'html-minifier'

module.exports = async (ctx, next) => {
    await next()

    if (!ctx.response.is('html')) {
        return
    }

    let body = ctx.body

    if (!body || body.pipe) {
        return
    }

    if (Buffer.isBuffer(body)) {
        body = body.toString()
    }

    ctx.body = minify(body, {
        caseSensitive: true,
        collapseWhitespace: true,
        quoteCharacter: '"',
    })
}
