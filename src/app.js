import dotenv from 'dotenv'
import chalk from 'chalk'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import fs from 'fs'

import hapi from 'hapi'
import vision from 'vision'
import inert from 'inert'
import ejs from 'ejs'

dotenv.config()
var css = fs.readFileSync(process.cwd() + '/static/styles/tailwind.css').toString()


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

server.route({
    path: '/static/styles/main.css',
    method: 'GET',
    handler(req, h){
        return h.response(css).type('text/css')
    }
})

async function provision(){
    css = await postcss([tailwindcss(process.cwd()+'/tailwind.js')]).process(css, {
        from: '../static/styles/tailwind.css',
        to: '../static/styles/main.css'
    })
    css = css.css
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