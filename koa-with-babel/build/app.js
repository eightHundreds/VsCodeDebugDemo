"use strict";var _koa = require("koa");var _koa2 = _interopRequireDefault(_koa);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const app = new _koa2.default();

app.use(async (ctx, next) => {
  ctx.response.body = "hello word";
  ctx.response.status = 200;
  await next();
});
app.use(async (ctx, next) => {
  if (ctx.request.path.endsWith("error")) {
    throw new Error("something wrong");
  }
  await next();
});
app.on("error", (error, ctx) => {
  console.log("Error", error);
});
app.listen(10086, () => {
  console.log("app running");
});
//# sourceMappingURL=app.js.map