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

            const foundUser = await app.supabase
                .from('users')
                .select('id')
                .eq('email', email)
                .single()

            console.log("foundUser:", foundUser)

            if (foundUser.data) {
                return reply.status(400).send({
                    error: 'Email already taken'"error": email' })
            }

            const { data, error } = await app.supabase

                    .from('users')
                    .insert({
                        email,
                        password: req.body.password, // en clair
                    }).single()

                if (error) {
                    return reply.status(400).send(error)
                }





                reply.send(data)
            },
    )


}
