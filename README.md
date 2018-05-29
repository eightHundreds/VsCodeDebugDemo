# 前言

探究vscode的debug技巧
每种情况都放到一个文件夹下

# 情况列表

- [X] simple-koa koajs应用的简单使用
- [X] koa-with-babel 使用babel的koajs应用


# 参考资料

- [Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)
    - 在调试配置中用到的变量,比如`${workspaceFolder}`
- [glob 语法](https://github.com/Microsoft/vscode/blob/96cee4a6f0ed8db82e391f10733428225b43dc53/src/vs/base/common/glob.ts#L431)
    - glob时简化版的正则表达式
    - vscode中路径相关的配置用的是glob,大部分情况下只用`*`就够了
    - vscode是自己实现的glob,所以与你在其他技术文档看的不一样,如果有稍微高级的需求,请看该[链接](https://github.com/Microsoft/vscode/blob/44aa6c8aac6207f4e4d057287fa8a4cca18c7550/src/vs/base/test/node/glob.test.ts)

# [采坑记录](./采坑记录.md)

记录在写这些Demo时遇到的问题