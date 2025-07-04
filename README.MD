# 🔑 API KEY 检测工具

一个基于 Cloudflare Workers 的现代化工具，支持多种 AI 服务提供商的 API KEY 批量检测，包括有效性验证、余额查询和智能分类管理。

## ✨ 核心功能

### 🌐 多提供商支持
- **OpenAI 通用**: 支持所有 OpenAI 兼容的 API（可自定义 Base URL 和测试模型）
- **硅基流动**: 完整的余额查询和有效性检测
- **Google Gemini**: API KEY 有效性验证

### 🚀 智能检测
- **批量处理**: 支持大量 API KEY 并发检测
- **智能分类**: 自动分类为有效、无效、限流、低余额等状态
- **429 限流识别**: 单独分类限流 KEY，避免误判为无效
- **去重处理**: 自动识别和处理重复的 KEY

### 📋 便捷操作
- **文件导入**: 支持从 .txt 文件批量导入 KEY
- **灵活复制**: 支持逗号分隔或换行分隔的复制格式
- **卡片内操作**: 复制功能直接集成在结果卡片中
- **自定义弹窗**: 美观的操作反馈提示

### 🎨 现代化界面
- **响应式设计**: 完美适配桌面端和移动端
- **美观 UI**: 现代化的渐变设计和动画效果
- **直观操作**: Radio 按钮选择，操作简单明了
- **实时反馈**: 即时的操作状态提示

## 📱 使用说明

### 1. 选择 API 提供商
使用 Radio 按钮选择要检测的 API 提供商：
- **OpenAI 通用**（默认）: 可配置 Base URL 和测试模型
- **硅基流动**: 支持余额查询
- **Google Gemini**: 基础有效性检测

### 2. 输入 API KEYS
- **手动输入**: 支持逗号、分号或换行分隔
- **文件导入**: 点击"📁 导入文件"从 .txt 文件导入

### 3. 配置参数（可选）
- **OpenAI Base URL**: 自定义 API 端点
- **测试模型**: 指定用于验证的模型
- **余额阈值**: 设置最低余额标准（仅硅基流动）
- **并发数**: 控制同时检测的 KEY 数量

### 4. 开始检测
点击"开始检测KEY"按钮，系统将自动：
- 并发检测所有 KEY
- 实时显示检测进度
- 智能分类检测结果

### 5. 查看和复制结果
- **分类显示**: 有效、限流、无效等分类展示
- **卡片操作**: 直接在结果卡片上选择复制格式
- **灵活复制**: 支持含余额信息和逗号分隔格式

## 🛠️ 技术栈

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **部署**: Cloudflare Workers
- **API 集成**: OpenAI、硅基流动、Google Gemini
- **设计**: 响应式设计 + 现代化 UI

## 📁 项目结构

```
keycheck/
├── index.html          # HTML结构文件
├── styles.css          # CSS样式文件
├── script.js           # 主要JavaScript逻辑
├── api-checkers.js     # API检测函数
├── build-worker.js     # 构建脚本（生成worker.js）
├── test-server.js      # 本地静态文件测试服务器
├── test-worker.js      # Worker模拟测试服务器
├── worker.js           # 生成的CF Workers部署文件
├── wrangler.toml       # Cloudflare Workers配置
├── package.json        # 项目配置
└── README.MD           # 项目说明文档
```

## 🛠️ 开发环境搭建

### 1. 克隆项目
```bash
git clone <repository-url>
cd keycheck
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发测试
```bash
# 启动静态文件服务器（开发版本）
node test-server.js
# 访问 http://localhost:3000

# 或使用Python简单服务器
python3 -m http.server 3000
```

### 4. Worker模拟测试
```bash
# 构建worker.js文件
node build-worker.js

# 启动Worker模拟服务器
node test-worker.js
# 访问 http://localhost:3001
```

## 🚀 部署流程

```bash
# 1. 开发完成后，重新构建
node build-worker.js

# 2. 登录Cloudflare
wrangler auth login

# 3. 构建项目
node build-worker.js

# 4. 部署
wrangler deploy

# 5. 查看部署状态
wrangler tail
```

## 🔧 开发工作流

### 文件拆分架构
本项目采用模块化开发架构，将原来的大型worker.js文件拆分为多个小文件：

1. **开发阶段**：编辑分离的文件
   - `index.html` - 页面结构
   - `styles.css` - 样式定义
   - `script.js` - 主要逻辑
   - `api-checkers.js` - API检测函数

2. **构建阶段**：自动合并文件
   ```bash
   node build-worker.js
   ```
   生成包含所有资源的`worker.js`文件

3. **测试阶段**：多环境验证
   ```bash
   # 开发环境测试
   node test-server.js

   # Worker环境测试
   node test-worker.js
   ```

4. **部署阶段**：一键部署
   ```bash
   wrangler deploy
   ```

### 开发注意事项

- **修改代码后**：必须运行`node build-worker.js`重新构建
- **测试功能**：建议同时在两个环境中测试（开发环境和Worker环境）
- **部署前**：确保`worker.js`是最新构建的版本
- **API配置**：可在`api-checkers.js`中修改API端点和参数

## ⚙️ 配置说明

### Cloudflare Workers配置
编辑`wrangler.toml`文件：
```toml
name = "keycheck"
main = "worker.js"
compatibility_date = "2025-07-01"

[env.production]
name = "keycheck-prod"
```

## 🧪 测试验证

### 功能测试清单
部署后请验证以下功能：

- ✅ **API提供商切换**：OpenAI、硅基流动、Gemini
- ✅ **文件导入功能**：支持.txt文件导入
- ✅ **KEY检测功能**：批量并发检测
- ✅ **结果分类显示**：有效、无效、限流、低余额等
- ✅ **复制功能**：支持含余额、逗号分隔选项
- ✅ **自定义弹窗**：操作反馈提示
- ✅ **响应式布局**：桌面端和移动端适配

### 常见问题排查

**Q: 部署后JavaScript功能失效？**
A: 确保运行了`node build-worker.js`重新构建，并且worker.js包含了最新的代码。

**Q: 样式显示异常？**
A: 检查CSS文件是否正确嵌入到worker.js中，可以通过浏览器开发者工具查看网络请求。

**Q: API检测失败？**
A: 检查API端点配置，确认网络连接正常，查看浏览器控制台错误信息。


## 🌐 演示地址

**在线演示**: https://keycheck.hzruo.ggff.net/

## 👨‍💻 技术支持

如有问题或建议，请提交 Issue 或联系开发者。

---

**⭐ 如果这个项目对您有帮助，请给个Star支持一下！**