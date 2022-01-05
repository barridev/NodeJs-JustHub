import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'
import { build } from './app.js'

const app = build()
const { SUPABASE_URL, SUPABASE_KEY } = process.env
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


beforeAll(async () => {
  await supabase.from('customer').delete() // drop all customer
  await supabase.from('hub').delete() // drop all hub
  await supabase.from('locker').delete() // drop all locker
  await supabase.from('sender').delete() // drop all sender
  await supabase.from('package').delete() // drop all package
})
afterAll(async () => {
  await supabase.from('customer').delete() // drop all customer
  await supabase.from('hub').delete() // drop all hub
  await supabase.from('locker').delete() // drop all locker
  await supabase.from('sender').delete() // drop all sender
  await supabase.from('package').delete() // drop all package

  app.close()
})


describe('POST /signup', () => {
  test.only('fails if invalid payload on customer', async () => {

    const response1 = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: {
        email: "email-test@customer.com",
        password: bcrypt.hashSync('pcw', 10),
        firstName: "first name d'un customer",
        phone: 7606060606,
        name: "name d'un customer",
      }
    })
    expect(response1.statusCode).toBe(200)


    const customerId = await app.supabase
      .from('customer')
      .select('id')
      .single()

    // console.log("Voir le bail customer tkt : ", customerId.data.id)


    expect(response1.json()).toStrictEqual({
      "success": true,
      "id": customerId.data.id,
    })

    const response2 = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: {
        email: "email-test@customer.com",
        password: "password d'un customer",
        firstName: "first name d'un customer",
        phone: 7606060606,
        name: "name d'un customer",
      }
    })
    expect(response2.statusCode).toBe(400)

  })



})





describe('POST /hub ', () => {
  test.only('fails if invalid payload on hub', async () => {

    // const adress = 'Adresse de test'
    // const numberPlaces = 1
    const response1 = await app.inject({
      method: 'POST',
      url: '/hub',
      payload: {
        adress: "rue des test",
        numberPlaces: 3
      }
    })
    expect(response1.statusCode).toBe(200)

    const hubId = await app.supabase
      .from('hub')
      .select('id')
      .single()

    // console.log("Voir le bail hub id just data tkt : ", hubId.data.id)


    expect(response1.json()).toStrictEqual({
      "success": true,
      "data": {
        "id": hubId.data.id,
        "adress": "rue des test",
        "numberPlaces": 3
      }
    })

  })

})



















describe('POST /locker ', () => {
  test.only('fails if invalid payload on locker', async () => {

    // const adress = 'Adresse de test'
    // const numberPlaces = 1

    const hubId = await app.supabase
      .from('hub')
      .select('id')
      .single()

    const response1 = await app.inject({
      method: 'POST',
      url: '/locker',
      payload: {
        code: 63,
        numberLocker: 24,
        hubId: hubId.data.id,
      }
    })
    expect(response1.statusCode).toBe(200)

    const lockerId = await app.supabase
      .from('locker')
      .select('id')
      .single()

    expect(response1.json()).toStrictEqual({
      "success": true,
      "data": {
        "id": lockerId.data.id,
        "code": 63,
        "numberLocker": 24,
        "hubId": hubId.data.id
      }
    })

  })

})






describe('POST /sender ', () => {
  test.only('fails if invalid payload on sender', async () => {

    // const adress = 'Adresse de test'
    // const numberPlaces = 1
    const response1 = await app.inject({
      method: 'POST',
      url: '/sender',
      payload: {
        name: "nom de test sender1",
        adress: "adresse de test sender1",
      }
    })
    expect(response1.statusCode).toBe(200)

    const senderId = await app.supabase
      .from('sender')
      .select('id')
      .single()

    // console.log("Voir le bail sender tkt : ", senderId.data.id)

    expect(response1.json()).toStrictEqual({
      "success": true,
      "data": {
        "name": "nom de test sender1",
        "adress": "adresse de test sender1",
        "id": senderId.data.id,
      }
    })

  })

})







describe('POST /package ', () => {
  test.only('fails if invalid payload on package', async () => {

    // const adress = 'Adresse de test'
    // const numberPlaces = 1

    // const foreign_key_customer = customer.id
    const foreignKeyCustomer = await app.supabase
      .from('customer')
      .select('id')
      .single()

    // console.log("Voir le bail tkt : ", foreignKeyCustomer.data.id)


    const response1 = await app.inject({
      method: 'POST',
      url: '/package',
      payload: {
        deliveryNumber: 526,
        weight: 425,
        status: true,
        quantity: 1223,
        customerId: foreignKeyCustomer.data.id,
      }
    })
    expect(response1.statusCode).toBe(200)
    expect(response1.json()).toStrictEqual({
      "success": true,
      "data": {
        "deliveryNumber": 526,
        "weight": 425,
        "status": true,
        "quantity": 1223,
        "customerId": foreignKeyCustomer.data.id,
        "sender_id": null,
        "lockerId": null,
      }
    })

  })





})