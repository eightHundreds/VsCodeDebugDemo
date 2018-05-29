# 演示

```
yarn install
```
or
```
npm install
```

## 演示1:babel-register

1. 打断点
2. F5(选择 `启动程序(koa-with-babel)`)
3. 请求 http://localhost:10086

## 演示2:babel-cli

0. 打断点
1. 把index.js中的`require("babel-register")`注释掉
2. babel . --out-dir build --ignore .\node_modules\ --source-maps
3. F5(选择 `启动程序builded(koa-with-babel)`)
4. 请求 http://localhost:10086

## 演示3:babel-cli之bebel-node

1. 打断点
2. F5(选择 `启动程序with babel-node(koa-with-babel)`)
4. 请求 http://localhost:10086

# Babel

babel的作用我不细讲,简单的说就是让你能用上新的语言特性,然而目前nodejs大部分es特性都能用了(但es的模块系统,即import,export,迟迟目前还是不能支持),具体请看[这里](https://node.green/)

所以一般情况下是不需要babel的,折腾它实在是太麻烦了,不如使用高版本的LTS
但使用新特性的需求总是会有的

使用babel主要有三种方式

第一种与第二种都是使用cli

```
npm install babel-cli --save-dev
```

安装后你拥有了两个名号工具`babel`,与`babel-node`,前者类似gcc一样,用于编译代码,后者类似`node`,并且允许你使用es语法

第三种是babel-register

```
npm install babel-register
```
只要在入口文件处`require("babel-register");`就能自动编译文件


最后,本文**主推**不使用babel(在node场景下),退而求其次使用较简单的`babel-register`,最后正规做法是使用`babel`编译文件


## babel-register

首先介绍babel-register

### 安装与配置

上文说的babel-cli和babel-register都需要配合`preset`就好比买了红白机就要买卡带
preset可以是`babel-preset-es2015`,`babel-preset-stage-0`等,但现在都流行`babel-preset-env`


```
npm install babel-register babel-runtime
npm install babel-preset-env babel-plugin-transform-runtime --save-dev
```

- `babel-plugin-transform`不是必选的,但它有助于减少编译生成的代码和全局变量
- `babel-runtime`是生成环境下用的


创建index.js
```
require("babel-register")
// require("babel-register")({/* 写配置,配置项包括了`.babelrc`的配置项,但是`.babelrc`优先级更高 */ })
require('babel-polyfill')
require('./app')
```

- 在index.js不能用任何高级语法,但被index.js引用的文件就能用了
- babel主要负责支持新语法,而新规范中引入的新的类(如Promise)则需要polyfill支持
  - 在入口处导入`require('babel-polyfill')`
  - `babel-runtime`与它并不冲突,在引入`babel-runtime`前,polyfill会以全局变量的形式注入,引入后则通过require导入,详情请看[官方文档](https://babeljs.cn/docs/plugins/transform-runtime#%E4%B8%BA%E4%BB%80%E4%B9%88),或者通过[演示2:babel-cli](#演示2:babel-cli)编译后的代码查看


最后一步配置`.babelrc`
``` JSON
{
  "presets": [
    [
      "env",
    ]
  ],
  "plugins": ["transform-runtime"],
  "retainLines": true,
  "sourceMaps": true
}
```

> retainLines能确保生成代码的行号与源码一致,如果不这样配,在源码的断点会断不上

再配置调试
``` JSON
{
    "type": "node",
    "request": "launch",
    "name": "启动程序",
    "program": "${workspaceFolder}\\index.js",
    "sourceMaps": true,
    "smartStep": true,
    "skipFiles": ["${workspaceRoot}\\node_modules\\**\\*.js", "<node_internals>/**/*.js"]
},
```

> skipFiles能让你在调试时跳过烦人的内部源码

后续过程就是 [演示1:babel-register](#演示1:babel-register)

最后的结果其实还是差强人意,同步代码能很正常的运行,问题出在async function,如果你运行过演示会发现,在运行到await语句前,再按F10(步进)就会跳到方法名那里。再回头对比simple-koa-debug案例(不用babel),这里会很自然地,像同步代码一样走下去

这个问题至今没找到直接地解决办法,最后只能尽可能地不让babel编译async,所以修改下``.babelrc``,指定编译目标为当前node版本(我目前用的是v8.11.1)

```
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  "plugins": ["transform-runtime"],
  "retainLines": true,
  "sourceMaps": true
}
```

最后官方的说法

> babel-register不适合用于生产环境下,主要推荐用于简单的情况下。

## babel-cli

这是比较正式的方式,将源码编译,发布时就用编译后的代码,为此你需要为你的项目写一些run-script或脚本规范构建流程,但这不是本文重点,可以参考[这个](https://github.com/17koa/koa2-startkit)(的bin目录)

### 安装与配置

```
npm install babel-runtime
npm install babel-preset-env babel-plugin-transform-runtime babel-cli --save-dev
```

`.babelrc`的配置与上面一样(根据我的试验去掉`"retainLines": true,`也是可以的)

调试配置也差不多,改个路径就行
``` JSON
{
    "type": "node",
    "request": "launch",
    "name": "启动程序builded",
    "program": "${workspaceFolder}\\build\\index.js",
    "sourceMaps": true,
    "smartStep": true,
    "outFiles": ["${workspaceRoot}\\build\\**\\*.js"],
    "skipFiles": ["${workspaceRoot}\\node_modules\\**\\*.js", "<node_internals>/**/*.js"]
}
```

剩下的就是[演示2:babel-cli](#演示2:babel-cli)

### babel-node

官方强烈不推荐在生产环境下使用babel-node

同时这也是最简单的调试方式,它也会自动编译,所以不需要babel-register,也会自动引入polyfiil,所以不需要babel-polyfiil,因为是生产环境,对生成代码的质量没要求,所以也不需要transform-runtime

步骤:

1. 安装
```
npm install babel-preset-env babel-cli --save-dev
```
2. 配置babelrc,参考前文
3. 调试配置(注意program是app.js,而不是index.js,runtimeExecutable默认是node现在改为babel-node)
``` JSON
{
    "type": "node",
    "request": "launch",
    "name": "启动程序with babel-node",
    "runtimeExecutable": "babel-node",
    "program": "${workspaceFolder}\\app.js",
    "sourceMaps": true,
    "smartStep": true,
    "skipFiles": ["${workspaceRoot}\\node_modules\\**\\*.js", "<node_internals>/**/*.js"]
},
```


# 补充

## 自动编译

在演示2:babel-cli中,你需要自己手动编译,这里可以借助vscode的task将编译自动化
你可以直接F5(选择 `启动程序with auto compile(koa-with-babel)`)查看效果**(注意一定要先注释掉index.js的`require("babel-register")`)**

具体步骤:

在.vscode文件夹中创建tasks.json
``` JSON
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "compile",
      "type": "shell",
      "command": "babel",
      "args": [
        ".",
        "--out-dir",
        "build",
        "--ignore",
        ".\\node_modules\\,.\\build\\",
        "--source-maps"
      ]
    }
  ]
}
```
修改调试配置,与启动程序builded相比,就多了一个`"preLaunchTask": "compile",`
``` JSON
{
    "type": "node",
    "request": "launch",
    "name": "启动程序with auto compile",
    "program": "${workspaceFolder}\\build\\index.js",
    "sourceMaps": true,
    "smartStep": true,
    "preLaunchTask": "compile",
    "outFiles": ["${workspaceRoot}\\build\\**\\*.js"],
    "skipFiles": ["${workspaceRoot}\\node_modules\\**\\*.js", "<node_internals>/**/*.js"]
}
```




# 参考

- https://pranavprakash.net/2017/10/18/debugging-es2017-async-await-in-vs-code-using-source-maps/
- [transform-runtime](https://babeljs.cn/docs/plugins/transform-runtime#%E4%B8%BA%E4%BB%80%E4%B9%88)