import dotenv from 'dotenv'
import chalk from 'chalk'

import hapi from 'hapi'
import vision from 'vision'
import inert from 'inert'
import ejs from 'ejs'

dotenv.config()

const server = new hapi.Server({
    port: process.env.PORT
})

server.route({
    path: '/',
    method: 'GET',
    handler(req, h){
        return h.view('index')
    }
})

async function provision(){
    await server.register({
        plugin: vision,
        options: {
            engines: {
                ejs: ejs
            },
            relativeTo: process.cwd() + '/views',
            path: process.cwd() + '/views',
            isCached: false
        }
    })
    await server.register({
        plugin: inert
    })
    server.start()
    console.log(`Server started on port ${chalk.bold.green(server.settings.port)}`)
}

provision()