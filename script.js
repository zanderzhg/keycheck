// API 提供商配置
const API_PROVIDERS = {
  openai: {
    name: "OpenAI 通用",
    placeholder: "请输入 OpenAI API KEY，多个以英文逗号、分号或换行分隔\n\n示例格式：\nsk-xxx1,sk-xxx2\nsk-xxx3;sk-xxx4\nsk-xxx5",
    hasBalance: false,
    checkFunction: "checkOpenAIToken"
  },
  silicoflow: {
    name: "硅基流动",
    placeholder: "请输入硅基流动 API KEY，多个以英文逗号、分号或换行分隔\n\n示例格式：\nsk-xxx1,sk-xxx2\nsk-xxx3;sk-xxx4\nsk-xxx5",
    hasBalance: true,
    checkFunction: "checkSilicoFlowToken"
  },
  gemini: {
    name: "Google Gemini",
    placeholder: "请输入 Google Gemini API KEY，多个以英文逗号、分号或换行分隔\n\n示例格式：\nAIzaSyXXX1,AIzaSyXXX2\nAIzaSyXXX3;AIzaSyXXX4\nAIzaSyXXX5",
    hasBalance: false,
    checkFunction: "checkGeminiToken"
  }
};

// 全局函数定义
function updatePlaceholder() {
  const provider = document.querySelector('input[name="provider"]:checked').value;
  const tokensTextarea = document.getElementById('tokens');
  const thresholdSection = document.getElementById('thresholdSection');
  const balanceCheckbox = document.getElementById('balanceCheckbox');
  const validTitle = document.getElementById('validTitle');
  const lowBalanceSection = document.getElementById('lowBalanceSection');
  const zeroBalanceSection = document.getElementById('zeroBalanceSection');
  const openaiConfig = document.getElementById('openaiConfig');

  const config = API_PROVIDERS[provider];
  if (!config) return;

  tokensTextarea.placeholder = config.placeholder;

  // 清空之前的测试结果
  clearResults();

  // 显示/隐藏 OpenAI 配置
  if (provider === 'openai') {
    openaiConfig.style.display = 'block';
  } else {
    openaiConfig.style.display = 'none';
  }

  // 根据是否支持余额查询来显示/隐藏相关元素
  if (config.hasBalance) {
    thresholdSection.style.display = 'block';
    balanceCheckbox.style.display = 'inline-flex';
    validTitle.textContent = '有效KEY (余额 ≥ 阈值)';
    lowBalanceSection.style.display = 'block';
    zeroBalanceSection.style.display = 'block';
  } else {
    thresholdSection.style.display = 'none';
    balanceCheckbox.style.display = 'none';
    validTitle.textContent = '有效KEY';
    lowBalanceSection.style.display = 'none';
    zeroBalanceSection.style.display = 'none';
  }
}

function clearResults() {
  // 清空所有结果显示区域
  const resultElements = [
    'validResults', 'lowBalanceResults', 'zeroBalanceResults',
    'rateLimitResults', 'invalidResults', 'duplicateResults'
  ];

  resultElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = '';
  });

  // 重置所有计数器
  const counterElements = [
    'validCount', 'lowBalanceCount', 'zeroBalanceCount',
    'rateLimitCount', 'invalidCount', 'duplicateCount'
  ];

  counterElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = '0';
  });

  // 隐藏所有复制操作
  const actionElements = ['validActions', 'rateLimitActions'];
  actionElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
  });

  // 清空全局变量
  if (typeof window !== 'undefined') {
    window.__VALID_TOKENS_FOR_COPY__ = [];
    window.__RATE_LIMIT_TOKENS_FOR_COPY__ = [];
  }
}

// 文件导入功能
function importFromFile() {
  document.getElementById('fileInput').click();
}

function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith('.txt')) {
    showCustomModal('请选择 .txt 格式的文件', 'warning');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;
    const tokensTextarea = document.getElementById('tokens');

    // 处理文件内容，按换行或逗号分隔
    const cleanContent = content
      .split(new RegExp('[,\\n\\r]+'))
      .map(line => line.trim())
      .filter(line => line !== '')
      .join('\n');

    // 如果文本框已有内容，则追加
    if (tokensTextarea.value.trim()) {
      tokensTextarea.value += '\n' + cleanContent;
    } else {
      tokensTextarea.value = cleanContent;
    }

    showCustomModal('文件导入成功！共导入 ' + cleanContent.split('\n').length + ' 个KEY', 'success');
  };

  reader.onerror = function() {
    showCustomModal('文件读取失败，请重试', 'error');
  };

  reader.readAsText(file);
}

