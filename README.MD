# KeyCheck - 硅基流动 Token 检测工具

一个基于 Cloudflare Workers 的工具，用于批量检测硅基流动 API Keys 的有效性和余额状态。

## 功能

- 批量检测 API Keys 有效性
- 查询账号余额
- 支持并发请求
- 自定义余额阈值
- 一键复制有效账号

## 使用说明

1. 输入需要检测的 API Keys（支持逗号、分号或换行分隔）
2. 设置最低余额阈值
3. 点击"开始检测账号"
4. 查看检测结果
5. 复制有效账号

## 技术栈

- Cloudflare Workers
- HTML/CSS/JavaScript
- 硅基流动 API

## 开发/部署

### 进入项目目录
```bash
cd keycheck
```

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 部署到 Cloudflare
```bash
npm run deploy
```


## License

## 演示地址：https://keycheck.hzruo.ggff.net/

MIT