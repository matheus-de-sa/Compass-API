import { DocumentDefinition } from 'mongoose'
import CityModel, { CityDocument } from '../models/city.model'

export async function createCity(
    input: DocumentDefinition<Omit<CityDocument, 'creadtedAt' | 'updatedAt'>>
) {
    try {
        return await CityModel.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function findCity(where: object) {
    try {
        return await CityModel.find(where)
    } catch (error: any) {
        throw new Error(error)
    }
}