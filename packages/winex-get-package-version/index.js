// // npm-package-arg
// var parsed = npa(name)
//   ls(parsed.name, parsed.rawSpec || argv.version, argv.flatten, function (obj) {
//     if (Array.isArray(obj)) console.log(obj)
//     else console.log(treeify.asTree(obj))
//   })

// const repository = [
//   {
//     name: 'winning-webcomponents-finance-common',
//     branch: '991827/branch-from/V6.0-20230816-it'
//   }
// ]

// xf6o2qudhf72ihp42jx7c3lixigxid5nogwvzabbtyo5pudbmljq

// const assert = require('node:assert')
// const npa = require('npm-package-arg')

// // Pass in the descriptor, and it'll return an object
// try {
//   const parsed = npa('@winex-comps/finance-patient-card@5.1.35-beta.0')
//   console.log(parsed)
// } catch (error) {
//   console.log(error)
// }

import * as azdev from 'azure-devops-node-api'
import fs from 'node:fs'
import zlib from 'node:zlib'

import axios from 'axios'

// your collection url
const orgUrl = 'http://tfs2018-web.winning.com.cn:8080/tfs/WINNING-6.0'

const token = 'nlzb72fukwnmwzwtt6ep3qvz5ywqxvoqasf4ykyjoxwsepgixcyq'

const authHandler = azdev.getPersonalAccessTokenHandler(token)
const connection = new azdev.WebApi(orgUrl, authHandler)

const repositoryIdentifier = '4be57363-97a1-489a-b448-1905daf30947' // 根据仓库名或id 获取仓库信息
// const repository = await gitApi.getRepository(repositoryIdentifier)
// console.log(repository)

async function getFileContent () {
  try {
    // Get a reference to the Git API
    const gitApi = await connection.getGitApi()

    // 获取仓库列表
    // const repositories = await gitApi.getRepositories()
    // const p = repositories.find(repo => repo.name === 'winning-webcomponents-finance-common')

    // console.log(p)
    // Get the repository
    const repository = await gitApi.getRepository(repositoryIdentifier)
    console.log(repository)
    const filePath = 'index.js'
    const branchName = 'develop_all'

    // Get the blob content from the repository at the specified branch and path
    // const blob = await gitApi.getBlob(repositoryIdentifier, filePath, repositoryIdentifier, { versionDescriptor: { version: branchName } })

    // // Decode the blob content
    // const fileContentText = Buffer.from(blob.content, 'base64').toString('utf-8')

    // console.log('Content of the file at path:', filePath)
    // console.log(fileContentText)

    // const blobContent = await gitApi.getBlobContent(repositoryIdentifier, filePath, branchName, true)

    // // Convert blob content to text
    // const fileContentText = Buffer.from(blobContent, 'base64').toString('utf-8')

    // console.log('Content of the file at path:', filePath)
    // console.log(fileContentText)
    const blobContent = await gitApi.getBlobContent(repository.id, branchName, filePath, true)

    // const fileContent = await gitApi.getFileContent(repositoryIdentifier, filePath, branchName)
    let data = ''
    blobContent.on('data', chunk => {
      data += chunk
    })

    // 数据接收完毕时触发
    blobContent.on('end', () => {
      console.log(data) // 这里打印的就是接收到的字符串数据
    })
  } catch (error) {
    console.error('Error:', error.message)
  }
}

getFileContent()

// const repository = [
//   {
//     name: 'winning-webcomponents-finance-common',
//     branch: '991827/branch-from/V6.0-20230816-it',
//     id: ''
//   }
// ]
