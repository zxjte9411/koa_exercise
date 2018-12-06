const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');

const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = Router();

const STATIC_PATH = __dirname + '/static'

/*async function reaction_time(ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}*/

function render(filename) {

  let fullpath = path.join(__dirname, filename);
  return fs.readFileSync(fullpath, 'binary');

}
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

// Router -> /about
router.get('/about', async (ctx, next) => {
  ctx.body = 'About Me';
});

router.get('/user', async (ctx, next) => {
  let name = ctx.query.name
  let msg = ctx.query.msg
  ctx.body = `<h1>${name}：${msg}</h1>`
})


router.get('/login', async (ctx, next) => {
  ctx.body = `
    <form method="POST" action="/login">
      <label>UserName</label>
      <input name="user" /><br/>
      <button type="submit">submit</button>
    </form>
  `;
});

router.post('/login', async (ctx, next) => {
  console.log(ctx)
  let user = ctx.request.body.user
  ctx.body = `<h1>Welocme,${user}!</h1>`
})

app.listen(3000);