import config from 'config'
import connect from './utils/db'
import logger from './utils/logger'
import createServer from './utils/server'

const app = createServer()
const port = config.get<number>('port')

app.listen(port, async () => {
    logger.info(`Servidor Iniciado na porta http://localhost:${port}`)

    await connect()
})
