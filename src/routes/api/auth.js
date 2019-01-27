import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'

import Password from '../../lib/password'

import User from '../../models/user'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    {
        path: '/api/auth/login',
        method: 'POST',
        async handler(req, h){
            try{
                let user = await User.findByUsername(req.payload.username)
                if(user.password == new Password(req.payload.password).value){
                    req.yar.set('user', user.id)
                    return {
                        statusCode: 200,
                        error: '',
                        message: 'Successful login',
                        payload: {
                            userId: user.id,
                            username: user.username
                        }
                    }
                }
                else{
                    return boom.unauthorized(
                        'User or Password is invalid'
                    )
                }
            }
            catch(e){
                return boom.unauthorized(
                    'User or Password is invalid'
                )
            }
        },
        options: {
            validate:{
                payload:{
                    username: joi.string().required(),
                    password: joi.string().required()
                }
            }
        },
    }
]

export default routes