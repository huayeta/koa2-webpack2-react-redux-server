
export default async(ctx, next) => {
    // api server through koa-router
    if (ctx.path.match(/^\/api/)) {
        return await require('./api').routes()(ctx, next)
    }
    // others react-router to render
    await require('./render')(ctx, next)
}
