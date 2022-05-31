import { DocumentDefinition } from 'mongoose'
import ClientModel, { ClientDocument } from '../models/client.model'

export async function createClient(
    input: DocumentDefinition<Omit<ClientDocument, 'creadtedAt' | 'updatedAt'>>
) {
    try {
        return await ClientModel.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function findClient(where: object) {
    try {
        return await ClientModel.find(where).populate('city')
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function deleteClient(id: string) {
    try {
        return await ClientModel.findByIdAndDelete({ _id: id })
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function updateClient(id: string, name: string) {
    try {
        return await ClientModel.findByIdAndUpdate(id, { name: name })
    } catch (error: any) {
        throw new Error(error)
    }
}
