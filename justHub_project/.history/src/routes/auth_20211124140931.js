/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function routes(app) {


    app.post('/signup', {
        schema: {
            body: {

                email: { type: 'string', format: 'email' },
                password: { type: 'string' },
            },
        },
    },
        async (req, reply) => {
            //
        },
    )
}
