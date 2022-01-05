/**
 * @type { import('fastify').FastifyPluginCallback }
 */


export async function routes(app) {


    app.post('/signup', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                },
                required: ['email', 'password'],
                additionalProperties: false,
            },
        },
    },
        async (req, reply) => {

            const email = req.body.email.toLowerCase()
            const { data, error } = await app.supabase
                .from('users')
                .insert({
                    email,
                    password: req.body.password, // en clair
                }).single()

            reply.send(data)
        },
    )


}
