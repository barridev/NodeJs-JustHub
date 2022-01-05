/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function routes(app) {


    app.post('/signup', {
        schema: {
            body: {
                //
            },
        },
    },
        async (req, reply) => {
            //
        },
    )
}
