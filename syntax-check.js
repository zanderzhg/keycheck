// 语法检查脚本
const fs = require('fs');

try {
  // 读取 worker.js 文件
  const workerContent = fs.readFileSync('worker.js', 'utf8');
  
  // 提取 JavaScript 部分
  const scriptMatch = workerContent.match(/<script>([\s\S]*?)<\/script>/);
  
  if (!scriptMatch) {
    console.error('❌ 无法找到 <script> 标签');
    process.exit(1);
  }
  
  const jsCode = scriptMatch[1];
  
  // 尝试解析 JavaScript 代码
  try {
    // 使用 Function 构造函数来检查语法
    new Function(jsCode);
    console.log('✅ JavaScript 语法检查通过！');
    
    // 检查一些常见的问题
    const issues = [];
    
    // 检查是否有未定义的函数引用
    if (jsCode.includes('checkSilicoFlowToken') && !jsCode.includes('function checkSilicoFlowToken')) {
      issues.push('⚠️  checkSilicoFlowToken 函数可能未定义');
    }
    
    if (jsCode.includes('checkGeminiToken') && !jsCode.includes('function checkGeminiToken')) {
      issues.push('⚠️  checkGeminiToken 函数可能未定义');
    }
    
    // 检查是否有未闭合的括号
    const openBraces = (jsCode.match(/\{/g) || []).length;
    const closeBraces = (jsCode.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      issues.push(`⚠️  大括号不匹配: ${openBraces} 个 '{' vs ${closeBraces} 个 '}'`);
    }
    
    const openParens = (jsCode.match(/\(/g) || []).length;
    const closeParens = (jsCode.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      issues.push(`⚠️  圆括号不匹配: ${openParens} 个 '(' vs ${closeParens} 个 ')'`);
    }
    
    if (issues.length > 0) {
      console.log('\n🔍 发现的潜在问题:');
      issues.forEach(issue => console.log(issue));
    } else {
      console.log('🎉 没有发现明显的问题！');
    }
    
  } catch (syntaxError) {
    console.error('❌ JavaScript 语法错误:');
    console.error(syntaxError.message);
    
    // 尝试找到错误的大概位置
    const lines = jsCode.split('\n');
    console.log('\n📍 代码片段:');
    lines.slice(0, 10).forEach((line, index) => {
      console.log(`${index + 1}: ${line}`);
    });
  }
  
} catch (error) {
  console.error('❌ 读取文件失败:', error.message);
}
