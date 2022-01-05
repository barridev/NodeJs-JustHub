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
            const { data1, error } = await supabase
                .from('users')
                .select('id, password')
                .eq('email', body.email.toLowerCase())
                .single()

            const email = req.body.email.toLowerCase()
            const { data, error } = await app.supabase
                .from('users')
                .insert({
                    email,
                    password: req.body.password, // en clair
                }).single()

            if (error) {
                return reply.status(400).send(error)
            }

            if (data1 === data) {
                return reply.status(400)
            }

            reply.send(data)
        },
    )


}
