import { Express, Request, Response } from 'express'
import {
    createClientHandler,
    getClientHandler,
    updateClientHandler,
    deleteClientHandler,
} from '../controllers/client.controller'
import validate from '../middlewares/validate'
import {
    createClientSchema,
    deleteClientSchema,
    getClientSchema,
    updateClientSchema,
} from '../schemas/client.schema'

function routes(app: Express) {
    app.get('/api/clients', validate(getClientSchema), getClientHandler)

    app.post('/api/clients', validate(createClientSchema), createClientHandler)

    app.put(
        '/api/clients/:id',
        validate(updateClientSchema),
        updateClientHandler
    )

    app.delete(
        '/api/clients/:id',
        validate(deleteClientSchema),
        deleteClientHandler
    )
}

export default routes
