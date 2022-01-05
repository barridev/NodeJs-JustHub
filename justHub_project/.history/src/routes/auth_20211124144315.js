/**
 * @type { import('fastify').FastifyPluginCallback }
 */

import { plugins as supabase } from './plugins/supabase.js'

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
            const { data, error } = await supabase
                .from('users')
                .insert({
                    email: req.email.toLowerCase(),
                    password: req.email.password // en clair
                }).single()

            reply.send(data, error)
        },
    )


}
