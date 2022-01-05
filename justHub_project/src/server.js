import { build } from './app.js'

async function start() {
  const app = build({
    logger: {
      level: 'info',
      prettyPrint: true,
    },
  })

  try {
    await app.listen(process.env.PORT)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()
