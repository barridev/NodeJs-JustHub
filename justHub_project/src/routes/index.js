/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function routes(app) {
  app.get(
    '/',
    {
      schema: {
        response: {
          200: { type: 'object', properties: { message: { type: 'string' } } },
        },
      },
    },
    (req, reply) => {
      reply.send({ message: 'Server is running' })
    },
  )
}
