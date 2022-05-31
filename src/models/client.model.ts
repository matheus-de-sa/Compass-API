import mongoose from 'mongoose'

export interface ClientDocument extends mongoose.Document {
    name: string
    sex: string
    birthday: string
    age: number,
    city: string,
    creadtedAt: Date,
    updatedAt: Date
}

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'City',
        },
    },
    { timestamps: true }
)

const ClientModel = mongoose.model('Client', clientSchema)

export default ClientModel
