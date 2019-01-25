import db from '../lib/db'

class Level{
    constructor(data){
        this.id = data.id
        this.name = data.nama
    }
    static async getById(id){
        let data = await db('level').select().where('id', id)
        return new Level(data[0])
    }
}

export default Level