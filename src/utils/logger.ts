import logger from 'pino'

const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            levelFirst: true,
            translateTime: 'dd/mm/yyyy, hh:MM:ss TT',
            colorize: true,
            ignore: 'hostname, pid',
        },
    },
})

export default log
