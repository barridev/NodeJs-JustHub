import bcrypt from 'bcrypt'

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function routes(app) {

    app.post('/signin', {
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
                .select('id')
                .eq('email', email)
                .single()
            if (error) {
                return reply.status(404).send({ error: 'User not found' })
            }

            const { password } = data
            const passwordIsValid = await bcrypt.compare(req.body.password, password)
            if (!passwordIsValid) {
                return reply.status(404).send({ error: 'User not found' })
            }

            reply.send({
                success: true,
            })
        },
    )

}
