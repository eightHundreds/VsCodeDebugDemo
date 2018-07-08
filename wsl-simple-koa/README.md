# 演示

```
yarn install
```
or
```
npm install
```

1.  打断点
2.  F5(选择 `启动程序(wls-simple-koa)`)
3.  请求 http://localhost:10086


# 在WSL下调试

WSL(Windows Subsystem for Linux)是window近几年出来的新功能,允许用户在window中使用linux环境,使用方便,占用资源小
'程序员就应该用linux和mac'已经是过去时,个人认为win10才是最有效率的开发环境.

配置很简单,相比simple-koa场景,只需要在配置中加一个`useWSL:true`
```
{
    "type": "node",
    "request": "launch",
    "name": "启动程序",
    "program": "${workspaceFolder}\\index.js",
    "useWSL": true
}
```


# 踩坑

1. 之前我很喜欢用zsh,并且想把wsl中默认的命令行换成zsh,然而网上找的`chsh`命令在wsl中并不管用.于是我修改`.bashrc`让其自动启动zsh,但是这个配置会导致调试失败(启动时vscode会提示响应超时),目前没有解决办法,就是把`.bashrc`还原,不让它在启动时切换命令行

2. 小心wsl会将window中的环境变量载入,所以在wsl中你要确保wsl中的node优先被使用
