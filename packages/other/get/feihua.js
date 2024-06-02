import { MongoClient } from 'mongodb'
import fetch from 'node-fetch'

const uri = 'mongodb://127.0.0.1:27017/main'
const client = async () => {
  return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

const request = async () => {
  const result = await fetch('https://api.bspapp.com/client', {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'content-type': 'application/json',
      'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'x-basement-token': 'c5851ec5-76dd-4c7d-b786-6454a100821f',
      'x-serverless-sign': '2d091431bd709d737468e51efd4aca5c',
      Referer: 'https://m.feifeilv.top/',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    body: '{"method":"serverless.function.runtime.invoke","params":"{\\"functionTarget\\":\\"DCloud-clientDB\\",\\"functionArgs\\":{\\"command\\":{\\"$db\\":[{\\"$method\\":\\"collection\\",\\"$param\\":[\\"library\\"]},{\\"$method\\":\\"aggregate\\",\\"$param\\":[]},{\\"$method\\":\\"match\\",\\"$param\\":[{\\"supId\\":\\"630f0c90554ae200010d4e74\\",\\"type\\":\\"text\\"}]},{\\"$method\\":\\"sample\\",\\"$param\\":[{\\"size\\":1}]},{\\"$method\\":\\"end\\",\\"$param\\":[]}]},\\"clientInfo\\":{\\"PLATFORM\\":\\"web\\",\\"OS\\":\\"windows\\",\\"APPID\\":\\"__UNI__78EB739\\",\\"DEVICEID\\":\\"16616801442874061184\\",\\"scene\\":1001,\\"appId\\":\\"__UNI__78EB739\\",\\"appLanguage\\":\\"zh-Hans\\",\\"appName\\":\\"bizarre\\",\\"appVersion\\":\\"1.0.0\\",\\"appVersionCode\\":\\"100\\",\\"browserName\\":\\"chrome\\",\\"browserVersion\\":\\"105.0.0.0\\",\\"deviceId\\":\\"16616801442874061184\\",\\"deviceModel\\":\\"PC\\",\\"deviceOrientation\\":\\"portrait\\",\\"devicePixelRatio\\":1,\\"deviceType\\":\\"pc\\",\\"hostLanguage\\":\\"zh-CN\\",\\"hostName\\":\\"chrome\\",\\"hostVersion\\":\\"105.0.0.0\\",\\"osName\\":\\"windows\\",\\"osVersion\\":\\"10 x64\\",\\"safeArea\\":{\\"left\\":0,\\"right\\":1105,\\"top\\":0,\\"bottom\\":929,\\"width\\":1105,\\"height\\":929},\\"safeAreaInsets\\":{\\"top\\":0,\\"right\\":0,\\"bottom\\":0,\\"left\\":0},\\"screenHeight\\":1080,\\"screenWidth\\":1920,\\"statusBarHeight\\":0,\\"ua\\":\\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36\\",\\"uniCompileVersion\\":\\"3.5.3\\",\\"uniPlatform\\":\\"web\\",\\"uniRuntimeVersion\\":\\"3.5.3\\",\\"windowBottom\\":0,\\"windowHeight\\":929,\\"windowTop\\":0,\\"windowWidth\\":1105,\\"locale\\":\\"zh-Hans\\",\\"LOCALE\\":\\"zh-Hans\\"}}}","spaceId":"c7e31896-992f-4415-8341-8c805f7c2b02","timestamp":1664015963364,"token":"c5851ec5-76dd-4c7d-b786-6454a100821f"}',
    method: 'POST'
  })

  const data = await result.json()
  return data.data.data[0].content.trim()
}

let count = 1

const main = async collection => {
  const note = await request()
  // const note = '哈哈哈'

  console.log(note)

  const res = await collection.find({ note }).toArray()
  if (res.length === 0) {
    await collection.insertOne({ note: note })
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

  await main(collection)
}

(async () => {
  const Client = await client()
  await Client.connect()
  const collection = Client.db().collection('guanshui')
  await main(collection)
})()
