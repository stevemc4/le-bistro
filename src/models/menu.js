import db from '../lib/db'

class Menu{
    constructor(data){
        this.id = data.id || undefined
        this.name = data.nama
        this.price = data.harga
        this.status = data.status
        this.picture = data.picture
    }
    static async findById(id){
        let data = await db('masakan').select().where('id', id)
        return new Menu(data[0])
    }
    async save(){
        try{
            if(this.id == undefined){
                await db('masakan').insert({
                    nama: this.name,
                    harga: this.harga,
                    status: this.status,
                    picture: this.picture || 'default.png'
                })
            }
            else{
                await db('masakan').update({
                    nama: this.name,
                    harga: this.harga,
                    status: this.status,
                    picture: this.picture || 'default.png'
                }).where('id', this.id)
            }
            return true
        }
        catch(e){
            return false
        }
    }
}

export default Menu