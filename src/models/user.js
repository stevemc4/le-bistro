import db from '../lib/db'

import Level from './level'


class User{
    constructor(){
        
    }
    async init(data){
        this.id = data.id || undefined
        this.level = await Level.getById(data.level)
        this.username = data.username
        this.password = data.password
        this.name = data.nama
        this.picture = data.picture
        return this
    }
    static async getById(id){
        try{
            let data = await db('user').select().where('id', id)
            let user = await new User().init(data[0])
            return user
        }
        catch(e){
            return new User()
        }
    }
    static async getByUsername(username){
        try{
            let data = await db('user').select().where('username', username)
            let user = await new User().init(data[0])
            return user
        }
        catch(e){
            return new User()
        }
    }
    toObject(){
        return {
            id: this.id,
            level: this.level.name,
            username: this.username,
            name: this.name,
            picture: this.picture
        }
    }
}

export default User