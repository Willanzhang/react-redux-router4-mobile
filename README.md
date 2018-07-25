## 完整项目学习

## develop 是关于服务端渲染的分支
```
用了react16 的renderToNodeStream 节点流处理 html 结构字符串 hydrate替代render渲染
以及css-modules-require-hook 处理 stylus
    asset-require-hook 处理图片
```
## 思考
```
server渲染的 server生产环境 即依赖client 开发环境 又依赖client build后的打包文件导致 
需要将整个项目需要部署到 web服务器上  开玩笑吧....
```