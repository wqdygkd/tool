
import fs from 'node:fs'
import path from 'node:path'

import got from 'got'
import FormData from 'form-data'
import {glob} from 'glob'

export default async (filepath, options) => {
  const instance = got.extend({
    headers: { origin: 'http://localhost:8080' },
    responseType: 'json'
  })

  const { server } = options
  const cwd = process.cwd()

  glob(filepath, {}, async function (er, files) {
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', fs.createReadStream(path.resolve(cwd, file)))
      try {
        const result = await instance.post(` https://img.wqdy.top/api/upload/${server || 'ali1'}.php`, {
          body: formData
        })

        const body = result.body
        console.log(body.name, body.url)
      } catch (error) {
        console.log(error.code)
      }
    }
  })
}
