import common from './common.meta'

export default Object.assign(common, {
  name: 'Winex助手(dev mode)',
  grant: ['GM_addElement', 'GM_addStyle'],
  match: ['blog.csdn.net/*']
})
