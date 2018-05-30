# 演示

```
yarn install
```
or
```
npm install
```

1. 设断点
2. **打开index.test.js**
3. F5启动(选择vscode-jest-test(simple-jest))

jest是facebook出品的单元测试框架

本场景是非常简单的例子,所以jest几乎不用配置
所以直接讲调试配置
``` JSON
{
    "type": "node",
    "name": "vscode-jest-tests",
    "request": "launch",
    "args": [
        "--runInBand",
        "--env=node",  
        "${fileBasename}"
    ],
    "cwd": "${workspaceFolder}",
    "console": "integratedTerminal",
    "internalConsoleOptions": "neverOpen",
    "program": "${workspaceFolder}/node_modules/jest/bin/jest"
}
```

这段配置参考了vscode-jest(VSCode扩展)生成的配置

- program 直接命令行jest
- cwd 设置当前工作目录路径
- args jest运行时传入的参数
    - `--runInBand` 仅在当前的进程中连续运行所有测试，而非通过创建的子进程的工作池来运行测试
    - `--env`设置测试环境,默认是jsdom(类似浏览器环境),现改为node环境
    - `${fileBasename}` 是当前打开文件的文件名
- console 默认情况下调试时用的是内置的终端,即"调试控制台","integratedTerminal"将它改为当前的终端
- internalConsoleOptions 由于上面console的设置,就要修改内置的终端的行为,设置它不开启

其中console,internalConsoleOptions不设置也能正常使用
vscode-jest为什么要加这两个配置,我目前还没弄懂


# 补充

vscode-jest是目前功能最丰富jest扩展,但根据我的经历它仍然不够完善,请慎用


# 参考资料

- [jest官方文档](https://facebook.github.io/jest/docs)