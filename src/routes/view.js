import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'

/**
 * @type {hapi.ServerRoute[]}
 */

let views = [
    {
        path: '/login',
        method: 'GET',
        async handler(req, h){
            if(req.yar.get('user') == undefined)
                return h.view('pages/login')
            else
                return h.redirect('/')
        }
    },
    {
        path: '/',
        method: 'GET',
        async handler(req, h){
            if(req.yar.get('user') == undefined)
                return h.view('pages/login')
            else
                return h.view('index', {
                    page: 'overview'
                })
        }
    }
]

 export default views