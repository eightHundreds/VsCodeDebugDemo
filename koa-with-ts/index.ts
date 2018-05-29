import * as Koa from 'koa'

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.response.body = "hello word";
  ctx.response.status = 200;
  await next();
});
app.use(async (ctx, next) => {
  console.log(ctx.request.path);
  if (ctx.request.path.endsWith("error")) {
    throw new Error('something wrong')
  }
  await next();
});
app.on("error", (error, ctx) => {
  console.log("Error", error);
});
app.listen(10086, () => {
  console.log("app running");
});
