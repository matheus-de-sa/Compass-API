import city from './city'
import client from './client'
import { Express } from 'express'

function routes(app: Express) {
    city(app)
    client(app)
}

export default routes
