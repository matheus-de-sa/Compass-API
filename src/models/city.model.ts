import mongoose from 'mongoose'

export interface CityDocument extends mongoose.Document {
    name: string
    state: string
    creadtedAt: Date
    updatedAt: Date
}

const citySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const CityModel = mongoose.model('City', citySchema)

export default CityModel
