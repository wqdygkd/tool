import { MongoClient } from 'mongodb'
import fetch from 'node-fetch'

const uri = 'mongodb://127.0.0.1:27017/main'
const client = async () => {
  return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

const request = async () => {
  const result = await fetch('https://api.shadiao.pro/du', {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'max-age=0',
      'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'upgrade-insecure-requests': '1'
    },
    referrer: 'https://api.shadiao.pro/du',
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'GET',
    mode: 'cors',
    credentials: 'omit'
  })

  const data = await result.json()
  return data.data.text.trim()
}

let count = 1

const main = async jitang => {
  const note = await request()
  // const note = '哈哈哈'
  console.log(note)
  return
  const res = await jitang.find({ note }).toArray()
  if (res.length === 0) {
    await jitang.insertOne({ note: note })
    console.log(`第${count}次 添加成功`)
  } else {
    console.log(`第${count}次 已存在`)
  }

  count++
  const wait = (Math.random() * 4 + 1)
  // console.log(`暂停${wait}秒`)
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, wait * 1000)
  })

  // await main(jitang)
}

(async () => {
  const Client = await client()
  await Client.connect()
  const jitang = Client.db().collection('jitang')
  await main(jitang)
})()
