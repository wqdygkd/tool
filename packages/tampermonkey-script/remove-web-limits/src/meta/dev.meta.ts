import common from './common.meta'

export default Object.assign(common, {
  name: '网页限制解除(dev mode)',
  grant: ['GM_addElement', 'GM_addStyle'],
  match: ['blog.csdn.net/*']
})
