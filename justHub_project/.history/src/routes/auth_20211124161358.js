import bcrypt from 'bcrypt'

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
            console.log("founduser: ", foundUser)
            if (foundUser.data) {
                return reply.status(400).send({ error: 'Email already taken' })
            }


            const newUser = await app.supabase
                .from('users')
                .insert({
                    email,
                    password: await bcrypt.hash(req.body.password, 10),
                })
                .single()

            if (newUser.error) {
                return reply.status(400).send(newUser.error)
            }

            reply.send(newUser.success)
            expect(response.json().id.length).toBe(36)
        },
    )


}
