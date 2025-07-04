// 测试新的worker.js文件
const http = require('http');

// 模拟Cloudflare Workers环境
global.addEventListener = function(event, handler) {
  if (event === 'fetch') {
    global.fetchHandler = handler;
  }
};

global.Response = class {
  constructor(body, options = {}) {
    this.body = body;
    this.headers = options.headers || {};
    this.status = options.status || 200;
  }
};

// 加载worker.js
require('./worker.js');

// 创建测试服务器
const server = http.createServer(async (req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // 模拟fetch事件
  const mockRequest = {
    method: req.method,
    url: `http://localhost:3000${req.url}`
  };
  
  const mockEvent = {
    request: mockRequest,
    respondWith: function(responsePromise) {
      responsePromise.then(response => {
        // 设置响应头
        Object.entries(response.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        
        res.statusCode = response.status;
        res.end(response.body);
      }).catch(error => {
        console.error('Error:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    }
  };
  
  // 调用worker的fetch处理器
  if (global.fetchHandler) {
    global.fetchHandler(mockEvent);
  } else {
    res.statusCode = 500;
    res.end('Worker not loaded');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Worker测试服务器启动成功！`);
  console.log(`📱 访问地址: http://localhost:${PORT}`);
  console.log(`🔧 这是worker.js的测试版本`);
  console.log(`⏹️  按 Ctrl+C 停止服务器`);
});
