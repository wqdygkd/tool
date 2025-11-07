import { htmlError } from './errors/error.js'

export const config = { runtime: 'edge' }

export default async function handler (req) {
  const url = new URL(req.url)
  const pathname = url.pathname

  // 分割路径
  const parts = pathname.split('/').filter(Boolean)

  // 支持两种格式：
  //   /https/example.com/path
  //   /http/example.com/path
  let protocol = 'https'
  if (parts[0] === 'http' || parts[0] === 'https') {
    protocol = parts.shift()
  }

  const targetDomain = parts.shift()
  if (!targetDomain) {
    return htmlError(400, '缺少目标域名')
  }

  const targetPath = '/' + parts.join('/')
  const targetUrl = `${protocol}://${targetDomain}${targetPath}${url.search}`

  // 🧩 白名单检查
  const allowedDomainsEnv = process.env.ALLOWED_DOMAINS || ''
  const whitelist = allowedDomainsEnv
    .split(',')
    .map(d => d.trim())
    .filter(Boolean)

  if (whitelist.length > 0) {
    const allowed = whitelist.some(domain => targetDomain.endsWith(domain))
    if (!allowed) {
      return htmlError(403, `目标域名未被允许: ${targetDomain}`)
    }
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body
    })

    // 透传响应头并添加自定义头
    const headers = new Headers(response.headers)
    headers.set('x-proxy-by', 'vercel-edge')
    headers.set('x-proxy-target', targetUrl)

    return new Response(response.body, {
      status: response.status,
      headers
    })
  } catch (error) {
    return htmlError(502, `代理失败：${error.message}`)
  }
}
