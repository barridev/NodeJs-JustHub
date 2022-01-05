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
            //
        },
    )

    // const { data, error } = await supabase
    //     .from('users')
    //     .insert({
    //         email: body.email.toLowerCase(),
    //         password: body.email.password //en clair
    //     }).single()
}