// 自定义弹窗函数
function showCustomModal(message, type = 'success', title = '') {
  const modal = document.getElementById('customModal');
  const icon = document.getElementById('modalIcon');
  const titleEl = document.getElementById('modalTitle');
  const messageEl = document.getElementById('modalMessage');

  // 设置图标和样式
  icon.className = "modal-icon " + type;
  switch(type) {
    case 'success':
      icon.textContent = '✓';
      titleEl.textContent = title || '操作成功';
      break;
    case 'error':
      icon.textContent = '✕';
      titleEl.textContent = title || '操作失败';
      break;
    case 'warning':
      icon.textContent = '⚠';
      titleEl.textContent = title || '注意';
      break;
    case 'info':
      icon.textContent = 'ℹ';
      titleEl.textContent = title || '提示';
      break;
  }

  messageEl.textContent = message;
  modal.classList.add('show');

  // 3秒后自动关闭
  setTimeout(() => {
    closeCustomModal();
  }, 3000);
}

function closeCustomModal() {
  const modal = document.getElementById('customModal');
  modal.classList.remove('show');
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  // 绑定provider选择器的事件处理器
  const providerRadios = document.querySelectorAll('input[name="provider"]');
  providerRadios.forEach(radio => {
    radio.addEventListener('change', updatePlaceholder);
  });

  // 绑定其他事件处理器
  document.getElementById('importBtn').addEventListener('click', importFromFile);
  document.getElementById('fileInput').addEventListener('change', handleFileImport);
  document.getElementById('checkButton').addEventListener('click', checkTokens);
  document.getElementById('copyValidBtn').addEventListener('click', copyValidTokens);
  document.getElementById('copyRateLimitBtn').addEventListener('click', copyRateLimitTokens);
  document.getElementById('modalCloseBtn').addEventListener('click', closeCustomModal);

  // 初始化placeholder
  updatePlaceholder();
});

