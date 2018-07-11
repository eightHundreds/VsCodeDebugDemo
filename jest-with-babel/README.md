
# 演示

未完成,目前会出现,打到index.js中的断点在调试时会错乱的问题

目前这个问题并未找到解决办法,[相关StackOverflow](https://stackoverflow.com/questions/48998572/jest-babel-in-vs-code-debugger-causes-breakpoints-to-move#)

```
yarn install
```
or
```
npm install
```

1. 设断点
2. **打开index.test.js**
3. F5启动(选择babel-jest(jest-with-babel))


#babel-jest

安装jest时会自动安装`babel-jest`,并且会自动读取默认路径下的.babelrc去编译你的代码,如果想取消这个行为
```
// package.json
{
  "jest": {
    "transform": {}
  }
}
```