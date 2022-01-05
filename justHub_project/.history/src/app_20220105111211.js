import fastify from 'fastify'
import { supabasePlugin } from './plugins/supabase.js'

import { routes as indexRoutes } from './routes/index.js'
import { routes as authRoutes } from './routes/auth.js'
import { routes as signinRoutes } from './routes/signin.js'
import { routes as packageRoutes } from './routes/package.js'
import { routes as lockerRoutes } from './routes/locker.js'
import { routes as hubRoutes } from './routes/hub.js'
import { routes as senderRoutes } from './routes/sender.js'




const { SUPABASE_KEY, SUPABASE_URL } = process.env

/**
 * @param { import('fastify').FastifyServerOptions } options
 */
export function build(options = {}) {

  const app = fastify(options)

  app.server.setTimeout(10000)

  app.register(supabasePlugin, {
    supabaseKey: SUPABASE_KEY,
    supabaseUrl: SUPABASE_URL,
  })



  // const { SUPABASE_URL, SUPABASE_KEY } = process.env

  // app.register(
  //   supabasePlugin(SUPABASE_URL, SUPABASE_KEY
  //   ),
  // )

  // app.get('/', (request, reply) => {
  //   reply.statusCode = 200
  // })

  app.register(indexRoutes)
  app.register(authRoutes)
  app.register(signinRoutes)
  app.register(packageRoutes)
  app.register(lockerRoutes)
  app.register(hubRoutes)
  app.register(senderRoutes)





  // const schema = ({
  //   body: {
  //     type: 'object',
  //     properties: {
  //       email: { type: 'string', format: 'email' },
  //       password: { type: 'string' },
  //     },
  //     required: ['email', 'password'],
  //     additionalProperties: false,
  //   }
  // })


  // app.post('/signup', (request, reply) => {

  //   if (query.name === '') {
  //     reply.send({ message: 'Hello world' })
  //   }
  //   reply.statusCode = 200
  //   reply.send({ message: name })
  // })


  // app.post(
  //   '/signup',
  //   {
  //     schema: {
  //       body: {
  //         type: 'object',
  //         properties: {
  //           email: { type: 'string', format: 'email' },
  //           password: { type: 'string' },
  //         },
  //         required: ['email', 'password'],
  //         additionalProperties: false,
  //       },
  //     },
  //   },
  //   (req, reply) => {
  //     reply.send({
  //       message: 'Message received',
  //       data: req.body,
  //     })
  //   },
  // )

  return app

}
