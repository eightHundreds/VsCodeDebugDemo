# 前言

探究vscode的debug技巧
每种场景都放到一个文件夹下

# 场景列表

我暂时将场景分为基础和非基础,基础场景的README会介绍的更详细.非基础场景可能就是由基础场景组合而成,我会假定你看过基础场景,在README中不会写得太详细

我选择koa作为主角,它是个非常简单的框架,简单地像个库,而且又有express的影子.所以不管你是想调试一个库,还是一个web应用,都能快速地从案例代码获得帮助

**基础场景**

- [X] simple-koa koajs应用的简单使用
- [X] koa-with-babel 使用babel的koajs应用
- [X] koa-with-ts 使用typescript的koajs应用
- [] simple-jest jest单元测试

**非基础场景**

- [] jest-with-babel 使用babel的jest单元测试
- [] jest-with-ts 使用typescript的单元测试



# 参考资料

- [Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)
    - 在调试配置中用到的变量,比如`${workspaceFolder}`
- [glob 语法](https://github.com/Microsoft/vscode/blob/96cee4a6f0ed8db82e391f10733428225b43dc53/src/vs/base/common/glob.ts#L431)
    - glob时简化版的正则表达式
    - vscode中路径相关的配置用的是glob,大部分情况下只用`*`就够了
    - vscode是自己实现的glob,所以与你在其他技术文档看的不一样,如果有稍微高级的需求,请看该[链接](https://github.com/Microsoft/vscode/blob/44aa6c8aac6207f4e4d057287fa8a4cca18c7550/src/vs/base/test/node/glob.test.ts)

# [采坑记录](./采坑记录.md)

记录在写这些Demo时遇到的问题