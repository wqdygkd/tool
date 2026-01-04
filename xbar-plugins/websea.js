#!/Users/c/.local/state/fnm_multishells/62552_1767521368104/bin/node
/* jshint esversion: 6 */

// <xbar.title>websea</xbar.title>
// <xbar.version>v1</xbar.version>
// <xbar.author>c</xbar.author>
// <xbar.desc>websea</xbar.desc>

const axios = require('axios')

const url = 'https://capi.websea.com/webApi/protected/trader/trader-list?sortType=1&pageSize=9&pageNo=1&name='

axios.get(url).then(function (response) {
  const list = response.data && response.data.result && response.data.result.list

  const arr = new Set(['Shark killer', 'Dark Whale'])
  for (const item of list.filter(item => arr.has(item.nickname))) {
    console.log(`${item.nickname}: ${item.remainingPrivilegeMargin}`)
  }
}).catch(function () {
  console.log('---')
})
