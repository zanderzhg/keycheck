addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    // 只处理 GET 请求，返回内置前端页面
    if (request.method === "GET") {
      return new Response(htmlContent, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    } else {
      // 其他请求一律 404
      return new Response("Not Found", { status: 404 });
    }
  }
  
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>硅基流动Token检测工具</title>
    <link rel="icon" type="image/svg+xml" href="https://siliconflow.zhike.in/files/siliconflowicon.svg"/>
    <style>
      /* 优化全局样式 */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        background: linear-gradient(135deg, #f0f5fb, #c0d3ee);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        color: #2c3e50;
        line-height: 1.6;
        padding: 20px;
        min-height: 100vh;
      }
  
      /* 主容器样式优化 */
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        padding: 32px;
        backdrop-filter: blur(10px);
      }
  
      /* 头部样式 */
      .header {
        text-align: center;
        margin-bottom: 32px;
      }
  
      .logo {
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
      }
  
      h1 {
        font-size: 2rem;
        color: #2c3e50;
        margin-bottom: 8px;
      }
  
      .subtitle {
        color: #666;
        font-size: 1rem;
      }
  
      /* 输入区域样式 */
      .input-section {
        margin-bottom: 24px;
        background: #f8fafc;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
      }
  
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #2c3e50;
      }
  
      textarea, input {
        width: 100%;
        padding: 12px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
      }
  
      textarea:focus, input:focus {
        border-color: #3498db;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        outline: none;
      }
  
      textarea {
        height: 180px;
        resize: vertical;
        font-family: monospace;
        line-height: 1.5;
      }
  
      /* 控制面板样式 */
      .control-panel {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
  
      /* 按钮样式优化 */
      .button {
        width: 100%;
        height: 48px;
        font-size: 1.1rem;
        letter-spacing: 1px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        color: white;
        gap: 8px;
      }
  
      .primary-button {
        background: #3498db;
      }
  
      .primary-button:hover {
        background: #2980b9;
        transform: translateY(-2px);
      }
  
      .copy-button {
        background: #27ae60;
      }
  
      .copy-button:hover {
        background: #219a52;
        transform: translateY(-2px);
      }
  
      /* 复选框容器样式 */
      .checkbox-container {
        display: inline-flex;
        align-items: center;
        font-size: 0.9rem;
        color: #666;
        margin: 0;
        padding: 0;
      }
  
      .checkbox-container input[type="checkbox"] {
        margin-right: 6px;
      }
  
      /* 结果区域样式优化 */
      .results-section {
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
        border: 1px solid #e2e8f0;
      }
  
      .results-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 2px solid #f0f2f5;
      }
  
      .results-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #2c3e50;
        flex: 1;
        display: flex;
        align-items: center;
        gap: 12px;
      }
  
      .counter {
        background: #f0f2f5;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.9rem;
        color: #666;
      }
  
      .results-content {
        background: #f8fafc;
        padding: 12px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 0.9rem;
        white-space: pre-wrap;
        max-height: 200px;
        overflow-y: auto;
      }
  
      /* 加载动画优化 */
      .loader {
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
  
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  
      /* 底部样式 */
      .footer {
        text-align: center;
        margin-top: 32px;
        padding-top: 16px;
        border-top: 1px solid #e2e8f0;
        color: #666;
        font-size: 0.9rem;
      }
  
      .footer a {
        color: #3498db;
        text-decoration: none;
      }
  
      .footer a:hover {
        text-decoration: underline;
      }
  
      /* 响应式设计优化 */
      @media (max-width: 768px) {
        .container {
          padding: 20px;
        }
  
        .control-panel {
          grid-template-columns: 1fr;
        }
  
        h1 {
          font-size: 1.5rem;
        }
      }
  
      /* 按钮区域样式优化 */
      .actions-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 24px 0;
      }
  
      .copy-section {
        display: flex;
        align-items: center;
        gap: 12px;
      }
  
      .copy-button-container {
        flex: 0.8;
      }
  
      .checkbox-container {
        background: none;
        padding: 0;
        margin: 0;
        white-space: nowrap;
      }
  
      .checkbox-container label {
        margin: 0;
        font-size: 0.95rem;
        color: #666;
      }
  
      /* 响应式设计优化 */
      @media (max-width: 640px) {
        .copy-section {
          flex-direction: column;
          align-items: stretch;
        }
        
        .copy-button-container,
        .checkbox-container {
          flex: 1;
        }
        
        .checkbox-container {
          order: -1;
          margin-bottom: 8px;
          text-align: left;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://siliconflow.zhike.in/files/siliconflowicon.svg" alt="logo" class="logo"/>
        <h1>硅基流动Token检测工具</h1>
        <p class="subtitle">快速检测Token的有效性和余额状态</p>
      </div>
  
      <div class="input-section">
        <label for="tokens">API Keys</label>
        <textarea 
          id="tokens" 
          placeholder="请输入 API Key，多个以英文逗号、分号或换行分隔&#10;&#10;示例格式：&#10;key1,key2&#10;key3;key4&#10;key5"
        ></textarea>
      </div>
  
      <div class="control-panel">
        <div>
          <label for="threshold">最低余额阈值</label>
          <input 
            id="threshold" 
            type="number" 
            value="1" 
            min="0" 
            step="0.1"
          />
        </div>
        <div>
          <label for="concurrency">并发请求数</label>
          <input 
            id="concurrency" 
            type="number" 
            value="5" 
            min="1" 
            max="10"
          />
        </div>
      </div>
  
      <div class="actions-container">
        <button id="checkButton" class="button primary-button" onclick="checkTokens()">
          开始检测账号
        </button>
        <button id="copyButton" class="button copy-button" onclick="copyValidTokens()" style="display: none;">
          复制有效账号
        </button>
      </div>
  
      <div class="results-section">
        <div class="results-header">
          <span class="results-title">
            有效账号 (余额 ≥ 阈值)
            <span id="validCount" class="counter">0</span>
            <label class="checkbox-container">
              <input type="checkbox" id="includeBalance">
              包含余额信息一起复制～
            </label>
          </span>
        </div>
        <div id="validResults" class="results-content"></div>
      </div>
  
      <div class="results-section">
        <div class="results-header">
          <span class="results-title">低余额账号</span>
          <span id="lowBalanceCount" class="counter">0</span>
        </div>
        <div id="lowBalanceResults" class="results-content"></div>
      </div>
  
      <div class="results-section">
        <div class="results-header">
          <span class="results-title">零余额账号</span>
          <span id="zeroBalanceCount" class="counter">0</span>
        </div>
        <div id="zeroBalanceResults" class="results-content"></div>
      </div>
  
      <div class="results-section">
        <div class="results-header">
          <span class="results-title">无效账号</span>
          <span id="invalidCount" class="counter">0</span>
        </div>
        <div id="invalidResults" class="results-content"></div>
      </div>
  
      <div class="results-section">
        <div class="results-header">
          <span class="results-title">重复账号</span>
          <span id="duplicateCount" class="counter">0</span>
        </div>
        <div id="duplicateResults" class="results-content"></div>
      </div>
  
      <div class="footer">
        <p>© 2025 硅基流动 | <a href="https://siliconflow.cn/zh-cn/" target="_blank">SilicoFlow</a> Favicon Powered</p>
      </div>
    </div>
  
    <script>
      // 并发执行工具函数：按 concurrency 数量并行执行 tasks
      async function runWithConcurrencyLimit(tasks, concurrency, onResult) {
        let i = 0; 
        let running = 0; 
        let results = new Array(tasks.length);
    
        return new Promise((resolve, reject) => {
          function runNext() {
            while (running < concurrency && i < tasks.length) {
              const currentIndex = i++;
              running++;
              tasks[currentIndex]()
                .then((res) => {
                  results[currentIndex] = res;
                  onResult(res, currentIndex);
                })
                .catch((err) => {
                  const e = { error: err.message };
                  results[currentIndex] = e;
                  onResult(e, currentIndex);
                })
                .finally(() => {
                  running--;
                  if (i === tasks.length && running === 0) {
                    resolve(results);
                  } else {
                    runNext();
                  }
                });
            }
          }
          runNext();
        });
      }
    
      async function checkTokens() {
        // 获取DOM
        const tokensTextarea = document.getElementById("tokens");
        const thresholdInput = document.getElementById("threshold");
        const concurrencyInput = document.getElementById("concurrency");
        const checkButton = document.getElementById("checkButton");
        const copyButton = document.getElementById("copyButton");
    
        // 计数器DOM
        const validCountEl = document.getElementById("validCount");
        const lowBalanceCountEl = document.getElementById("lowBalanceCount");
        const zeroBalanceCountEl = document.getElementById("zeroBalanceCount");
        const invalidCountEl = document.getElementById("invalidCount");
        const duplicateCountEl = document.getElementById("duplicateCount");
    
        // 显示器DOM
        const validResEl    = document.getElementById("validResults");
        const lowBalResEl   = document.getElementById("lowBalanceResults");
        const zeroBalResEl  = document.getElementById("zeroBalanceResults");
        const invalidResEl  = document.getElementById("invalidResults");
        const duplicatesResEl = document.getElementById("duplicateResults");
    
        // 初始化计数器
        let validCount = 0;
        let lowBalanceCount = 0;
        let zeroBalanceCount = 0;
        let invalidCount = 0;
    
        const tokensInput = tokensTextarea.value.trim();
        if (!tokensInput) {
          alert("请输入至少一个 API Key");
          return;
        }
    
        const threshold = parseFloat(thresholdInput.value) || 1;
        const concurrency = parseInt(concurrencyInput.value) || 5;
    
        // 分割+去重
        let tokensRaw = tokensInput
          .split(/[,;\\s\\n]/)
          .map(t => t.trim())
          .filter(t => t !== "");
        let seen = new Set();
        let duplicates = [];
        let uniqueTokens = [];
        tokensRaw.forEach(token => {
          if (seen.has(token)) {
            duplicates.push(token);
          } else {
            seen.add(token);
            uniqueTokens.push(token);
          }
        });
    
        // 重复计数
        duplicateCountEl.textContent = duplicates.length.toString();
        duplicatesResEl.textContent = duplicates.length ? duplicates.join("\\n") : "无";
    
        // 初始化UI
        checkButton.disabled = true;
        checkButton.innerHTML = '<span class="loader"></span>检测中...';
    
        validResEl.textContent   = "";
        lowBalResEl.textContent  = "";
        zeroBalResEl.textContent = "";
        invalidResEl.textContent = "";
    
        validCountEl.textContent = "0";
        lowBalanceCountEl.textContent = "0";
        zeroBalanceCountEl.textContent = "0";
        invalidCountEl.textContent = "0";
    
        copyButton.style.display = "none";
    
        // 存放可复制token(≥阈值)
        let validTokensForCopy = [];
    
        // 构造任务
        const tasks = uniqueTokens.map(token => {
          return () => checkOneToken(token);
        });
    
        // 单次结果处理
        function onSingleResult(res) {
          if (!res || res.error) {
            // 网络/请求出错 => 无效
            invalidCount++;
            invalidCountEl.textContent = invalidCount.toString();
            invalidResEl.textContent += "未知Token(请求失败): " + (res && res.error || "unknown") + "\\n";
            return;
          }
          if (!res.isValid) {
            invalidCount++;
            invalidCountEl.textContent = invalidCount.toString();
            invalidResEl.textContent += res.token + " (" + res.message + ")\\n";
            return;
          }
          // 有效
          const bal = res.balance;
          const display = res.token + " (余额:" + bal + ")";
          if (bal === 0) {
            zeroBalanceCount++;
            zeroBalanceCountEl.textContent = zeroBalanceCount.toString();
            zeroBalResEl.textContent += display + "\\n";
          } else if (bal < threshold) {
            lowBalanceCount++;
            lowBalanceCountEl.textContent = lowBalanceCount.toString();
            lowBalResEl.textContent += display + "\\n";
          } else {
            validCount++;
            validCountEl.textContent = validCount.toString();
            validResEl.textContent += display + "\\n";
            validTokensForCopy.push(res.token);
            if (validCount === 1) {
              copyButton.style.display = "block";
            }
          }
        }
    
        try {
          // 并发执行
          await runWithConcurrencyLimit(tasks, concurrency, onSingleResult);
        } catch (err) {
          alert("检测失败: " + err.message);
          console.error(err);
        } finally {
          checkButton.disabled = false;
          checkButton.textContent = "检测账号";
        }
    
        // 记录可复制列表
        window.__VALID_TOKENS_FOR_COPY__ = validTokensForCopy;
      }
    
      // 在前端验证 + 查询余额
      async function checkOneToken(token) {
        // 1. 验证token
        const resp1 = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: [{ role: "user", content: "hi" }],
            max_tokens: 100,
            stream: false
          })
        });
    
        if (!resp1.ok) {
          const errData = await resp1.json().catch(() => null);
          return {
            token,
            isValid: false,
            message: errData && errData.message ? errData.message : "验证失败"
          };
        }
    
        // 2. 查询余额
        const resp2 = await fetch("https://api.siliconflow.cn/v1/user/info", {
          method: "GET",
          headers: { "Authorization": "Bearer " + token }
        });
        if (!resp2.ok) {
          const errData = await resp2.json().catch(() => null);
          return {
            token,
            isValid: false,
            message: errData && errData.message ? errData.message : "余额获取失败"
          };
        }
    
        const data2 = await resp2.json();
        return {
          token,
          isValid: true,
          balance: data2.data && data2.data.totalBalance || 0
        };
      }
    
      // 复制≥阈值token
      function copyValidTokens() {
        const validTokens = window.__VALID_TOKENS_FOR_COPY__ || [];
        if (!validTokens.length) {
          alert("没有可复制的有效账号(≥阈值)");
          return;
        }
  
        const includeBalance = document.getElementById("includeBalance").checked;
        const joined = validTokens.map(token => {
          if (includeBalance) {
            const balanceInfo = document.getElementById("validResults").textContent
              .split("\\n")
              .find(line => line.startsWith(token));
            return balanceInfo || token;
          }
          return token;
        }).join("\\n");
  
        const textArea = document.createElement("textarea");
        textArea.value = joined;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("有效账号已复制到剪贴板");
      }
    </script>
  </body>
  </html>
  `;