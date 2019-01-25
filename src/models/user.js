import db from '../lib/db'

import Level from './level'
import Password from '../lib/password';


class User{
    constructor(data){
        return new Promise(async (resolve, reject) => {
            try{
                this.id = data.id || undefined
                this.level = await Level.getById(data.level)
                this.username = data.username
                this.password = data.password
                this.name = data.nama
                this.picture = data.picture
                resolve(this)
            }
            catch(e){
                console.log(e)
                reject()
            }
        })
    }
    static async getById(id){
        try{
            let data = await db('user').select().where('id', id)
            let user = await new User(data[0])
            return user
        }
        catch(e){
            console.log(e)
            return new User()
        }
    }
    static async getByUsername(username){
        try{
            let data = await db('user').select().where('username', username)
            let user = await new User(data[0])
            return user
        }
        catch(e){
            console.log(e)
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
    async save(disableSafeMode = false){
        try{
            if(this.id == undefined){
                await db('user').insert({
                    level: this.level.id,
                    username: this.username,
                    password: new Password(this.password).value,
                    nama: this.name,
                    picture: this.picture || 'default.png'
                })
            }
            else{
                await db('user').update({
                    level: this.level.id,
                    username: this.username,
                    nama: this.name,
                    picture: this.picture || 'default.png'
                }).where('id', this.id)
                if(disableSafeMode){
                    await db('user').update({
                        password: new Password(this.password).value
                    }).where('id', this.id)
                }
            }
            return true
        }
        catch(e){
            return false
        }
    }
}

export default User