// 构建脚本：将拆分的文件合并到worker.js中
const fs = require('fs');

console.log('🔧 开始构建worker.js...');

// 读取各个文件的内容
const htmlContent = fs.readFileSync('index.html', 'utf8');
const cssContent = fs.readFileSync('styles.css', 'utf8');
const scriptContent = fs.readFileSync('script.js', 'utf8');
const apiCheckersContent = fs.readFileSync('api-checkers.js', 'utf8');

// 转义模板字符串中的特殊字符
function escapeTemplateString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

// 生成worker.js内容
const workerContent = `addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // 只处理 GET 请求
  if (request.method !== "GET") {
    return new Response("Not Found", { status: 404 });
  }
  
  // 根据路径返回不同的文件
  switch (pathname) {
    case "/":
    case "/index.html":
      return new Response(htmlContent, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    case "/styles.css":
      return new Response(cssContent, {
        headers: { "Content-Type": "text/css;charset=UTF-8" },
      });
    case "/script.js":
      return new Response(scriptContent, {
        headers: { "Content-Type": "application/javascript;charset=UTF-8" },
      });
    case "/api-checkers.js":
      return new Response(apiCheckersContent, {
        headers: { "Content-Type": "application/javascript;charset=UTF-8" },
      });
    default:
      return new Response("Not Found", { status: 404 });
  }
}

// HTML内容
const htmlContent = \`${escapeTemplateString(htmlContent)}\`;

// CSS内容
const cssContent = \`${escapeTemplateString(cssContent)}\`;

// JavaScript内容
const scriptContent = \`${escapeTemplateString(scriptContent)}\`;

// API检测器内容
const apiCheckersContent = \`${escapeTemplateString(apiCheckersContent)}\`;
`;

// 写入worker.js文件
fs.writeFileSync('worker.js', workerContent);

console.log('✅ worker.js构建完成！');
console.log('📁 文件包含：');
console.log('  - index.html (' + htmlContent.length + ' 字符)');
console.log('  - styles.css (' + cssContent.length + ' 字符)');
console.log('  - script.js (' + scriptContent.length + ' 字符)');
console.log('  - api-checkers.js (' + apiCheckersContent.length + ' 字符)');
console.log('🚀 现在可以部署到Cloudflare Workers了！');
