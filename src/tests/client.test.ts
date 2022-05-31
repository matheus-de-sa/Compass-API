import supertest from 'supertest'
import createServer from '../utils/server'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createCity } from '../services/city.service'
import { createClient } from '../services/client.service'

const app = createServer()

describe('Client', () => {
    beforeAll(async () => {
        const mongo = await MongoMemoryServer.create()

        await mongoose.connect(mongo.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('GET /clients', () => {
        describe('given the client does exist', () => {
            it('should return a 200', async () => {
                const city = await createCity({
                    name: 'São Paulo',
                    state: 'SP',
                })

                const client = await createClient({
                    name: 'Maria Eduarda',
                    sex: 'Feminino',
                    age: 24,
                    birthday: '24/08/1997',
                    city: city._id,
                })

                const name = 'Maria-Eduarda'

                const { body, statusCode } = await supertest(app).get(
                    `/api/clients?name=${name}`
                )

                expect(statusCode).toBe(200)

                expect({
                    name: body.name,
                    sex: body.sex,
                    age: body.age,
                    birthday: body.birthday,
                }).toStrictEqual({
                    name: client.name,
                    sex: client.sex,
                    age: client.age,
                    birthday: client.birthday,
                })
            })
        })

        describe('given the client does not exist', () => {
            it('should return a 400', async () => {
                const name = 'Marcos-Paulo'

                const { body, statusCode } = await supertest(app).get(
                    `/api/clients?name=${name}`
                )

                expect(statusCode).toBe(400)

                expect('Nenhum cliente encontrado!').toBe(body)
            })
        })
    })

    describe('POST /clients', () => {
        describe('given the client is created', () => {
            it('should return a 200', async () => {
                const city = await createCity({
                    name: 'São José',
                    state: 'SC',
                })

                const client = {
                    name: 'Juliano Gomez',
                    sex: 'Masculino',
                    age: 22,
                    birthday: '18/08/1999',
                    city: city._id,
                }

                const { body, statusCode } = await supertest(app)
                    .post(`/api/clients`)
                    .send(client)

                expect(statusCode).toBe(200)

                expect({
                    name: body.name,
                    sex: body.sex,
                    age: body.age,
                    birthday: body.birthday,
                }).toStrictEqual({
                    name: client.name,
                    sex: client.sex,
                    age: client.age,
                    birthday: client.birthday,
                })
            })
        })

        describe('given that the data to create the client is wrong', () => {
            it('should return a 400', async () => {
                const city = await createCity({
                    name: 'São José',
                    state: 'SC',
                })

                const client = {
                    name: 'Juliano Gomez',
                    sex: 'Masculin',
                    age: 23,
                    birthday: '18/08/1999',
                    city: city._id,
                }

                const { statusCode } = await supertest(app)
                    .post(`/api/clients`)
                    .send(client)

                expect(statusCode).toBe(400)
            })
        })
    })

    describe('PUT /clients', () => {
        describe('given the correct id and name to update', () => {
            it('should return a 200', async () => {
                const city = await createCity({
                    name: 'Blumenau',
                    state: 'SC',
                })

                const client = await createClient({
                    name: 'Matheus da Silv',
                    sex: 'Masculino',
                    age: 22,
                    birthday: '17/08/1999',
                    city: city._id,
                })

                const id = client._id

                const newName = { name: 'Matheus de Sá' }

                const { body, statusCode } = await supertest(app)
                    .put(`/api/clients/${id}`)
                    .send(newName)

                expect(statusCode).toBe(200)

                expect(`O nome do cliente id ${id} foi alterado!`).toBe(body)
            })
        })

        describe('given that the client id does not exist', () => {
            it('should return a 400', async () => {
                const id = '6293839eb5db1a944dfe3fda'

                const newName = { name: 'Matheus de Sá' }

                const { body, statusCode } = await supertest(app)
                    .put(`/api/clients/${id}`)
                    .send(newName)

                expect(statusCode).toBe(400)

                expect('Cliente não encontrado!').toBe(body)
            })
        })
    })

    describe('DELETE /clients', () => {
        describe('given the correct id to delete', () => {
            it('should return a 200', async () => {
                const city = await createCity({
                    name: 'Rio do Sul',
                    state: 'SC',
                })

                const client = await createClient({
                    name: 'Pedro José',
                    sex: 'Masculino',
                    age: 25,
                    birthday: '17/08/1997',
                    city: city._id,
                })

                const id = client._id

                const { body, statusCode } = await supertest(app).delete(
                    `/api/clients/${id}`
                )

                expect(statusCode).toBe(200)

                expect(`Cliente id ${id} excluído!`).toBe(body)
            })
        })

        describe('given that the client id does not exist', () => {
            it('should return a 400', async () => {
                const id = '6293839eb5db1a944dfe3fda'

                const { body, statusCode } = await supertest(app).delete(
                    `/api/clients/${id}`
                )

                expect(statusCode).toBe(400)

                expect(`Cliente não encontrado, ou já excluído`).toBe(body)
            })
        })
    })
})
