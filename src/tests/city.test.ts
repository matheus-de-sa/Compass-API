import supertest from 'supertest'
import createServer from '../utils/server'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createCity } from '../services/city.service'

const app = createServer()

describe('City', () => {
    beforeAll(async () => {
        const mongo = await MongoMemoryServer.create()

        await mongoose.connect(mongo.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('GET /cities', () => {
        describe('given the city does exist', () => {
            it('should return a 200', async () => {
                const city = await createCity({
                    name: 'Joinville',
                    state: 'SC',
                })

                const name = 'Joinville'
                const state = 'SC'

                const { body, statusCode } = await supertest(app).get(
                    `/api/cities?name=${name}&state=${state}`
                )

                expect(statusCode).toBe(200)

                expect({
                    name: body.name,
                    state: body.state,
                }).toStrictEqual({
                    name: city.name,
                    state: city.state,
                })
            })
        })

        describe('given the city does not exist', () => {
            it('should return a 400', async () => {
                const city = 'Joinville'
                const state = 'SP'

                const { body, statusCode } = await supertest(app).get(
                    `/api/cities?name=${city}&state=${state}`
                )

                expect(statusCode).toBe(400)

                expect('Nenhuma cidade encontrada!').toBe(body)
            })
        })
    })

    describe('POST /cities', () => {
        describe('given the city is created', () => {
            it('should return a 200', async () => {
                const city = {
                    name: 'São Paulo',
                    state: 'SP',
                }

                const { body, statusCode } = await supertest(app)
                    .post(`/api/cities`)
                    .send(city)

                expect(statusCode).toBe(200)

                expect({
                    name: body.name,
                    state: body.state,
                }).toStrictEqual({
                    name: city.name,
                    state: city.state,
                })
            })
        })

        describe('given the city has already been created', () => {
            it('should return a 400', async () => {
                const city = {
                    name: 'São Paulo',
                    state: 'SP',
                }

                const { body, statusCode } = await supertest(app)
                    .post(`/api/cities`)
                    .send(city)

                expect(statusCode).toBe(400)

                expect('Cidade já registrada!').toStrictEqual(body)
            })
        })

        describe('given that the data to create the city is wrong', () => {
            it('should return a 400', async () => {
                const city = {
                    name: '',
                    state: '',
                }

                const { statusCode } = await supertest(app)
                    .post(`/api/cities`)
                    .send(city)

                expect(statusCode).toBe(400)
            })
        })
    })
})
