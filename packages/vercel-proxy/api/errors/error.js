export function htmlError (status, message) {
  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="utf-8">
      <title>${status} Error</title>
      <style>
        body {
          font-family: system-ui, sans-serif;
          background: #f8d7da;
          color: #721c24;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        p { margin: 0; font-size: 1rem; }
        code {
          background: #f1b0b7;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <h1>❌ ${status}</h1>
      <p>${escapeHtml(message)}</p>
    </body>
    </html>
  `
  return new Response(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' }
  })
}

export function jsonError (status, message) {
  return new Response(
    JSON.stringify({ error: message, status }),
    {
      status,
      headers: { 'content-type': 'application/json' }
    }
  )
}

// 简单防注入
function escapeHtml (text) {
  return text.replaceAll(/["&'<>]/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]))
}
