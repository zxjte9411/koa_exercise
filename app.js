const Koa = require('koa')
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const static = require('koa-static')

const path = require('path');

const app = new Koa();
const router = Router();

//靜態資源目錄對於相對入口文件 app.js 的路徑
const STATIC_PATH = __dirname + '/static'
const staticPath = './static'

app.use(static(
    path.join(__dirname, staticPath)
))

app.use(views(STATIC_PATH + '/pages', {
    extension: 'html'
}));
app.use(bodyParser());
app.use(logger())
app.use(router.routes());

// Router -> /
router.get('/', async (ctx, next) => {
    await ctx.render('index')
});

// Router -> /test
router.get('/test', async (ctx, next) => {
    ctx.body = `
    <form method="POST" action="/test">
    <input name="" type="hidden" value="">
    <button type="submit">點一下阿</button>
    </form>
    `;
});

