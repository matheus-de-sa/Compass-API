import { object, string, number, TypeOf } from 'zod'

export const createCitySchema = object({
    body: object({
        name: string({
            required_error: 'O campo nome "name" é obrigatório!',
            invalid_type_error: 'O campo nome "name" é do tipo string',
        }).min(3, {
            message: 'O campo nome "name" deve ter no mínimo 3 caracteres',
        }),
        state: string({
            required_error: 'O campo estado "state" é obrigatório!',
            invalid_type_error: 'O campo estado "state" é do tipo string',
        }).length(2, {
            message: 'O campo estado "state" deve ser abreviado, exemplo: SC',
        }),
    }),
})

const query = {
    query: object({
        state: string().optional(),
        name: string().optional(),
    }),
}

export const getCitySchema = object({
    ...query,
})

export type ReadCitySchema = TypeOf<typeof getCitySchema>
export type CreateCityInput = TypeOf<typeof createCitySchema>
