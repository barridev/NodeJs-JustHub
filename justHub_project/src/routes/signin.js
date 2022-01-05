import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

/**
 *
 * @param { { id: string } } payload
 * @param { import('jsonwebtoken').SignOptions } options
 * @returns { Promise<string> }
 */
function getJWT(payload, options) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, process.env.JWT_SECRET, options, (err, jwt) => {
      if (err) return reject(err)
      return resolve(jwt)
    })
  })
}

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function routes(app) {

  app.post(
    '/signin',
    {
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
        reponse: {
          200: {
            type: 'object',
            properties: {
              jwt: { type: 'string' },
            },
            required: ['jwt'],
          },
        },
      },
      // preValidation: [app.checkNotAuthenticated],
    },


    async (req, reply) => {
      const { body } = req
      const { supabase } = app

      const email = req.body.email.toLowerCase()



      console.log("TEST")
      console.log({
        email,
        password: await bcrypt.hash(req.body.password, 10),
      })



      const user = await supabase
        .from('customer')
        .select('id, password')
        .eq('email', body.email.toLowerCase())
        .single()

      console.log(user.data)

      if (!user.data) {
        return reply.code(404).send(new Error('User not found'))
      }

      const passwordIsValid = await bcrypt.compare(
        body.password,
        user.data.password,
      )

      if (!passwordIsValid) {
        return reply.code(404).send(new Error('User not found'))
      }

      return reply.send({
        jwt: await getJWT({ id: user.data.id }, { expiresIn: '24h' }),
      })
    },
  )

}


// {
//   "email": "la@gmail.com",
//   "password": "lalala",
// 	"name": "NeswName",
// 	"firstName": "NewFsisrtName",
// 	"phone": "0606060606"
	
// }