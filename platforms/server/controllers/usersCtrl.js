export default async(ctx, next) => {
    ctx.body = {
        status: 0,
        info: [{
            name: 'name1'
        }, {
            name: 'name2'
        }, {
            name: 'name3'
        }, ]
    }
}
