import { object, string, number, TypeOf } from 'zod'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import mongoose from 'mongoose'

export const createClientSchema = object({
    body: object({
        name: string({
            required_error: 'O campo nome "name" é obrigatório!',
            invalid_type_error: 'O campo nome "name" é do tipo string',
        }).min(2, {
            message: 'O campo nome "name" deve ter no mínimo 2 caracteres',
        }),
        sex: string({
            required_error: 'O campo sexo "sex" é obrigatório!',
            invalid_type_error: 'O campo sexo "sex" é do tipo string',
        }).refine(
            (val) => {
                return val === 'Masculino' || val === 'Feminino'
            },
            {
                message: 'O sexo deve ser Masculino ou Feminino',
                path: ['sexConfirmation'],
            }
        ),
        birthday: string({
            required_error: 'O campo aniversário "birthday" é obrigatório!',
            invalid_type_error:
                'O campo aniversário "birthday" é do tipo string',
        }).regex(/(\d{2})[\/](\d{2})[\/](\d{4})/, {
            message: 'O campo aniversário deve ser por exemplo 17/08/1999',
        }),
        age: number({
            required_error: 'O campo idade "age" é obrigatório!',
            invalid_type_error: 'O campo idade "age" é do tipo number',
        }).positive(),
        city: string({
            required_error: 'O campo cidade "city" é obrigatório!',
        }).refine(
            (val) => {
                return mongoose.Types.ObjectId.isValid(val)
            },
            {
                message: 'O ID da cidade não é válido!',
            }
        ),
    }).refine(
        (data) => {
            let dateBirthday = data.birthday.split('/')
            let dateNow = dayjs(
                `${dateBirthday[2]}-${dateBirthday[1]}-${dateBirthday[0]}`
            )
            let date = dayjs()

            let diff = date.diff(dateNow, 'years')

            return diff === data.age
        },
        {
            message: 'A data de aniversário não bate com a idade',
            path: ['ageConfirmation'],
        }
    ),
})

const params = {
    params: object({
        id: string({
            required_error: 'O id do cliente é obrigatório!',
        }).refine(
            (val) => {
                return mongoose.Types.ObjectId.isValid(val)
            },
            {
                message: 'Este não é um id válido!',
            }
        ),
    }),
}

const query = {
    query: object({
        id: string()
            .refine(
                (val) => {
                    return mongoose.Types.ObjectId.isValid(val)
                },
                {
                    message: 'Este não é um id válido!',
                }
            )
            .optional(),
        name: string().optional(),
    }),
}

export const deleteClientSchema = object({
    ...params,
})

export const updateClientSchema = object({
    ...params,
    body: object({
        name: string({
            required_error: 'O campo nome "name" é obrigatório!',
            invalid_type_error: 'O campo nome "name" é do tipo string',
        }),
    }),
})

export const getClientSchema = object({
    ...query,
})

export type CreateClientInput = TypeOf<typeof createClientSchema>
export type ReadClientInput = TypeOf<typeof getClientSchema>
export type UpdateClientInput = TypeOf<typeof updateClientSchema>
export type DeleteClientInput = TypeOf<typeof deleteClientSchema>
