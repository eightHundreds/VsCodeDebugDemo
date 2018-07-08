# 前言

探究vscode的debug技巧
每种场景都放到一个文件夹下

# 场景列表

我将场景按一定顺序排列,靠前的场景偏基础,靠后的场景是前面场景的组合.基础场景的README会写得更细,靠后的则写得简单(我是假设你看过前面的基础场景),你可以根据场景的名称,去看基础的场景,比如`jest-react-enzyme-babel`,你就需要先看`simple-koa`,`koa-with-babel`,`simple-jest`,`jest-with-babel`

我选择了特定的库作为主角,但如果你用其他的库也能从案例代码中获得帮助

- koa 它是个非常简单的框架,简单地像个库,而且又有express的影子.所以不管你是想调试一个库,还是一个web应用,都能快速地从案例代码获得帮助


- [X] simple-koa koajs应用的简单使用
- [X] koa-with-babel 使用babel的koajs应用
- [X] koa-with-ts 使用typescript的koajs应用
- [x] simple-jest jest单元测试
- [x] *jest-with-babel 使用babel的jest单元测试*(未完成)
- [x] jest-with-ts 使用typescript的单元测试
- [x] wsl-simple-koa 用wsl中的node调试
- [] jest-react-enzyme-babel 使用enzyme的react单元测试


# 参考资料

- [Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference) 用于task.json和launch.json
    - ${workspaceFolder} 打开的文件夹路径
    - ${file} 当前打开的文件路径
    - 通过`${env:Name}=abc` 在命令行中设置环境变量,通过`${env:Name}`读取
    - ${command:commandName}执行命令,vscode很多操作都对应一个command,比如复制,粘贴,命令列表在"键盘快捷方式"中有
- [glob 语法](https://github.com/Microsoft/vscode/blob/96cee4a6f0ed8db82e391f10733428225b43dc53/src/vs/base/common/glob.ts#L431)
    - glob时简化版的正则表达式
    - vscode中路径相关的配置用的是glob,大部分情况下只用`*`就够了
    - vscode是自己实现的glob,所以与你在其他技术文档看的不一样,如果有稍微高级的需求,请看该[链接](https://github.com/Microsoft/vscode/blob/44aa6c8aac6207f4e4d057287fa8a4cca18c7550/src/vs/base/test/node/glob.test.ts)
- launch.json的默认配置就是"默认用户设置"(F1 首选项:打开用户设置),比如launch.json的internalConsoleOptions对应用户设置的debug.internalConsoleOptions
- [VSCode官方调试文档](https://code.visualstudio.com/docs/editor/debugging)

# TODO

- [] 在vscode中jest体验还是不够好,如何方便的过滤掉不想执行的测试?

# [采坑记录](./采坑记录.md)

记录在写这些Demo时遇到的问题