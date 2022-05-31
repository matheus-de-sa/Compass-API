import { Request, Response } from 'express'
import { CreateCityInput, ReadCitySchema } from '../schemas/city.schema'
import { createCity, findCity } from '../services/city.service'
import logger from '../utils/logger'

interface whereInterface {
    name?: string
    state?: string
}

export async function createCityHandler(
    req: Request<{}, {}, CreateCityInput['body']>,
    res: Response
) {
    try {
        let { name, state } = req.body

        const city = await findCity(req.body)

        if (city.length > 0)
            return res.status(400).json('Cidade já registrada!')

        const cityCreated = await createCity({
            name,
            state: state.toUpperCase(),
        })

        logger.info(`Cidade ${cityCreated.name}/${cityCreated.state} criada!`)
        return res.status(200).json(cityCreated)
    } catch (error: any) {
        logger.error(error)
        return res.status(409).json(error.message)
    }
}

export async function getCityHandler(
    req: Request<ReadCitySchema['query']>,
    res: Response
) {
    try {
        let where: whereInterface = {}
        let { name, state }: any = req.query

        if (name) where.name = name
        if (state) where.state = state

        const cities = await findCity(where)

        if (cities.length === 0)
            return res.status(400).json('Nenhuma cidade encontrada!')

        if (cities.length === 1) return res.status(200).json(cities[0])

        return res.status(200).json(cities)
    } catch (error: any) {
        logger.error(error)
        return res.status(409).json(error.message)
    }
}
