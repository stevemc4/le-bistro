import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'
import User from '../models/user'

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
            else{
                let userData = await User.findById(req.yar.get('user'))
                return h.view('index', {
                    page: 'overview',
                    userData: {
                        name: userData.name,
                        picture: userData.picture,
                        role: userData.level
                    }
                })
            }
        }
    }
]

 export default views