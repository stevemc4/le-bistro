import db from '../lib/db'

import User from './user'

class Order{
    constructor(data){
        return new Promise(async (resolve, reject) => {
            this.id = data.id || undefined
            this.user = await User.findById(data.userId)
            this.tableNo = data.noMeja
            this.date = data.tanggal
            this.detail = data.keterangan
            this.status = data.status
            resolve(this)
        })
    }

    static async findById(id){
        let data = await db('order').select().where('id', id)
        return await new Order(data[0])
    }
    static async findByDateRange(start, end){
        return 'NOT IMPLEMENTED'
    }
    async save(){
        try{
            if(this.id == undefined){
                await db('order').insert({
                    userId: this.user.id,
                    noMeja: this.tableNo,
                    tanggal: this.date,
                    keterangan: this.detail,
                    status: this.status
                })
            }
            else{
                await db('order').update({
                    userId: this.user.id,
                    noMeja: this.tableNo,
                    tanggal: this.date,
                    keterangan: this.detail,
                    status: this.status
                }).where('id', this.id)
            }
            return true
        }
        catch(e){
            return false
        }
    }
}

export default Order