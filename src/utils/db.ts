import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

async function connect() {
    const dbUser = config.get<string>('dbUser')
    const dbPassword = config.get<string>('dbPassword')

    try {
        await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@apicluster.knkaxrt.mongodb.net/?retryWrites=true&w=majority`
        )
        logger.info('Conectado ao Banco de Dados')
    } catch (error) {
        logger.error('Erro ao se conectar ao Banco de Dados')
        process.exit(1)
    }
}

export default connect
