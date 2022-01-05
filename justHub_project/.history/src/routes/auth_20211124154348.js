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
            const { data1, error2 } = await app.supabase
                .from('users')
                .select('id, password')
                .eq('email', req.body.email.toLowerCase())
                .single()

            console.log("Data1:", data1)


            const email = req.body.email.toLowerCase()
            const { data, error } = await app.supabase

                .from('users')
                .insert({
                    email,
                    password: req.body.password, // en clair
                }).single()

            if (data1 === data) {
                return reply.status(400).send("OK mon pote")
            }

            if (error) {
                return reply.status(400).send(error)
            }





            reply.send(data)
        },
    )


}
