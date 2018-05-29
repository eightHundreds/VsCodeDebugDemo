# 演示

```
yarn install
```
or
```
npm install
```

## 演示1:ts-node

1. 打断点
2. F5(选择 `启动程序(koa-with-ts)`)
3. 请求 http://localhost:10086

## 演示2:compiled

调试编译后的代码

1. 打断点
2. F5(选择 `启动程序compiled(koa-with-ts)`) // 由于配了preLaunchTask 调试前自动执行编译
3. 请求 http://localhost:10086


# Typescript

babel的作用是将新语法转换成目标环境可允许的代码,Typescript的作用类似,即将又新又厉害的语法转换成可执行的js

使用Typescript后,生产环境的代码肯定是要编译后的,毕竟node不懂ts
在开发时,可以选择ts-node(类似babel-node)调试代码,或者直接调试编译后的代码

这里我推荐ts-node,因为比较简单(koa-with-babel那个案例我要改推荐babel-node)

## ts-node

### 安装与配置

```
npm install typescript ts-node --save-dev
```

创建配置文件 tsconfig.json,这是个类似,.babelrc的文件,影响tsc的编译
``` JSON
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "sourceMap": true,
    "outDir": "./build"
  },
  "exclude": ["./build/**/*"]
}
```

- target 设置将代码编译为es6
- module 选择模块系统,node环境当然要用commonjs
- outDir 编译结果输出目录
- exclude 忽略文件夹,tsc默认会编译当前文件夹,用该配置忽略掉不想被编译的文件(夹)

添加调试配置,直接执行ts-node的内部文件命令行`ts-node`内部就是调用`ts-node\\dist\\bin.js`
``` JSON
 {
    "type": "node",
    "request": "launch",
    "name": "启动程序",
    "program": "${workspaceFolder}\\node_modules\\ts-node\\dist\\bin.js",
    "args": [
        "${workspaceFolder}\\index.ts"
    ],
    "smartStep": true,
    "skipFiles": ["${workspaceFolder}\\node_modules\\**\\*","<node_internals>/**/*.js"],
}
```

剩下的就是[演示1:ts-node](#演示1:ts-node)

## 调试编译后的代码

跟babel场景类型,先编译,再当作js调试
添加一个task.json,增加一个编译 task
``` JSON
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "typescript",
            "label": "compile",
            "tsconfig": "koa-with-ts\\tsconfig.json",
            "problemMatcher": [
                "$tsc"
            ]
        }
    ]
}
```
tsconfig.json就用上面的,不用改
增加一个调试配置
```
{
    "type": "node",
    "request": "launch",
    "name": "启动程序compiled",
    "program": "${workspaceFolder}\\build\\index.js",
    "sourceMaps": true,
    "smartStep": true,
    "skipFiles": ["${workspaceFolder}\\node_modules\\**\\*","<node_internals>/**/*.js"],
    "preLaunchTask": "compile"
},
```

剩下的就是[演示2:compiled](#演示2:compiled)

# Tips

babel和tsc都有一个`--watch`选项,意思是如果文件被修改就自动编译  
上面介绍的调试以及babel场景中,都用了"preLaunchTask",让调试启动前编译代码,有时候你在没修改代码时就再次启动调试,这样就会产生无用的编译,如果这个编译时间又长,就造成大量的浪费.
一种做法是删掉"preLaunchTask",手动执行`tsc`/`babel`,而这里可以用`--watch`来自动化执行

# 参考

- [ts编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

# 仍然存在的问题

- [] skipFiles设置为`${workspaceFolder}\\node_modules\\**\\*.{js,ts}`时无效,似乎最后的`{js,ts}`出了问题
- [] vscode的skipFiles[目前还不支持跳过ts](https://github.com/Microsoft/vscode/issues/19308)