
import fs from 'node:fs'
import path from 'node:path'
import got from 'got'
import FormData from 'form-data'

export default async (filepath, options) => {
  const instance = got.extend({
    headers: { origin: 'http://localhost:8080' },
    responseType: 'json'
  })

  const { server } = options
  const cwd = process.cwd()
  const formData = new FormData()
  formData.append('file', fs.createReadStream(path.resolve(cwd, filepath)))

  try {
    const result = await instance.post(`http://localhost:3000/api/upload/${server || 'ali1'}.php`, {
      body: formData
    })

    const body = result.body
    console.log(body.url)
  } catch (error) {
    console.log(error.code)
  }
}
