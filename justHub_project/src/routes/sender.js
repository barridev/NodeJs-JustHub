// import bcrypt from 'bcrypt'
// import { createClient } from '@supabase/supabase-js'
// import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';

/**
 * @type { import('fastify').FastifyPluginCallback }
 */


export async function routes(app) {

    // const options = {
    //     schema: 'public',
    //     headers: { 'x-my-custom-header': 'my-app-name' },
    //     autoRefreshToken: true,
    //     persistSession: true,
    //     detectSessionInUrl: true
    // }

    // const supabase = createClient('https://db.zfrpshsomkhjohepqpwm.supabase.co', 'public-anon-key', options)

    // const { user, session } = await supabase.auth.signUp(
    //     {
    //         email: 'example@email.com',
    //         password: 'example-password',
    //     },
    //     {
    //         data: {
    //             first_name: 'John',
    //             age: 27,
    //         }
    //     }
    // )




    app.post('/sender', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    adress: { type: 'string' },
                },
                required: ['name', 'adress'],
                additionalProperties: false,
            },
        },
    },
        async (req, reply) => {

            const name = req.body.name
            const adress = req.body.adress


            // const foundUser = await app.supabase
            //     .from('customer')
            //     .select('id')
            //     .eq('email', email)
            //     .single()
            // if (foundUser.data) {
            //     return reply.status(400).send({ error: 'Email already taken' })
            // }

            // console.log({
            //     email,
            //     name,
            //     password: await bcrypt.hash(req.body.password, 10),
            //     firstName,
            //     phone,
            // })

            const newSender = await app.supabase
                .from('sender')
                .insert({
                    name,
                    adress,
                })
                .single()

            if (newSender.error) {
                return reply.status(400).send({ success: false, dbError: newSender.error })
            }

            // const test = await app.supabase.auth.api.createClient
            //     .from('customer')
            //     .insert({
            //         email,
            //         name,
            //         password: await bcrypt.hash(req.body.password, 10),
            //         firstName,
            //         phone,
            //     })
            //     .single()

            // if (test.error) {
            //     return reply.status(400).send({ success: false, dbError: newUser.error })
            // }

            reply.send({

                success: true,
                data: newSender.data
            })
        },
    )


}
