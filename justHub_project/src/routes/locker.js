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




    app.post('/locker', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    code: { type: 'integer' },
                    numberLocker: { type: 'integer' },
                    hubId: { type: 'string' },
                },
                required: ['code', 'numberLocker', 'hubId'],
                additionalProperties: false,
            },
        },
    },
        async (req, reply) => {

            const code = req.body.code
            const numberLocker = req.body.numberLocker
            const hubId = req.body.hubId


            // const foundUser = await app.supabase
            //     .from('customer')
            //     .select('id')
            //     .eq('email', email)
            //     .single()
            // if (foundUser.data) {
            //     return reply.hubId(400).send({ error: 'Email already taken' })
            // }

            // console.log({
            //     email,
            //     name,
            //     password: await bcrypt.hash(req.body.password, 10),
            //     firstName,
            //     phone,
            // })

            const newLocker = await app.supabase
                .from('locker')
                .insert({
                    code,
                    numberLocker,
                    hubId,
                })
                .single()

            if (newLocker.error) {
                return reply.status(400).send({ success: false, dbError: newLocker.error })
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
            //     return reply.hubId(400).send({ success: false, dbError: newUser.error })
            // }

            reply.send({

                success: true,
                data: newLocker.data
            })
        },
    )


}
