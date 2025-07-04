// 本地测试服务器
const http = require('http');
const fs = require('fs');
const path = require('path');

// 读取 worker.js 文件
const workerContent = fs.readFileSync('worker.js', 'utf8');

// 提取 HTML 内容
const htmlMatch = workerContent.match(/const htmlContent = `([\s\S]*?)`;/);
if (!htmlMatch) {
  console.error('无法从 worker.js 中提取 HTML 内容');
  process.exit(1);
}

const htmlContent = htmlMatch[1];

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(htmlContent);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 本地测试服务器启动成功！`);
  console.log(`📱 访问地址: http://localhost:${PORT}`);
  console.log(`🔧 这是 worker.js 的本地测试版本`);
  console.log(`⏹️  按 Ctrl+C 停止服务器`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