// 并发执行工具函数：按 concurrency 数量并行执行 tasks
async function runWithConcurrencyLimit(tasks, concurrency, onResult) {
  return new Promise((resolve) => {
    let i = 0;
    let running = 0;
    const results = [];

    function runNext() {
      while (running < concurrency && i < tasks.length) {
        const currentIndex = i++;
        const task = tasks[currentIndex];
        running++;

        task()
          .then((result) => {
            results[currentIndex] = result;
            onResult(result, currentIndex);
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
  const validActions = document.getElementById("validActions");
  const rateLimitActions = document.getElementById("rateLimitActions");

  // 计数器DOM
  const validCountEl = document.getElementById("validCount");
  const lowBalanceCountEl = document.getElementById("lowBalanceCount");
  const zeroBalanceCountEl = document.getElementById("zeroBalanceCount");
  const rateLimitCountEl = document.getElementById("rateLimitCount");
  const invalidCountEl = document.getElementById("invalidCount");
  const duplicateCountEl = document.getElementById("duplicateCount");

  // 显示器DOM
  const validResEl = document.getElementById("validResults");
  const lowBalResEl = document.getElementById("lowBalanceResults");
  const zeroBalResEl = document.getElementById("zeroBalanceResults");
  const rateLimitResEl = document.getElementById("rateLimitResults");
  const invalidResEl = document.getElementById("invalidResults");
  const duplicatesResEl = document.getElementById("duplicateResults");

  // 初始化计数器
  let validCount = 0;
  let lowBalanceCount = 0;
  let zeroBalanceCount = 0;
  let rateLimitCount = 0;
  let invalidCount = 0;

  const tokensInput = tokensTextarea.value.trim();
  if (!tokensInput) {
    showCustomModal("请输入至少一个 API KEY", "warning");
    return;
  }

  const provider = document.querySelector('input[name="provider"]:checked').value;
  const providerConfig = API_PROVIDERS[provider];
  const threshold = parseFloat(thresholdInput.value) || 1;
  const concurrency = parseInt(concurrencyInput.value) || 5;

  // 分割+去重
  let tokensRaw = tokensInput
    .split(new RegExp('[,;\\s\\n\\r]+'))
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
  duplicatesResEl.textContent = duplicates.length ? duplicates.join("\n") : "无";

  // 初始化UI
  checkButton.disabled = true;
  checkButton.innerHTML = '<span class="loader"></span>检测中...';

  validResEl.textContent = "";
  lowBalResEl.textContent = "";
  zeroBalResEl.textContent = "";
  rateLimitResEl.textContent = "";
  invalidResEl.textContent = "";

  validCountEl.textContent = "0";
  lowBalanceCountEl.textContent = "0";
  zeroBalanceCountEl.textContent = "0";
  rateLimitCountEl.textContent = "0";
  invalidCountEl.textContent = "0";

  validActions.style.display = "none";
  rateLimitActions.style.display = "none";

  // 存放可复制token(≥阈值)
  let validTokensForCopy = [];
  // 存放限流token
  let rateLimitTokensForCopy = [];

  // 构建任务数组
  const tasks = uniqueTokens.map(token => () => {
    switch(provider) {
      case 'openai':
        return checkOpenAIToken(token);
      case 'silicoflow':
        return checkSilicoFlowToken(token);
      case 'gemini':
        return checkGeminiToken(token);
      default:
        return Promise.resolve({ token, isValid: false, message: "未知提供商" });
    }
  });

  // 单次结果处理
  function onSingleResult(res) {
    if (!res || res.error) {
      // 网络/请求出错 => 无效
      invalidCount++;
      invalidCountEl.textContent = invalidCount.toString();
      invalidResEl.textContent += "未知KEY(请求失败): " + (res && res.error || "unknown") + "\n";
      return;
    }
    if (!res.isValid) {
      // 检查是否是429限流错误
      if (res.message && res.message.includes("429")) {
        rateLimitCount++;
        rateLimitCountEl.textContent = rateLimitCount.toString();
        rateLimitResEl.textContent += res.token + " (" + res.message + ")\n";
        rateLimitTokensForCopy.push(res.token);
        if (rateLimitCount === 1) {
          rateLimitActions.style.display = "flex";
        }
      } else {
        invalidCount++;
        invalidCountEl.textContent = invalidCount.toString();
        invalidResEl.textContent += res.token + " (" + res.message + ")\n";
      }
      return;
    }

    // 有效的Key
    if (providerConfig.hasBalance) {
      // 支持余额查询的提供商
      const bal = res.balance;
      const display = res.token + " (余额:" + bal + ")";
      if (bal === 0) {
        zeroBalanceCount++;
        zeroBalanceCountEl.textContent = zeroBalanceCount.toString();
        zeroBalResEl.textContent += display + "\n";
      } else if (bal < threshold) {
        lowBalanceCount++;
        lowBalanceCountEl.textContent = lowBalanceCount.toString();
        lowBalResEl.textContent += display + "\n";
      } else {
        validCount++;
        validCountEl.textContent = validCount.toString();
        validResEl.textContent += display + "\n";
        validTokensForCopy.push(res.token);
        if (validCount === 1) {
          validActions.style.display = "flex";
        }
      }
    } else {
      // 不支持余额查询的提供商，所有有效Key都算作有效
      validCount++;
      validCountEl.textContent = validCount.toString();
      const display = res.token + " (状态: 有效)";
      validResEl.textContent += display + "\n";
      validTokensForCopy.push(res.token);
      if (validCount === 1) {
        validActions.style.display = "flex";
      }
    }
  }

  try {
    // 并发执行
    await runWithConcurrencyLimit(tasks, concurrency, onSingleResult);
  } catch (err) {
    showCustomModal("检测失败: " + err.message, "error");
    console.error(err);
  } finally {
    checkButton.disabled = false;
    checkButton.textContent = "开始检测KEY";
  }

  // 记录可复制列表
  window.__VALID_TOKENS_FOR_COPY__ = validTokensForCopy;
  window.__RATE_LIMIT_TOKENS_FOR_COPY__ = rateLimitTokensForCopy;
}
