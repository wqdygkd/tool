import upload from './upload.js'

export default function (program) {
  const upimg = program.command('upimg')
  upimg
    .version('0.0.1')
    .usage('<command> [options]')

  upimg
    .command('server')
    .description('支持的图床')
    .action(() => {
      console.log('支持的图床: ')
    })

  upimg
    .command('help')
    .description('帮助')
    .action(() => {
      upimg.help()
    })

  upimg
    // .requiredOption('-i, --input <type>', '需要上传的图片路径，必须填写')
    .argument('[filepath]', '需要上传的图片路径，必须填写')
    .option('-s, --server <type>', '上传的图床，不填默认ali')
    .option('-d, --ddd <type>', 'flavour of pizza')
    .action(filepath => {
      if (!filepath) return upimg.help()
      const options = upimg.opts()
      upload(filepath, options)
    })
}
