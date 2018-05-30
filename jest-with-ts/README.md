
# 演示

```
yarn install
```
or
```
npm install
```

1. 设断点
2. **打开index.test.ts**
3. F5启动(选择ts-jest(jest-with-ts))

# ts-jest

ts-jest是一个TypeScript预处理器，支持Jest的源代码映射，可让您使用Jest测试用TypeScript编写的项目。

配置,为了简单,直接将jest配置写到package.json中
``` JSON
{
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
}
```

- transform 当你使用一种node不支持的语言编写(如新es语法,typescript),则需要这个配置项目指出将哪些文件交给哪个转换器
- testRegex jest是个开箱即用的测试框架,它默认会把`*.test.js`作为测试文件并执行(还有其他默认行为不一一写出)
- moduleFileExtensions 修改要识别的模块扩展名

添加tsconfig.json,你可以修改ts-jest要使用的tsconfig.json的路径,详情见文末的ts-jest document
``` JSON
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "sourceMap": true,
  }
}
```
添加调试配置,这里与simple-jest场景没太大区别
``` JSON
{
    "type": "node",
    "name": "ts-jest",
    "request": "launch",
    "args": [
        "--runInBand",
        "--env=node",
        "${fileBasename}"
    ],
    "cwd": "${workspaceFolder}",
    "console": "integratedTerminal",
    "sourceMaps": true,
    "smartStep": true,
    "internalConsoleOptions": "neverOpen",
    "program": "${workspaceFolder}/node_modules/jest/bin/jest"
}
```

# 参考

- [ts-jest](https://github.com/kulshekhar/ts-jest)
    - [ts-jest document](https://github.com/kulshekhar/ts-jest/blob/e1f95e524ed62091736f70abf63530f1f107ec03/README.md)
