const BaseDAO = require('../basedao')

module.exports = class RightsDAO extends BaseDAO {
    constructor(db) {
        super(db,'rights')
    }

    createTable(){
        return this.db.query("create table rights (id SERIAL PRIMARY KEY,label_right TEXT NOT NULL)")
    }

    insert(rights){
        return this.db.query("Insert into rights(label_right) values ($1)",[rights.label_right])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM rights")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
}