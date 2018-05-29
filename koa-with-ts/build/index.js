"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const app = new Koa();
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.response.body = "hello word";
    ctx.response.status = 200;
    yield next();
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(ctx.request.path);
    if (ctx.request.path.endsWith("error")) {
        throw new Error('something wrong');
    }
    yield next();
}));
app.on("error", (error, ctx) => {
    console.log("Error", error);
});
app.listen(10086, () => {
    console.log("app running");
});
//# sourceMappingURL=index.js.map