import { Express } from 'express'
import {
    createCityHandler,
    getCityHandler,
} from '../controllers/city.controller'
import validate from '../middlewares/validate'
import { createCitySchema, getCitySchema } from '../schemas/city.schema'

function routes(app: Express) {
    app.get('/api/cities', validate(getCitySchema), getCityHandler)

    app.post('/api/cities', validate(createCitySchema), createCityHandler)
}

export default routes
