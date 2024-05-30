// nginx
export default function (program) {
  const nginx = program.command('nginx')
  nginx
    .action((source, destination) => {
      console.log('nginx')
    })

  nginx
    .command('download')
    .description('download nginx')
    .action((source, destination) => {
      console.log('download nginx')
    })

  nginx
    .command('start')
    .description('start nginx')
    .action((source, destination) => {
      console.log('nginx start')
    })

  nginx
    .command('reload')
    .description('reload nginx')
    .action((source, destination) => {
      console.log('nginx reload')
    })
}
