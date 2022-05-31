import { Request, Response } from 'express'
import {
    CreateClientInput,
    ReadClientInput,
    UpdateClientInput,
    DeleteClientInput,
} from '../schemas/client.schema'
import { findCity } from '../services/city.service'
import {
    createClient,
    deleteClient,
    findClient,
    updateClient,
} from '../services/client.service'
import logger from '../utils/logger'

interface whereInterface {
    name?: string
    _id?: string
}

export async function createClientHandler(
    req: Request<{}, {}, CreateClientInput['body']>,
    res: Response
) {
    try {
        let data = req.body

        let city = await findCity({ _id: data.city })

        if (city.length === 0)
            return res.status(409).json('O ID da cidade informado não existe!')

        const client = await createClient(data)

        logger.info(`Cliente ${client.name} criado(a)!`)
        return res.status(200).json(client)
    } catch (error: any) {
        logger.error(error)
        return res.status(409).json(error.message)
    }
}

export async function getClientHandler(
    req: Request<ReadClientInput['query']>,
    res: Response
) {
    try {
        let where: whereInterface = {}
        let { name, id }: any = req.query

        if (name && !id) {
            where.name = name.replace(/[-]/g, ' ')
        }

        if (!name && id) where['_id'] = id

        const clients = await findClient(where)

        if (clients.length === 0)
            return res.status(400).json('Nenhum cliente encontrado!')

        if (clients.length === 1) return res.status(200).json(clients[0])

        return res.status(200).json(clients)
    } catch (error: any) {
        logger.error(error)
        return res.status(409).json(error.message)
    }
}

export async function updateClientHandler(
    req: Request<UpdateClientInput['params']>,
    res: Response
) {
    try {
        let id = req.params.id
        let name = req.body.name

        const client = await updateClient(id, name)

        if (!client) return res.status(400).json('Cliente não encontrado!')

        client.name = name

        logger.info(`O nome do cliente id ${id} foi alterado!`)
        return res.status(200).json(`O nome do cliente id ${id} foi alterado!`)
    } catch (error: any) {
        logger.error(error)
        return res.status(400).json(error.message)
    }
}

export async function deleteClientHandler(
    req: Request<DeleteClientInput['params']>,
    res: Response
) {
    try {
        let id = req.params.id

        const client = await deleteClient(id)

        if (!client)
            return res
                .status(400)
                .json('Cliente não encontrado, ou já excluído')
        
        
        logger.info(`Cliente id ${id} excluído!`)
        return res.status(200).json(`Cliente id ${id} excluído!`)
    } catch (error: any) {
        logger.error(error)
        return res.status(409).json(error.message)
    }
}
